import { useEffect, useState } from 'react';
import { Chat } from 'react-ui-chat';
import { TMessage, TUser } from 'react-ui-chat/types';
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000');

type ChatIoProps = {
  user: TUser
  room: string
}

type MessageWithOwner = TMessage & { user: TUser }

const ChatIo = ({ user, room }: ChatIoProps) => {
  const [messages, setMessages] = useState<MessageWithOwner[]>([])
  const [lastMessage, setLastMessage] = useState<MessageWithOwner | null>(null)

  useEffect(() => {
    socket.emit('join-room', room)
    socket.on('receive-message', (message: MessageWithOwner) => {
      const isOwner = message.user.id === user.id
      if (!isOwner) setLastMessage(message)
    })
  }, [room, user.id])

  useEffect(() => {
    if (!lastMessage) return
    setMessages((prevMessages) => {
      if (prevMessages.find((msg) => msg.id === lastMessage.id)) return prevMessages
      return [...prevMessages, lastMessage]
    })
  }, [lastMessage])

  const handleSendMessage = (message: TMessage) => {
    const messageWithOwner = { ...message, user }
    setMessages((prev) => [...prev, messageWithOwner])

    const updateMessageState = ({ success }: { success: boolean }) => {
      if (!success) return
      setMessages(prev => prev.map((msg) => {
        if (msg.id === message.id) return {
          ...messageWithOwner,
          status: 'delivered'
        }
        return msg
      }))
    }

    socket.emit('send-message', messageWithOwner, room, updateMessageState)
  }

  const messagesByOwner = messages.map((message) => ({
    ...message,
    type: message.user.id === user.id ? 'sent' : 'receive'
  }))

  return (
    <Chat messages={messagesByOwner} onMessageSend={handleSendMessage} />
  )
}
export default ChatIo