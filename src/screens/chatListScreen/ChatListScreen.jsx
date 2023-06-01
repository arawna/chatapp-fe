import React from 'react'
import styles from "./styles.module.css"

const ChatListScreen = ({joinRoom}) => {
  return (
    <div className={styles.container}>
        <span>ChatListScreen</span>
        <div style={{border:"1px solid red",cursor:"pointer"}} onClick={() => joinRoom("spor")}>Spor Odası</div>
        <div style={{border:"1px solid red",cursor:"pointer"}} onClick={() => joinRoom("siyaset")}>Siyaset Odası</div>
        <div style={{border:"1px solid red",cursor:"pointer"}} onClick={() => joinRoom("tarih")}>Tarih Odası</div>
      </div>
  )
}

export default ChatListScreen