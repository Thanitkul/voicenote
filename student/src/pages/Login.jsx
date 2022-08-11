import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';

const Login= () =>{
  const [value1, setValue1] = useState('');


  return (
    <><h1>Login</h1><div className="field col-12 md:col-4">
      <span className="p-float-label">
        <InputText id="inputtext" value={value1} onChange={(e) => setValue1(e.target.value)} />
        <label htmlFor="inputtext">InputText</label>
      </span>
    </div></>
  )
}

export default Login