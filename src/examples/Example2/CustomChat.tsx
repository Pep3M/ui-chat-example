import { Chat } from 'react-ui-chat'
import "react-ui-chat/tailwind.css" // if you are not using tailwind
import { TMessage } from 'react-ui-chat/types' // if you are using typescript

type CustomChatProps = {
  client: string,
  messageReceived?: TMessage | null,
  sendMessage: (message: TMessage, client: string) => void,
}

function CustomChat({ client, messageReceived, sendMessage }: CustomChatProps) {
  const config = {
    onMessageSend: (message: TMessage) => sendMessage(message, client),
    messageReceived, // new message received, not ALL messages
  }

  return (
    <Chat {...config}/>
  )
}

export default CustomChat
