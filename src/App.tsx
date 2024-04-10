import "react-ui-chat/tailwind.css"
import Example1 from "./examples/Example1"
import Example2 from "./examples/Example2"
import Example3 from "./examples/Example3"
import Example4 from "./examples/Example4"
import { useEffect, useState } from "react"

const examples = [
  {
    id: 'example1',
    name: 'Example 1',
    component: Example1,
    description: 'Simple chat with one user and initial data',
  },
  {
    id: 'example2',
    name: 'Example 2',
    component: Example2,
    description: 'Simulate a chat between two users, passing only the last message received.'
  },
  {
    id: 'example3',
    name: 'Example 3',
    component: Example3,
    description: 'Simulate a chat between two users, passing ALL messages using a local state.'
  },
  {
    id: 'example4',
    name: 'Example 4',
    component: Example4,
    description: 'Use socket.io to send and receive messages between two users, but in same component.'
  },
  // {
  //   id: 'exampleDiffTabs',
  //   name: 'ExampleDiffTabs',
  //   component: ExampleDiffTabs,
  //   description: 'Use socket.io to send and receive messages between two users in different navigator tabs'
  // }
]

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    const id = window.location.pathname.slice(1)
    const index = examples.findIndex((example) => example.id === id)
    if (index === -1) return
    setCurrentIndex(index)
  }, [])
  
  const handleNavigate = (id: string) => {
    // set route to pathname in url bar
    window.history.pushState({}, '', `/${id}`)
    const index = examples.findIndex((example) => example.id === id)
    if (index === -1) return
    setCurrentIndex(index)
  }

  const Example = examples[currentIndex].component
  
  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      width: '100vw',
      height: '100vh',
      padding: '1rem',
      backgroundColor: '#eaedf5',
      color: '#2c2b3b',
    }}>
      {/* sidebar */}
      <div style={{
        width: '200px',
        height: '100%',
        backgroundColor: '#d9ddec',
        padding: '1rem',
        overflowY: 'auto',
        borderRadius: '8px',
      }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', width: '100%', textAlign: 'center', paddingBottom: 20 }}>Ejemplos</h1>
        <ul>
          {examples.map((example, index) => (
            <li key={index} style={{ marginBottom: '1rem', cursor: 'pointer' }}
              onClick={() => handleNavigate(example.id)}
            >
              <h2 style={{ fontSize: 17 }}>{example.name}</h2>
            </li>
          ))}
        </ul>
      </div>

      {/* content */}
      <div style={{
        width: '100%',
        display: 'flex',
        gap: '1rem',
        padding: '1rem',
        overflowY: 'auto',
        borderRadius: '8px',
        backgroundColor: '#d9ddec'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
        }}></div>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>{examples[currentIndex].name}</h1>
        <p>{examples[currentIndex].description}</p>
        <Example />
      </div>
    </div>
  )
}
export default App