import './App.css'
import { Routes, Route } from 'react-router-dom';
import Callback from './callback';
import Landing from './Landing.tsx';
import CheckoutForm from './CheckoutForm.tsx';
import Return from './CheckoutReturn.tsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/callback" element={<Callback />} />
        <Route path="/" element={<Landing/>}/>
        <Route path="/checkout" element={<CheckoutForm/>}/>
        <Route path="/return" element={<Return/>}/>
      </Routes>
    </>
  )
}

export default App
