import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Karl',
  lastName: 'Thomas'
  avatarUrl
};

function greeting(user){
  if (user){
    // here i am using curly braces to shove an expression in the "html"
    // you can use string literals when declaring attribute names within react.
    return <h1> Hello, {formatName(user)}! </h1>;
  }
  return <h1> Hello, Stranger. </h1>;
};

// this app class gets called in the ReactDOM display
class App extends Component {
  render() {
    return (
      greeting(user)
    );
  }
}

export default App;
