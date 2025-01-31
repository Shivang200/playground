import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/Signup.jsx';
import Signin from './pages/Signin.jsx';
import Landing from './pages/Landing.jsx';
import Chat from './utils/Chat.jsx';




function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        {/* <Route path='/' element={<div>Home</div>} /> */}
        <Route path="/" element={<Landing/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/chat" element={<Chat/>} />
        
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;