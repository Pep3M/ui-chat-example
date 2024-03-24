import { TMessage } from 'react-ui-chat/types' // if you are using typescript
import CustomChat from './Example2/CustomChat'
import { useState } from 'react'

type Conversation = {
  id: string | number,
  text: string,
  owner: string,
  date: string,
}

// In this example we will simulate a chat between two users, sending the last message received to the other user.
function Example2() {
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

  // get the last message from the local state, to simulate the message received from the server
  const getLastMessage = (owner: string) => {
    const lastMessage = conversation.filter((message) => message.owner === owner).pop()
    if (!lastMessage) return undefined
    return {
      id: lastMessage.id,
      date: lastMessage.date,
      message: lastMessage.text,
      type: 'receive',
    } as TMessage
  }

  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      width: '100%',
      height: '100vh',
    }}>
      <CustomChat
        client={'Albert'}
        messageReceived={getLastMessage('Nina')}
        sendMessage={handleOnMessageSend}
      />
      <CustomChat
        client={'Nina'}
        messageReceived={getLastMessage('Albert')}
        sendMessage={handleOnMessageSend}
      />
    </div>
  )
}

export default Example2
