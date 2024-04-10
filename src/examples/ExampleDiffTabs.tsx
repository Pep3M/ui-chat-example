import { useState } from "react"
import ChatIo from "./ExampleDiffTabs/ChatIo"

const users = [
  { id: '1', name: 'Albert' },
  { id: '2', name: 'Nina' },
  { id: '3', name: 'John' },
]

const ExampleDiffTabs = () => {
  const [currentUser, setCurrentUser] = useState(users[0])
  const [targetUser, setTargetUser] = useState(users[1])
  
  const currentRoom = currentUser.id < targetUser.id
    ? `${currentUser.name}-${targetUser.name}`
    : `${targetUser.name}-${currentUser.name}`
  
  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      width: '100%',
      height: '100%',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}>
        <h3>Current User</h3>
        <select 
          value={currentUser.id}
          onChange={(e) => {
            const user = users.find((u) => u.id === e.target.value)
            if (!user) return
            setCurrentUser(user)
            if (user.id === targetUser.id) setTargetUser(users.find((u) => u.id !== user.id)!)
          }}
        >
          {users.map((user) => (
            <option key={`current-${user.id}`} value={user.id}>{user.name}</option>
          ))}
        </select>

        <h3 style={{
          marginTop: '1rem'
        }}>Target User</h3>
        <select 
          value={targetUser.id}
          onChange={(e) => {
            const user = users.find((u) => u.id === e.target.value)
            if (!user) return
            setTargetUser(user)
            if (user.id === currentUser.id) setCurrentUser(users.find((u) => u.id !== user.id)!)
          }}
        >
          {users.map((user) => (
            <option key={`target-${user.id}`} value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>

      <ChatIo user={currentUser} room={currentRoom} />
    </div>
  )
}
export default ExampleDiffTabs