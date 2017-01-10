import React from 'react';
import { render } from 'react-dom';
// components
import App from './components/App';


window.React = React;

render(<App />, document.getElementById('container'));
