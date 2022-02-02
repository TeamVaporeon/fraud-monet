import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import CreateRoom from './Components/CreateRoom.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = document.getElementById('root');

render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<CreateRoom />} />
      <Route path='/:id' element={<App />} />
    </Routes>
  </BrowserRouter>,
  root
);
