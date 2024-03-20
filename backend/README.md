## How to run:
cd backend
python -m venv myenv --> only on first run
source myenv/bin/activate
pip install -r requirements.txt  --> only on first run
uvicorn main:app --reload

### Update the requirements.txt
cd backend
source myenv/bin/activate
pip freeze > requirements.txt

### How to run only backend
Postman --> POST: http://localhost:8000/talk