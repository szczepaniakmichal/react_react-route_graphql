import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';

import { Page } from './components/route/Page';

import './App.css';

function App() {
    return (
        <>
            <Router>
                <Page/>
            </Router>
        </>
    );
}

export default App;
