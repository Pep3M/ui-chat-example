import { useEffect, useMemo, useState } from 'react';
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
  // states
  const [messages, setMessages] = useState<MessageWithOwner[]>([])
  const [lastMessage, setLastMessage] = useState<MessageWithOwner | null>(null)

  // effects
  useEffect(() => {
    socket.emit('join-room', room)
    socket.on('receive-message', (message: MessageWithOwner) => {
      const isOwner = message.user.id === user.id
      // set last message if it is not from the owner
      if (!isOwner) setLastMessage(message)
      // update status to delivered if message is from the owner
      if (message.status === 'delivered') setMessages((prevMessages) => {
        return prevMessages.map((msg) => msg.id === message.id ? message : msg)
      })
    })
  }, [room, user.id])

  useEffect(() => {
    if (!lastMessage) return
    setMessages((prevMessages) => {
      if (prevMessages.find((msg) => msg.id === lastMessage.id)) return prevMessages
      return [...prevMessages, lastMessage]
    })
  }, [lastMessage])

  // update status to delivered when message is received without status and is not from the owner
  useEffect(() => {
    if (!lastMessage || (lastMessage.status && lastMessage.status !== 'sending') || lastMessage.user.id === user.id) return
    const updatedMessage = { ...lastMessage, status: 'delivered' } as MessageWithOwner
    socket.emit('update-message', updatedMessage, room)
  }, [lastMessage, room, user.id])

  // handlers
  const handleSendMessage = (message: TMessage) => {
    const messageWithOwner = { ...message, user }
    setMessages((prev) => [...prev, messageWithOwner])

    socket.emit('send-message', messageWithOwner, room)
  }
  
  if (Number(user.id) === 1) console.log(messages)
  
  // constants
  const messagesByOwner = useMemo(() => messages.map((message) => ({
    ...message,
    type: message.user.id === user.id ? 'sent' : 'receive'
  })), [messages, user.id])

  return (
    <Chat messages={messagesByOwner} onMessageSend={handleSendMessage} />
  )
}
export default ChatIo