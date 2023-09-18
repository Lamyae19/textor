from transformers import pipeline
audio = pipeline("automatic-speech-recognition", model="facebook/whisper-large")

def extractTextFrom(audioPath):
    text = audio(audioPath)
    return text

