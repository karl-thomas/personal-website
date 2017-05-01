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

function Welcome(props) {
  if (props.name) {
  // here i am using curly braces to shove an expression in the "html"
  // you can use string literals when declaring attribute names within react.
    return <h1> Hello, {props.name}!</h1>
  } 
  else {
    return <h1> Hello, Stranger. </h1>
  }
};

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}


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
const element = (
    <div>
      <Welcome name={formatName(user)} />
      <Clock />
    </div>
  );
// it's rendering the app js file here, in the reacting dom guy which makes sense/
ReactDOM.render(
  element,
  document.getElementById('root')
);
