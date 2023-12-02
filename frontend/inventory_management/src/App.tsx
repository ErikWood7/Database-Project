import { useEffect, useState } from "react"
import { Login, Navbar } from "./components"
import { BrowserRouter } from "react-router-dom"
import Dashboard from "./components/Dashboard"

function App() {
  const [loginInfo, setLoginInfo] = useState<UserLogin | null>(null)
  const [loading, setLoading] = useState<Boolean>(true)
  useEffect(() => {
     const loggedInUser = localStorage.getItem("loginInfo");
     if (loggedInUser) {
       const foundUser = JSON.parse(loggedInUser);
       setLoginInfo(foundUser);
     }
     setLoading(false)
   }, []);

  if (loading) { return "Loading" }
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
