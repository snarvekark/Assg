//Author : SN
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
//import $ from 'jquery';
//import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      uname: '',
      errormessage: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    fetch('/api/form-submit-url', {
      method: 'POST',
      body: data,
    });
   }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    let err = '';
    if (nam === "name" || nam === "uname") {
      if (val === "") {
        err = <strong>Please enter a value</strong>;
      }
    }
    this.setState({errormessage: err});
    this.setState({[nam]: val});
  }
  render() {
    return (
	  <React.Fragment>
	  <div id="header">
	  	<h1>Twitter API</h1>
	  	<p>View, Post, Follow Your Tweets Here!</p> 
	  </div>	    
      <form onSubmit={this.handleSubmit}>
      <p>Enter your name:</p>
      <input
        type='text'
        name='name'
        id='name'
        onChange={this.myChangeHandler}
      />
      <p>Enter your Username:</p>
      <input
        type='text'
        name='uname'
        id='uname'
        onChange={this.myChangeHandler}
      />
      {this.state.errormessage}
      <br/>
      <br/>
      <input type='submit' value="Get Tweets" className="btn-grp"/>
      </form>
      <div id="timeline" name="timeline" value="Tweets">
      	<TwitterTimelineEmbed
		  sourceType="profile"
		  screenName="mscdsn"
		  options={{height: 400}}
	    />
      </div> 
      </React.Fragment>
    );
  }
}

ReactDOM.render(<MyForm />, document.getElementById('root'));
