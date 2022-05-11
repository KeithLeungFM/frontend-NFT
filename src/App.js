import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { createTheme, ThemeProvider } from '@mui/material/styles';

import Mint from './Mint'
import Withdraw from "./Withdraw"


function App() {
  return (
    <Router>
      <Routes>
        <Route path ="/mint" element={<Mint/>}/>
        <Route path ="/withdraw" element={<Withdraw/>}/>
        <Route path ="/" element={<Withdraw/>}/>

      </Routes>
    </Router>
  );
}

export default App;
