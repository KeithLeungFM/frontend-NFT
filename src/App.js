import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { createTheme, ThemeProvider } from '@mui/material/styles';

import Mint from './Mint'
import Withdraw from "./Withdraw"
import Album from "./Album"


function App() {
  return (
    <Router>
      <Routes>
        <Route path ="/mint" element={<Mint/>}/>
        <Route path ="/withdraw" element={<Withdraw/>}/>
        <Route path ="/" element={<Album/>}/>

      </Routes>
    </Router>
  );
}

export default App;
