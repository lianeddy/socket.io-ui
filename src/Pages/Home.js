import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import io from 'socket.io-client'
import Swal from 'sweetalert2'


class Home extends Component {

    state = {
        notif:[]
    }

    componentDidMount(){
        const socket = io('http://localhost:2001/')
        socket.on('notification', this.updateNotif)
    }

    updateNotif = (notif) => {
        console.log('ini notif', notif)
        
        this.setState({ notif: notif })
        console.log(this.state.notif)
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        })
        console.log('render notif', this.state.notif)
        this.state.notif.forEach((val, index) => {    
            Toast.fire({
            title: val.name +' says:  '+ val.message
            })
        })
    }
    render() { 
        return ( 
            <div>
                home
                <Link to='/chat'>
                    chat
                </Link>
            </div>
         );
    }
}
 
export default Home;