import React from 'react'
import styles from "./styles.module.css"

const ChatListScreen = ({joinRoom}) => {
  return (
    <div className={styles.container}>
        <span>Konuşma Odaları</span>
        <div className={styles.chatRoom} onClick={() => joinRoom("Spor")}>Spor Odası</div>
        <div className={styles.chatRoom} onClick={() => joinRoom("Siyaset")}>Siyaset Odası</div>
        <div className={styles.chatRoom} onClick={() => joinRoom("Tarih")}>Tarih Odası</div>
      </div>
  )
}

export default ChatListScreen