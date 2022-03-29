const socket = io('http://localhost:3000')

function renderMessages(message) {
  $('.messages').append(
    `<div class="message">
        <strong>
          ${message.author}
        </strong>:
          ${message.message}
    </div>`
  )
}

socket.on('previousMessages', function(messages){
  for (message of messages) {
    renderMessages(message)
  }
})

socket.on('receivedMessage', function(message){
  renderMessages(message)
})

$('.chat').submit(function(event){
  event.preventDefault()

  var author = $('input[name=username]').val()
  var message = $('input[name=message]').val()

  if (author.length && message.length) {
    var messageObject = {
      author: author,
      message: message
    }

    renderMessages(messageObject)
    socket.emit('sendMessage', messageObject)
  }
})
