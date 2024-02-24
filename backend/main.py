from fastapi import FastAPI, UploadFile
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware

from dotenv import load_dotenv
from openai import OpenAI

import os
import json
import requests

load_dotenv()
client = OpenAI(api_key=os.getenv("OPEN_AI_KEY"), organization=os.getenv("OPEN_AI_ORG"))

elevenlabs_key = os.getenv("ELEVENLABS_KEY")

CHATBOT_ROLE = "You are interviewing the user for a software engineering intern position. Ask short behavioural and technical questions that are relevant to a junior level developer. Your name is Greg. The user is Tristan. Keep responses under 35 words and be funny sometimes."

app = FastAPI()

origins = [
    "http://localhost:5174",
    "http://localhost:5173",
    "http://localhost:8000",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def ensure_output_dir(directory):
    if not os.path.exists(directory):
        os.makedirs(directory)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/talk")
async def post_audio(file: UploadFile):
    user_message = transcribe_audio(file)
    # user_message = 'Hi. Thank you for meeting with me.'
    chat_response = get_chat_response(user_message)
    audio_output = text_to_speech(chat_response)

    def iterfile():
        yield audio_output

    return StreamingResponse(iterfile(), media_type="audio/mpeg")

@app.get("/clear")
async def clear_history():
    file = 'database.json'
    open(file, 'w')
    return {"message": "Chat history has been cleared"}

def transcribe_audio(file):
    with open(file.filename, 'wb') as buffer:
        buffer.write(file.file.read())
    audio_file = open(file.filename, "rb")
    transcript = client.audio.transcriptions.create(
        model="whisper-1",
        file=audio_file
    )
    return transcript.text

def get_chat_response(user_message):
    print(f'user_message: {user_message}')
    messages = load_messages()
    messages.append({"role": "user", "content": user_message})

    # Receive a response from GPT
    gpt_response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
        temperature=0.7,
        max_tokens=150
    )

    try:
        parsed_gpt_response = gpt_response.choices[0].message.content.strip()
    except Exception as e:
        print("Error accessing the response:", e)
        # TODO: Add more debugging/fallback actions here ?
        parsed_gpt_response = "An error occurred while processing the response."

    save_messages(user_message, parsed_gpt_response)

    return parsed_gpt_response

def load_messages():
    messages = []
    file = 'database.json'

    empty = os.stat(file).st_size == 0

    if not empty:
        with open(file) as db_file:
            data = json.load(db_file)
            for item in data:
                messages.append(item)
    else:
        messages.append(
            {"role": "system", "content": CHATBOT_ROLE}
        )
    return messages

def save_messages(user_message, gpt_response):
    file = 'database.json'
    messages = load_messages()
    messages.append({"role": "user", "content": user_message})
    messages.append({"role": "assistant", "content": gpt_response})
    with open(file, 'w') as f:
        json.dump(messages, f)

def text_to_speech(text):
    print(f'Response: {text}')
    voice_id = ['pNInz6obpgDQGcFmaJgB', 'IKne3meq5aSn9XLyUdCD', 'ZQe5CZNOzWyzPSCn5a3c']
    voice_characters = ['Adam', 'Charlie', 'James']
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id[1]}"

    payload = {
        # "model_id": "eleven_monolingual_v1",
        # "model_id": "eleven_turbo_v2",
        "model_id": "eleven_monolingual_v1",
        "text": text,
        "voice_settings": {
            "stability": 0,
            "similarity_boost": 0,
            "style": 0.5,
            "use_speaker_boost": True
        }
    }

    headers = {
        "Content-Type": "application/json",
        "accept": "audio/mpeg",
        "xi-api-key": elevenlabs_key
    }

    try:
        response = requests.post(url, json=payload, headers=headers)
        if response.status_code == 200:
            return response.content
        else:
            print('Something went wrong. Please read the logs.')
            # TODO: Add more logging*
    except Exception as e:
        print(e)


