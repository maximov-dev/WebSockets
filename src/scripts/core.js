const messages = document.getElementById('messages-list');
const form = document.getElementById('form');
const status = document.getElementById('status');
const input = document.getElementById('input');
const ws = new WebSocket('ws://test-wss.herokuapp.com:8080');

function setStatus(value) {
    status.innerHTML = value;
}

function printMessage(value) {
    const li = document.createElement('li');

    li.setAttribute('class', 'list-group-item');
    li.innerHTML = value;
    messages.appendChild(li);
}

form.addEventListener('submit', event => {
    event.preventDefault();
    ws.send(input.value);
    input.value = '';
});
ws.onopen = () => setStatus('ONLINE');

ws.onclose = () => setStatus('DISCONNECTED');

ws.onmessage = response => printMessage(response.data);
