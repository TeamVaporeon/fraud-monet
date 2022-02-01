import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import CreateRoom from './Components/CreateRoom.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = document.getElementById('root');

render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<CreateRoom />} />
      <Route path='/play' element={<App />} />
    </Routes>
  </BrowserRouter>,
  root
);
