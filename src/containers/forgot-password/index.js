import React, { useState } from 'react'
import './forgot-password.css'
import { Auth } from 'aws-amplify';
import {Link} from 'react-router-dom'

const ForgotPassword = (props) => {
    const type = props.match.url
    const [username,setUserName] = useState()
    const [code,setCode] = useState()
    const [new_password,setPassword] = useState()
    const [confirmPass,setConfirmPass] = useState()
    const [email,setEmail] = useState(false)
    const [message,setMessgae] = useState(false)
    const [error,setError] = useState(false)
    const [emailError,setEmailError] = useState(false)
    const [passErr,setPassErr] = useState(false)

    const submitEmail = e => {
        e.preventDefault()
    Auth.forgotPassword(username)
    .then(data => setEmail(true) )
    .catch(err => setEmailError(true));
        e.target.reset()
    }
   
    const submitPassword = e => {
        setError(false)
        setPassErr(false)
        e.preventDefault()
        if(new_password === confirmPass){
    Auth.forgotPasswordSubmit(username, code, new_password)
    .then(data => setMessgae(true) )
    .catch(err => setError(true));
    setPassword('')
    setCode('')
    e.target.reset()}
    else{
        setPassErr(true)
        e.target.reset()
    }
   }

   const handleChange = e => {
    if (e.target.id === 'username') {
      setUserName(e.target.value)
      
    } else if (e.target.id === 'password') {
      setPassword(e.target.value)
    }
    else if (e.target.id === 'code') {
        setCode(e.target.value)
      }
      else if (e.target.id === 'conPassword') {
        setConfirmPass(e.target.value)
      }
}

if(email === true)
{ return(
    <div className="login-wrapper">
    <div className="container-fluid">
        <div className="row">			
            <div className="col-md-6 cover-image"> </div>
            <div className="col-md-6">
                <div className="login-form-wrapper">
                    <div className="login-form-header">
                        <h1>Reset Password </h1>
                        <p> Enter the code sent to your Registered Email And also Enter your new password </p>
                    </div>
                    <div className="login-form-nested-wrapper">
                        <form onSubmit = {e => submitPassword(e)}>
                            <div className="form-group">
                                <input type="text" id="code" className="form-control" onChange={e => handleChange(e)} placeholder="Verification Code"/>
                            </div>
                            <div className="form-group">
                                <input type="password" id="password" className="form-control" onChange={e => handleChange(e)} placeholder="New Password"/>
                            </div>
                            <div className="form-group">
                                <input type="password" id="conPassword" className="form-control" onChange={e => handleChange(e)} placeholder="Confirm Password"/>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            {message ?<div className="form-group"><br /><h5>Your password succesfully Changed </h5></div>: null}
                            {error ?<div className="form-group"><br /><h6> Invalid Verification Code</h6></div>: null}
                            {passErr ?<div className="form-group"><br /><h6> Password Does not Match</h6></div>: null}
                            <div className="login-links-wrapper">
                            { type.includes('business') ?
                            <Link to ='/business/login' className="link-btn">Back to Login</Link> :
                            <Link to ='/curator/login' className="link-btn">Back to Login</Link>
                             }
                            </div>
                        
                            
                        </form>
                    </div>
            

                </div>

                
            </div>			
        </div>
    </div>
</div>
)

}
else{
    return(
        <div className="login-wrapper">
        <div className="container-fluid">
            <div className="row">			
                <div className="col-md-6 cover-image"> </div>
                <div className="col-md-6">
                    <div className="login-form-wrapper">
                        <div className="login-form-header">
                            <h1>Reset Password </h1>
                            <p> Enter the email address you registered with and we'll send you instruction to Reset your password </p>
                        </div>
                        <div className="login-form-nested-wrapper">
                            <form onSubmit = {e => submitEmail(e)}>
                                <div className="form-group">
                                    <input type="email" id="username" className="form-control" onChange={e => handleChange(e)} placeholder="Email address"/>
                                </div>
                                <button type="submit" className="btn btn-primary">Reset</button>
                                
                                {emailError ?<div className="form-group"><br /><h6>This Email is not Registered.</h6></div>: null}
                                <div className="login-links-wrapper">
                            { type.includes('business') ?
                            <Link to ='/business/login' className="link-btn">Back to Login</Link> :
                            <Link to ='/curator/login' className="link-btn">Back to Login</Link>
                             }
                            </div>
                            
                                
                            </form>
                        </div>
                
    
                    </div>
    
                    
                </div>			
            </div>
        </div>
    </div>
    )

}
    
}

export default ForgotPassword