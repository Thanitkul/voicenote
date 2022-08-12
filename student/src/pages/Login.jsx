import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';


const Login= () =>{
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  }


  return (
    <><h1>Login</h1><div className="field col-12 md:col-4" 
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <span className="p-float-label">
        <h2>Username</h2>
        <InputText id="inputtext" value={value1} onChange={(e) => setValue1(e.target.value)} />
      </span>
    </div>
    <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
    <span className="p-float-label">
    <h2>Basic</h2>
                <Password value={value2} onChange={(e) => setValue2(e.target.value)} feedback={false} />
                </span>
    </div>
    <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
    <button onClick={handleSubmit} className="btn" type="submit">Login</button>
    </div>
    </>

  )
}

export default Login