from transformers import pipeline
import os
audio = pipeline("automatic-speech-recognition", model="openai/whisper-small")


def AUDIO(audio_path):
    text = audio(audio_path)
    os.remove(audio_path)
    return text




