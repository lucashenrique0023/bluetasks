import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import NavBar from './components/NavBar';
import TaskForm from './components/TaskForm';
import TaskListTable from './components/TaskListTable';

class App extends Component {
  constructor(props){
    super(props)

    this.onRefreshHandler = this.onRefreshHandler.bind(this);
  }

  onRefreshHandler() {
    this.forceUpdate();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar onLinkClick={this.onRefreshHandler} />
          <div className="container" style={{ marginTop: 20 }}>
            <Switch>
              <Route path="/login" exact render={() => <Login onLoginSuccess={this.onRefreshHandler} />} />
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
