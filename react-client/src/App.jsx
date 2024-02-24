import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [testData, setTestData] = useState("")

  useEffect(() => {
    axios.get('http://localhost:5000/test')
      .then((res) => {
        setTestData(res.data)
        console.log(res)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="app">
      <p>{testData}</p>
    </div>
  )
}

export default App
