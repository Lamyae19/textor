from transformers import pipeline
audio = pipeline(model="openai/whisper-small")
import os
def AUDIO(audioPath):
    #text = audio(audioPath)
    text = "cococ mon ami "
    return text



