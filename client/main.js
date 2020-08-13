var socket = io.connect('http://192.168.0.160:6677', { 'forceNew': true });

socket.on('messages', function (data) {
    console.log(data);
    render(data);
});

function render(data) {
    var html = data.map(function (message, index) {
        var d = new Date();
        var m = checkTime(d.getMinutes());
        var s = checkTime(d.getSeconds());
        return (`
            <div class="message"><strong>${message.nickname}</strong> dice (${d.getHours()}:${m}:${s}):
            <p>${message.text}</p>
             </div>
        `);
    }).join('');
    var div = document.getElementById('messages');
    div.innerHTML = html;
    div.scrollTop = div.scrollHeight;
}

function addMessage(e){
    var message = {
        nickname : document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };
    document.getElementById('nickname').style.display = 'none';
    socket.emit('add-message', message);
    return false;
}

function checkTime(i) {
    if (i < 10) { i ="0" + i; } return i;
}