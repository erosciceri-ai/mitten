from gtts import gTTS
import os

# Texto que quieres convertir a voz y el idioma
texto = "Hola desde El Palomar, Buenos Aires"
idioma = 'es'

# Crear el objeto gTTS
salida = gTTS(text=texto, lang=idioma, slow=False)

# Guardar el archivo de audio
salida.save("audio.mp3")

# Reproducir el audio automáticamente (opcional)
os.system("start audio.mp3")  # En Windows
# os.system("afplay audio.mp3")  # En Mac
# os.system("mpg321 audio.mp3")  # En Linux
