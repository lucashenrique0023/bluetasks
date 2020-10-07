import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import NavBar from './components/NavBar';
import TaskForm from './components/TaskForm';
import TaskListTable from './components/TaskListTable';
import { AuthContext, useAuth } from './hooks/useAuth';

const App = () => {

  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      <BrowserRouter>
        <div className="App">
          <NavBar onLinkClick={""} />
          <div className="container" style={{ marginTop: 20 }}>
            <Switch>
              <Route path="/login" exact component={ Login } />
              <Route path="/form" exact component={ TaskForm } />
              <Route path="/form/:id" exact component={ TaskForm } />
              <Route path="/" component={ TaskListTable } />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}


export default App;
