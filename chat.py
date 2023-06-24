from flask import Flask, render_template, request
from flask_cors import CORS 
import openai


app = Flask(__name__)

# Настройки OpenAI API
openai.api_key = "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"

# Маршрут для отображения главной страницы
@app.route('/')
def index():
    return render_template('index.html')

# Маршрут для обработки запросов от пользователя
@app.route('/chat', methods=['POST'])
def chat():
    message = request.form['message']  # Получаем сообщение от пользователя
    response = openai.Completion.create(
        engine='text-davinci-003',  # Используйте подходящую модель GPT-3.5
        prompt=message,
        max_tokens=50,  # Максимальное количество токенов в ответе
        temperature=0.7,  # Параметр, определяющий "творческость" ответа
        n=1,  # Количество ответов, которые нужно сгенерировать
        stop=None,  # Опциональное условие для остановки генерации
    )
    reply = response.choices[0].text.strip()  # Получаем ответ от модели

    return {'reply': reply}  # Возвращаем ответ в формате JSON
if __name__ == '__main__':
    app.run(debug=True)