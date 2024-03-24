import { useState } from 'react'
import { Chat } from 'react-ui-chat'
import { TMessage } from 'react-ui-chat/types'

type Conversation = {
  id: string | number,
  text: string,
  owner: string,
  date: string,
}

// simulate a chat between two users, passing ALL messages
function Example3() {
  const [conversation, setConversation] = useState<Conversation[]>([])

  const handleOnMessageSend = (message: TMessage, owner: string) => {
    setConversation([
      ...conversation,
      {
        id: conversation.length + 1,
        text: message.message,
        owner,
        date: message.date
      }
    ])
  }

  const messagesByOwner: (owner: string) => TMessage[] = (owner) => 
    conversation.map((message, index) => ({
      id: index +1,
      message: message.text,
      date: message.date,
      type: message.owner === owner ? 'sent' : 'receive',
      status: 'delivered'
    }))
    

  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      width: '100%',
      height: '100vh',
    }}>
      <Chat 
        messages={messagesByOwner('Albert')}
        onMessageSend={(message) => handleOnMessageSend(message, 'Albert')}
      />
      <Chat 
        messages={messagesByOwner('Nina')}
        onMessageSend={(message) => handleOnMessageSend(message, 'Nina')}
      />
    </div>
  )
}

export default Example3