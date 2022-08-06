import React from 'react';
import { useState } from 'react';


const Register = () => {
// States for registration
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

// States for checking the errors
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState(false);

// Handling the name change
const handleName = (e) => {
  setName(e.target.value);
  setSubmitted(false);
};

// Handling the email change
const handleEmail = (e) => {
  setEmail(e.target.value);
  setSubmitted(false);
};

// Handling the password change
const handlePassword = (e) => {
  setPassword(e.target.value);
  setSubmitted(false);
};

const handledate = (e) => {
  date.yyyymmdd();
  setSubmitted(false);
};

// Handling the form submission
const handleSubmit = (e) => {
  e.preventDefault();
  if (name === '' || email === '' || password === '') {
    setError(true);
  } else {
    setSubmitted(true);
    setError(false);
    console.log({name}, {email}, {password});
    console.log('age: ' + getAge({date}));
    console.log({date})
  }
};

// Showing success message
const successMessage = () => {
  return (
    <div
      className="success"
      style={{
        display: submitted ? '' : 'none',
      }}>
      <h1>User {name} successfully registered!!</h1>
    </div>
  );
};

// Showing error message if error is true
const errorMessage = () => {
  return (
    <div
      className="error"
      style={{
        display: error ? '' : 'none',
      }}>
      <h1>Please enter all the fields</h1>
    </div>
  );
};
Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('');
};

var date = new Date();
date.yyyymmdd();

const  getAge = (dateString)=>{
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}


return (
  <div className="form">
    <div>
      <h1>User Registration</h1>
    </div>

    {/* Calling to the methods */}
    <div className="messages">
      {errorMessage()}
      {successMessage()}
    </div>

    <form>
      {/* Labels and inputs for form data */}
      <label className="label">Name</label>
      <input onChange={handleName} className="input"
        value={name} type="text" />

      <label className="label">Email</label>
      <input onChange={handleEmail} className="input"
        value={email} type="email" />

      <label className="label">Password</label>
      <input onChange={handlePassword} className="input"
        value={password} type="password" />

      <label className="label">birth date</label>
      <input onChange={date.yyyymmdd()} className="input"
        value={date} type="date" />

      <button onClick={handleSubmit} className="btn" type="submit">
        Submit
      </button>
    </form>
  </div>
  
);
}

export default Register