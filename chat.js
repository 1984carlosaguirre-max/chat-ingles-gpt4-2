<!-- Chat inglés con GPT-4 (Render) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free/css/all.min.css">

<style>
  #chat-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    cursor: pointer;
    font-size: 24px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    z-index: 9999;
  }

  #chat-box {
    display: none;
    position: fixed;
    bottom: 90px;
    right: 20px;
    width: 350px;
    height: 450px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 9999;
    overflow: hidden;
  }

  #chat-header {
    background: #007bff;
    color: white;
    padding: 10px;
    text-align: center;
  }

  #chat-messages {
    height: 340px;
    padding: 10px;
    overflow-y: auto;
    font-size: 14px;
  }

  #chat-input {
    display: flex;
    border-top: 1px solid #ddd;
  }

  #chat-input input {
    flex: 1;
    border: none;
    padding: 10px;
    font-size: 14px;
  }

  #chat-input button {
    background: #007bff;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
</style>

<button id="chat-button"><i class="fas fa-comments"></i></button>

<div id="chat-box">
  <div id="chat-header">💬 Asistente de Inglés GPT-4</div>
  <div id="chat-messages"></div>
  <div id="chat-input">
    <input type="text" id="userInput" placeholder="Escribe en inglés...">
    <button id="sendButton">Enviar</button>
  </div>
</div>

<script>
  const chatButton = document.getElementById('chat-button');
  const chatBox = document.getElementById('chat-box');
  const sendButton = document.getElementById('sendButton');
  const userInput = document.getElementById('userInput');
  const chatMessages = document.getElementById('chat-messages');

  const API_URL = 'https://chat-ingles-gpt4.onrender.com/api/chat'; // <--- tu URL Render

  chatButton.addEventListener('click', () => {
    chatBox.style.display = (chatBox.style.display === 'none') ? 'block' : 'none';
  });

  async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    chatMessages.innerHTML += `<div><b>Tú:</b> ${message}</div>`;
    userInput.value = '';
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ message })
      });
      const data = await response.json();
      chatMessages.innerHTML += `<div><b>Profesor GPT-4:</b> ${data.reply}</div>`;
      chatMessages.scrollTop = chatMessages.scrollHeight;
    } catch (err) {
      chatMessages.innerHTML += `<div style="color:red;">Error conectando con el servidor.</div>`;
    }
  }

  sendButton.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') sendMessage();
  });
</script>
