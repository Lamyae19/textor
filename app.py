
from flask import Flask, render_template, url_for, request, send_file
import os
from PIL import Image
import pytesseract
import datetime
import models
from  models.models import AUDIO
app = Flask(__name__)  # static_url_path="/static"

#language = "English"

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

upload_dir = 'static/upload'
os.makedirs(upload_dir, exist_ok=True)
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/home')
def home():
    return render_template('index.html')

@app.route('/home/<section>')
def navigate_to_section(section):
    return render_template('index.html', section=section)


@app.route('/audio')
def audio():
    return render_template('audio.html')


@app.route('/images')
def images():
    return render_template('image.html')


@app.route('/audioToText', methods=['POST', 'GET'])
def progressData():
    audio_file = request.files['audio']
    current_datetime = datetime.datetime.now()
    path = "uploads/"+ current_datetime.strftime("%Y%m%d%H%M%S")  + ".wav"
    audio_file.save(path)
    TEXT = AUDIO(path)
    print("text    " , TEXT)
    return {"TEXT" : TEXT}


@app.route('/convert',methods=['GET','POST'])
def convert():
    
    if request.method == "POST":
        if 'image_file' not in request.files:
            return {"TEXT": "No file part"}

        image_file = request.files['image_file']
        extn = "."+str(image_file.filename).split(".")[-1]
        current_datetime = datetime.datetime.now()
        path = "uploads/" + current_datetime.strftime("%Y%m%d%H%M%S") + extn
        image_file.save(path)
        img = Image.open(path)
        text = pytesseract.image_to_string( img )
        print(text)
        # Get the URL for the uploaded image
        image_url = url_for('uploaded_file', filename=path.split("/")[-1])

        return render_template('image.html', image_url=image_url, text=text)
    return render_template('image.html')
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_file(f'uploads/{filename}', as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
