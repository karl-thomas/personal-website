import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';



const user = {
  firstName: 'Karl',
  lastName: 'Thomas'
};

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

function customGreeting(userObj) {
  if (userObj) {
  // here i am using curly braces to shove an expression in the "html"
  // you can use string literals when declaring attribute names within react.
    return <h1> Hello, {formatName(userObj)}!</h1>
  } 
  else {
    return <h1> Hello, Stranger. </h1>
  }
};

// function tick (user){
//   const greeting = (
//     <div>
//       {customGreeting(user)}
//       <h2> It is {new Date().toLocaleTimeString()}.</h2>
//     </div> 
//   );
//   ReactDOM.render(
//     greeting,
//     document.getElementById('root')
//   ); 
// };

// // it's rendering the app js file here, in the reacting dom guy which makes sense
// setInterval(tick(user), 1000)

function tick() {
  const element = (
    <div>
      {customGreeting(user)}
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
