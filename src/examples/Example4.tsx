import { TUser } from "react-ui-chat/types"
import ChatIo from "./Example4/ChatIo"

const Albert: TUser = {
  id: '1',
  name: 'Albert',
}

const Nina: TUser = {
  id: '2',
  name: 'Nina',
}

const Example4 = () => {
  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      width: '100%',
      height: '100vh',
    }}>
      <ChatIo user={Albert} room="Albert-Nina" />
      <ChatIo user={Nina} room="Albert-Nina" />
    </div>
  )
}
export default Example4