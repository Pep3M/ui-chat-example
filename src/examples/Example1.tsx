import { Chat } from 'react-ui-chat'
import "react-ui-chat/tailwind.css" // if you are not using tailwind
import { TMessage } from 'react-ui-chat/types' // if you are using typescript

const initialMessages: TMessage[] = [
  {
    id: 1,
    message: 'I need help with my order',
    date: new Date().toISOString(),
    type: "sent",
  },
  {
    id: 2,
    message: 'Hello, how can I help you?',
    date: new Date().toISOString(),
    type: "receive",
  },
]

const Example1 = () => <Chat initialMessages={initialMessages}/>

export default Example1
