import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Title from './hooktest/Title';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.render(
  <React.StrictMode>
    <Title />
  </React.StrictMode>,
  document.getElementById('root')
);