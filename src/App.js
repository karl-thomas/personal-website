import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import logo from './logo.svg';
import './App.css';


// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Karl',
  lastName: 'Thomas'
};

function tick (user){
  const greeting = (
    <div>
      function customGreeting = {
        if (user) {
        // here i am using curly braces to shove an expression in the "html"
        // you can use string literals when declaring attribute names within react.
          <h1> Hello, {formatName(user)}!</h1>
        } 
        else {
        <h1> Hello, Stranger. </h1>
        }
      };
      <h2> It is {new Date().toLocaleTimeString()}.</h2>
    </div> 
    );
  ReactDOM.render(
    greeting,
    document.getElementById('root')
  ); 
};

// this app class gets called in the ReactDOM display
class App extends Component {
  render() {
    return (
      tick(user)
      setInterval(tick, 1000);
    );
  }
}

export default App;
