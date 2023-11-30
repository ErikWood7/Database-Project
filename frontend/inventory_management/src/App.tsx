import { useState } from "react"
import { Login, Navbar } from "./components"
import { BrowserRouter } from "react-router-dom"
import Dashboard from "./components/Dashboard"

function App() {
  const [loginInfo, setLoginInfo] = useState<UserLogin | null>(null)


  return (
    <BrowserRouter>
    <div className="min-h-full">
        <Navbar loginInfo={loginInfo} />
        {(!loginInfo) ? <Login setLoginInfo={setLoginInfo} /> : <Dashboard />} 
    </div>
    </BrowserRouter>
  )
}

export default App
