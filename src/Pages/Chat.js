import React, { Component } from 'react';
import io from 'socket.io-client'
import axios from 'axios'


class Chat extends Component{

  state = {
    messages: [],
    userCount: 0
  }

componentDidMount(){
  const socket = io('http://localhost:2001/')
  socket.on('chat message', this.updateMessages)
  socket.on('user connected', this.updateUserCount)
  axios.get('http://localhost:2001/chat/get-messages-db')
  .then((res) => {
    this.setState({ messages: res.data })
    console.log(res.data)
    console.log(this.state.messages)
  })
}

updateMessages = (msgs) => {
  this.setState({ messages: msgs })
}

updateUserCount = (count) => {
  this.setState({ userCount: count })
}
sendMessage = () => {
  console.log(this.refs.name.value)
  console.log(this.refs.message.value)
  var chatObj = {
    name: this.refs.name.value,
    message: this.refs.message.value
  }
  axios.post('http://localhost:2001/chat/send-messages-db', chatObj)
  .then((res) => {
    console.log(res.data)
  })
    //   const Toast = Swal.mixin({
    //     toast: true,
    //     position: 'top-end',
    //     showConfirmButton: false,
    //     timer: 3000
    //   })
      
    //   Toast.fire({
    //     title: chatObj.name +' says:  '+ chatObj.message
    //   })
  this.refs.message.value = ''
}

clearMessage = () => {
  axios.delete('http://localhost:2001/chat/clear-messages-db')
  .then((res) => {
    console.log(res.data)
  })
}

renderListMessage = () => {
  console.log(this.state.messages)
  return this.state.messages.map((val) => {
    return(
        <tr key={val.id}>
          <td>
            name: {val.name}
          </td>
          <td>
            message: {val.message}
          </td>
        </tr>
    )
  })
}



render(){
    return(
      <center>
        user connected: {this.state.userCount}
        {this.renderListMessage()}
        <form action="">
          <input id="n" ref='name' placeholder="name here"/>
          <input id="m" ref='message' placeholder="message"/>
          <input type="button" value="Send" onClick={this.sendMessage} />
          <input type="button" value="Delete" onClick={this.clearMessage} />
        </form>
      </center>
    )
  }
}

export default Chat