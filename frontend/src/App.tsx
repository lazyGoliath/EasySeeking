import { Navigate, Outlet } from 'react-router-dom'
import './App.css'
import { useUser } from '@clerk/clerk-react'
import Header from './components/custom/Header';

function App() {
  const {isLoaded, isSignedIn} = useUser();

  if(!isSignedIn&&isLoaded){
    return <Navigate to={'/auth/signin'}/>
  }
  
  return (
    <div>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default App
