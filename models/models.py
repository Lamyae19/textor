from transformers import pipeline
audio = pipeline("automatic-speech-recognition", model="openai/whisper-small")


def AUDIO(audio_path):
    text = audio(audio_path)
    return text




