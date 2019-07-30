import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import Jukebox from './components/Jukebox';
import './index.css';

ReactDOM.render(
    <Router>
       <Jukebox />
    </Router>
    , document.getElementById('root'));

