import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './Pages/Home';
import Chat from './Pages/Chat';

class App extends Component {

  render() { 
    return ( 
      <div>
        <Switch>
          <Route path='/' exact component={Home}></Route>
          <Route path='/chat' component={Chat} />
        </Switch>
      </div>
     );
  }
}
 
export default App;