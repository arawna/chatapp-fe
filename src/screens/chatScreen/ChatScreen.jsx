import React, { useEffect, useState } from 'react'
import styles from"./styles.module.css"
import { socket } from '../../socket';
import { useSelector } from 'react-redux';
import CryptoJS from 'crypto-js';

const ChatScreen = ({room}) => {

  let [messages, setMessages] = useState([]);
  let [message, setMessage] = useState("");

  useEffect(() => {
    setMessages([])
  },[room])

  const {email,token}=useSelector((state)=>state.authReducer)

  const sendMessage = () => {
    let cyrptedMessage = CryptoJS.AES.encrypt(message,room).toString()
    socket.emit("sendMessage", {room, message:cyrptedMessage, email})
    setMessage("")
  }

  socket.on("receiveMessage", (data) => {
    let decryptedMessage = CryptoJS.AES.decrypt(data.message,room).toString(CryptoJS.enc.Utf8)
    setMessages([...messages, {name:data.email, message:decryptedMessage}])
  })

  return (
    <div className={styles.container}>
      {room !== "" && <>
        <div>{room} ChatScreen {token}</div>
        {messages.map((message,index) => (
          <div key={index} style={{border:"1px solid blue"}}>{`${message.name}: ${message.message}`}</div>
        ))}
        <div>
          <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Mesajınızı giriniz" />
          <button disabled={message === ""} onClick={() => sendMessage()}>Gönder</button>
        </div>
      </>}
      {room === "" && <div style={{border:"1px solid red"}}>Lütfen bir oda seçiniz</div>}
    </div>
  )
}

export default ChatScreen