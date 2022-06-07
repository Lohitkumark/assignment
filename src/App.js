import './App.css'
import React,{useState, useEffect} from 'react'
import Nav from './features/navigation/Nav';


function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  const handleAuth = () => {
    setUserLoggedIn(!userLoggedIn)
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      handleAuth()
    }
  }, [])
  
  // console.log(userLoggedIn);
  
  return (
    <div>
        <Nav userLoggedIn={userLoggedIn} handleAuth={handleAuth}/>
    </div>
  );
}

export default App;
