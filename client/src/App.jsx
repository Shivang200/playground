import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './pages/Signup.jsx';
import Signin from './pages/Signin.jsx';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<div>Home</div>} /> */}
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<Signin />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;