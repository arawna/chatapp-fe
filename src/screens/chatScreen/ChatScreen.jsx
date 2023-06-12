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
        <div style={{color:"#0A121A",fontWeight:"600",borderBottom:"2px solid #0A121A"}}>{room} Odası {token}</div>
        <div style={{height:"80vh",overflowY:"scroll",overflowX:"hidden"}}>
          {messages.map((message,index) => (
            <div key={index} className={styles.messageBox}>
              <div style={{textAlign:"left",fontSize:"16px",color:"white",margin:"5px"}}><span style={{width:"10px",height:"10px",backgroundColor:"white",borderRadius:"50%",color:"black",padding:"5px",margin:"0px",fontWeight:"600"}}>{message.name[0].toUpperCase()}</span> {message.name}</div>
              <div style={{fontSize:"16px",color:"white",textAlign:"left",marginLeft:"10px"}}>{message.message}</div>
            </div>
          ))}
        </div>
        <div style={{borderTop:"2px solid black",paddingTop:"5px"}}>
          <input style={{width:"80%",borderRadius:"5px",backgroundColor:"#9FA3B5",color:"#0A121A"}} value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Mesajınızı giriniz" />
          <button style={{backgroundColor:"#1E3B76",color:"white",borderRadius:"5px",marginLeft:"10px"}} disabled={message === ""} onClick={() => sendMessage()}>Gönder</button>
        </div>
      </>}
      {room === "" && <div style={{color:"#0A121A",fontWeight:"600",borderBottom:"2px solid #0A121A"}}>Lütfen bir oda seçiniz</div>}
    </div>
  )
}

export default ChatScreen