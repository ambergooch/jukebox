import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import Jukebox from './components/Jukebox';
import './index.css';
import 'fomantic-ui-css/semantic.css'
import 'spotify-web-api-js'

ReactDOM.render(
    <Router>
       <Jukebox />
    </Router>
    , document.getElementById('root'));

