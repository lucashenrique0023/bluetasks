import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import TaskForm from './components/TaskForm';
import TaskListTable from './components/TaskListTable';

class App extends Component {
  //constructor(props){
    
  //}

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar/>
          <div className="container" style={{ marginTop: 20 }}>
            <Switch>
              <Route path="/form" exact component={ TaskForm } />
              <Route path="/form/:id" exact component={ TaskForm } />
              <Route path="/" component={ TaskListTable } />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
