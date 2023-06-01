import React, { useState } from 'react'
import ChatListScreen from '../screens/chatListScreen/ChatListScreen'
import ChatScreen from '../screens/chatScreen/ChatScreen'
import styles from './styles.module.css'
import { useDispatch, useSelector } from 'react-redux'
import AuthReducer from '../redux/reducers/AuthReducer'
import { useNavigate } from 'react-router-dom'
import { socket } from '../socket'

const Dashboard = () => {
  const dispatch=useDispatch()
  const {email}=useSelector((state)=>state.authReducer)
  const navigate = useNavigate()
  const logOut=()=>{
    dispatch(AuthReducer.logout())
    navigate("/")
  }

  let [room, setRoom] = useState("");

  const joinRoom = (room) => {
    socket.emit("joinRoom", room);
    setRoom(room);
  }

  return (
    <>
      <div className='align-items-center text-end me-2'>
        <span className='text-dark me-3'>
           {email}
        </span>
        <button className='btn btn-danger' onClick={logOut}>Çıkış yap</button>
      </div>
      <div className={styles.container}>
        <div className={styles.chatlistpage}>
          <ChatListScreen joinRoom={joinRoom} />
        </div>
        <div className={styles.chatpage}>
          <ChatScreen room={room} />
        </div>
      </div>
    </>

  )
}

export default Dashboard