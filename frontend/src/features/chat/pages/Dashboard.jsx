import { initializedSocketConnection } from '../services/chat.socket'
import { useEffect } from 'react'

const Dashboard = () => {
   useEffect(()=> {
        initializedSocketConnection()
    }, [])
  return (
    <div>
      dashboard
    </div>
  )
}

export default Dashboard
