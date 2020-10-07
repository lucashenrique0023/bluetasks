import React from 'react'
import ReactDOM from 'react-dom'
import CounterComposed from './hooktest/CounterComposed'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// ReactDOM.render(
//   <React.StrictMode>
//     <CounterComposed />
//   </React.StrictMode>,
//   document.getElementById('root')
// );