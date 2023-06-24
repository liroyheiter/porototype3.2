// Функция для отправки сообщений на сервер и обновления чата
function sendMessage() {
  var messageInput = document.getElementById("message-input");
  var message = messageInput.value;
  messageInput.value = "";

  // Создание нового элемента сообщения пользователя
  var userMessageElement = document.createElement("p");
  userMessageElement.textContent = "Вы: " + message;
  userMessageElement.classList.add("user-message");

  // Добавление элемента сообщения пользователя в чат
  var chatLog = document.getElementById("chat-log");
  chatLog.appendChild(userMessageElement);

  // Отправка сообщения на сервер
  fetch("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: message })
  })
    .then(response => response.json())
    .then(data => {
      // Создание нового элемента сообщения бота
      var botMessageElement = document.createElement("p");
      botMessageElement.textContent = "Бот: " + data.reply;
      botMessageElement.classList.add("bot-message");

      // Добавление элемента сообщения бота в чат
      chatLog.appendChild(botMessageElement);

      // Прокрутка вниз для отображения последнего сообщения
      chatLog.scrollTop = chatLog.scrollHeight;
    });
}

// Обработчик нажатия на кнопку "Отправить"
window.addEventListener("DOMContentLoaded", function() {
  var sendButton = document.getElementById("send-button");
  sendButton.addEventListener("click", sendMessage);

  // Обработчик нажатия на клавишу Enter в поле ввода сообщения
  var messageInput = document.getElementById("message-input");
  messageInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
});


  