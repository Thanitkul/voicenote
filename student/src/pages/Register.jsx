import React from 'react';
import { useState } from 'react';
import { InputMask } from 'primereact/inputmask';


<><script src="https://unpkg.com/primereact/core/core.min.js"></script><script src="https://unpkg.com/primereact/calendar/calendar.min.js"></script></>

const Register = () => {
// States for registration
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
// const [day, setDay] =  useState('');
// const [month, setMonth] =  useState('');
// const [year, setYear] =  useState('');
const [value7, setValue7] = useState(null);
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

// const handleDay = (e) => {
//   setDay(e.target.value);
//   setSubmitted(false);
// };

// const handleMonth = (e) => {
//   setMonth(e.target.value);
//   setSubmitted(false);
// };

// const handleYear = (e) => {
//   setYear(e.target.value);
//   setSubmitted(false);
// };

// const arr1 = [{day}, {month}]
// const arr2 = [{year}]
// const arr3 = [...arr1, ...arr2]
// Handling the form submission
const handleSubmit = (e) => {
  e.preventDefault();
  if (name === '' || email === '' || password === '') {
    setError(true);
  } else {
    setSubmitted(true);
    setError(false);
    console.log({name}, {email}, {password});
    console.log(value7.split('/').join('-'));
    // console.log({day})
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


return (
  <div className="field col-12 md:col-4">
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
{/* 
      <label className="label"><label htmlFor="d1">Birthdate:</label><input tad-va="date"onChange={handleDay} className="day" value={day} placeholder="dd" type="text" autoComplete="off" onFocus="window.ifc&amp;&amp;ifc(this,'d')" pattern="[0-9]*" maxLength="2" size="3" id="d1" name="d1" title="Please enter the day of the month as a one or two-digit number. The valid range is from 1 to 31."/><span class="fld-aid">&nbsp;/&nbsp;</span></label>
      <label className="left"><label htmlFor="m1"></label><input tad-va="date" onChange={handleMonth} className="month" value={month} placeholder="mm" type="text" autoComplete="off" onFocus="window.ifc&amp;&amp;ifc(this,'m')" maxlength="12" size="3" id="m1" name="m1" title="Please enter the month of the year as a one or two-digit number, or as a name. The valid numeric range is from 1 to 12, and valid names, for example, are 'Oct' or 'October'."/><span class="fld-aid">&nbsp;/&nbsp;</span></label>
      <label className="left"><label htmlFor="y1"></label><input placeholder="yyyy" onChange={handleYear} className="year" value={year} type="text" autoComplete="off" tad-va="date" onFocus="window.ifc&amp;&amp;ifc(this,'y')" pattern="[0-9]*" maxlength="4" size="5" id="y1" name="y1" title="Enter year as a 4-digit number."/></label> */}
 
      <label className="field col-12 md:col-4">
                        <span className="p-float-label">
                            <label className="label">Birthdate</label>
                            <InputMask id="inputmask" value={value7} onChange={(e) => setValue7(e.value)} mask="99/99/9999" slotChar="mm/dd/yyyy" />
                            <label htmlFor="inputmask"></label>
                        </span>
                    </label>

      <button onClick={handleSubmit} className="btn" type="submit">
        Submit
      </button>
    </form>
  </div>
  
);
}

export default Register