(function() {
  var socket = new WebSocket('ws://localhost:8080');

  socket.addEventListener('open', function() {
    console.log('open');
  });

  socket.addEventListener('message', function(message) {
    console.log(JSON.parse(message.data));
  });

  document.getElementById('insertButton').addEventListener('click', function(event) {
    socket.send('insert');
  });

  document.getElementById('updateButton').addEventListener('click', function(event) {
    socket.send('update');
  });

  document.getElementById('deleteButton').addEventListener('click', function(event) {
    socket.send('delete');
  });
})();
