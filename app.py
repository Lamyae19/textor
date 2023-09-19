
from flask import Flask, render_template, url_for, request
import os
from PIL import Image
import pytesseract
import datetime
app = Flask(__name__)  # static_url_path="/static"
from models.models import AUDIO

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
    TEXT = AUDIO(audioPath=path)
    print("text    " , TEXT)
    return {"TEXT" : TEXT}


@app.route('/convert',methods=['GET','POST'])
def convert():
    
    if request.method == "POST":
        if 'image_file' not in request.files:
            return "No file part"

        image_file = request.files['image_file']
        if image_file.filename == '':
            return "No selected file"
        
        #print(image_file.filename)
        print(request)
        #uploadimage=request.form.get('uploadimage')
        pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
        
        upload_dir = 'static/upload'
        os.makedirs(upload_dir, exist_ok=True)
        
        file_path = os.path.join(upload_dir, image_file.filename)
        print(file_path)
        image_file.save(file_path)
        #image_url = url_for('static', filename=file_path)

        img = Image.open(file_path)
        text = pytesseract.image_to_string( img )
        print(text)
    
        return render_template('image.html',file_path=file_path,text=text)
    return render_template('image.html')

if __name__ == '__main__':
    app.run(debug=True)
