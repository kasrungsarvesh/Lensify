import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Layout>
      <Dashboard />
    </Layout>
      
    </>
  )
}

export default App
