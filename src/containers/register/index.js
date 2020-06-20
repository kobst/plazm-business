import React, {useState} from 'react'
import './register.css'
import { Auth } from 'aws-amplify';
import history from '../../utils/history'
import {Link} from "react-router-dom";
import SearchLocationInput  from '../../utils/findYourBusiness'

const Register = (props) => {
     const type = props.match.url
    const [username,setUser]= useState()
    const [password,setPassword]= useState()
    const [verified,setVerified]= useState(false)
    const [email,setEmail]= useState()
    const [confirmationCode,setconfirmationCode]= useState()
    const [phone_number,setPhoneNumber]= useState()
    const [err,setError] = useState(false)
    const [message,setMessage] = useState()
    const [codeError,setCodeError] = useState(false)
    const [firstNameError,setFirstNameError] = useState(false)
    const [emailError,setEmailError] = useState(false)
    const [phoneError, setPhoneError] = useState(false)
    const [passwordError,setPasswordError] = useState(false)
    const [business,setbusiness] = useState(false)

    const signUp = () => {
        Auth.signUp({
            username: email,
            password: password,
            attributes: {
                email: email,
                phone_number: phone_number, 
                name: username,
            }
        })
        .then(() => {
            setVerified(true)
        })
        .catch((err) => setMessage(err.message) , setError(true) )
    }
  
    const confirmSignUp = () => {
        Auth.confirmSignUp(email, confirmationCode)
        .then(() => {
            if(type.includes('business')){
            return (history.push(`/business/login`),
            window.location.reload() )
            }
            else{
                return( history.push(`/curator/login`),
                window.location.reload())  
            }
        })
        .catch((err) => setCodeError(true))
    }
 
    function validateEmail(email) {
        // eslint-disable-next-line no-useless-escape
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const Validation = () => {
        if(!username){
            setFirstNameError(true)
        }
        if(!phone_number){
            setPhoneError(true)
        }
        if(!validateEmail(email)){
            setEmailError(true)
        }
        if(!password){
            setPasswordError(true)
        }
        else{
            return true
        }

    }
  
   const handleSubmit = (e) => {
        e.preventDefault();
        if (verified) {
            confirmSignUp();
            setconfirmationCode('')
            setUser('')
          }
        if(Validation()){
           signUp();
          setPassword()
          setPhoneNumber()
        }
    }
  
    const handleChange = (e) => {
        setFirstNameError(false)
        setPhoneError(false)
        setEmailError(false)
        setPasswordError(false)
        setError(false)
        setCodeError(false)
        if (e.target.id === 'username') {
            setUser(e.target.value)
        } else if (e.target.id === 'password') {
          setPassword(e.target.value)
        } else if (e.target.id === 'phone_number') {
          setPhoneNumber(e.target.value)
        } else if (e.target.id === 'email') {
          setEmail(e.target.value)
        } else if (e.target.id === 'confirmationCode') {
          setconfirmationCode(e.target.value)
        }
    }

    if(type.includes('business')){
    return(
        <div className="login-wrapper">
        <div className="container-fluid">
            <div className="row">			
                <div className="col-md-6 cover-image"> </div>
                <div className="col-md-6">
                    
                    <div className="login-form-wrapper">
                    
                        <div className="login-form-header">
                            <h1>Register to Get Started</h1>
                            <p> Start working on your business profile page </p>
                        </div>
                        {err ?<div class="form-group"><br /><h6>{message}</h6></div>: null}
                       
                        <div className="login-form-nested-wrapper">
                            { verified ? ( <form onSubmit={ (e)=> handleSubmit(e) }>
                            <div className="row">
                                    <div className="col-md-12">
                                    <p> Enter the Confirmation code sent to your Registered Email</p>
                                        <div className="form-group">
                                          <input id='confirmationCode' type='text' onChange={ (e) => handleChange(e)} placeholder="Confirmation Code"/>
                                        </div>
                                        <button type="submit" className="btn btn-primary">Confirm Sign up</button>
                                        {codeError ?<div class="form-group"><br /><h6>Confirmation code does not match</h6></div>: null}
                                     </div>
                          </div>
                        </form> ) :
                            <form onSubmit={ (e)=> handleSubmit(e) }>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" id="username" onChange={ (e) => handleChange(e) }
                                             className={firstNameError ? "form-error": "form-control"} placeholder="First Name"/>
                                                           
                                        </div>									
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input id="last_name" onChange={ (e) => handleChange(e)} type="text" className="form-control" placeholder="Last Name"/>
                                        </div>									
                                    </div>								
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input id='phone_number' onChange={ (e) => handleChange(e) } 
                                            className={phoneError ? "form-error": "form-control"} placeholder="Phone Number"/>
                                        </div>									
                                    </div>
                                </div>		
    
            
                                
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input type="email" id='email' onChange={ (e) => handleChange(e) } 
                                            className={emailError ? "form-error": "form-control"} placeholder="Email address"/>
                                    
                                        </div>									
                                    </div>
                                </div>	
    
    
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input type="password" id="password" onChange={ (e) => handleChange(e) } 
                                            className={passwordError ? "form-error": "form-control"} placeholder="Password"/>
                                        </div>									
                                    </div>
                                </div>
    
    
                          
                                <div className="find-your-business-wrapper">
                                    <h2 onClick= {()=> setbusiness(true)}> Find Your Business</h2>
                                    <br />
                                    <div className="form-group">
                                    {business ? <SearchLocationInput className="form-control" onChange={() => null} />: null }
                                        </div>
                                    <p>By clicking register, I represent I have read, understand, and agree to the Postmates Privacy Policy and Terms of Service. This site is protected bt reCAPTCHA and google Privacy Policy and Terms of Service apply.</p>
                                </div>
                        
                            
                                
    
                                <button type="submit" className="btn btn-primary">Register</button>
                                <div className="login-links-wrapper login-links-extra-links">
                                { type.includes('business') ?
                            <Link to ='/business/login' className="link-btn">Already have an account? <strong>Log In</strong></Link> :
                            <Link to ='/curator/login' className="link-btn">Already have an account? <strong>Log In</strong></Link>
                             }
                                
                                </div>
                          							
    
                                
                            </form>
}
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
                            <h1>Register to Get Started</h1>
                            <p> Start working on your business profile page </p>
                        </div>
                       
                        <div className="login-form-nested-wrapper">
                            { verified ? ( <form onSubmit={ (e)=> handleSubmit(e) }>
                            <div className="row">
                                    <div className="col-md-6">
                                    <p> Enter the Confirmation code sent to your Registered Email</p>
                                        <div className="form-group">
                                          <input id='confirmationCode' type='text' onChange={ (e) => handleChange(e)} placeholder="Confirmation Code"/>
                                        </div>
                                        <button type="submit" className="btn btn-primary">Sign up</button>
                                        {codeError ?<div className="form-group"><br /><h6>Confirmation code does not match</h6></div>: null}
                                     </div>
                          </div>
                        </form> ) :
                            <form onSubmit={ (e)=> handleSubmit(e) }>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input type="text" id="username" onChange={ (e) => handleChange(e) } 
                                            className={firstNameError ? "form-error": "form-control"} placeholder="First Name"/>
                                        
                                        </div>									
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <input id="last_name" onChange={ (e) => handleChange(e)} type="text" className="form-control" placeholder="Last Name"/>
                                        </div>									
                                    </div>								
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input id='phone_number' onChange={ (e) => handleChange(e) } 
                                           className={phoneError ? "form-error": "form-control"} placeholder="Phone Number"/>
                                          
                                        </div>									
                                    </div>
                                </div>		
    
            
                                
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input type="email" id='email' onChange={ (e) => handleChange(e) } 
                                            className={emailError ? "form-error": "form-control"} placeholder="Email address"/>
                                           
                                        </div>									
                                    </div>
                                </div>	
    
    
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <input type="password" id="password" onChange={ (e) => handleChange(e) } 
                                            className={passwordError ? "form-error": "form-control"} placeholder="Password"/>
                                           
                                        </div>									
                                    </div>
                                </div>
    
    
                          
                                <div className="find-your-business-wrapper">
                                    <p>By clicking register, I represent I have read, understand, and agree to the Postmates Privacy Policy and Terms of Service. This site is protected bt reCAPTCHA and google Privacy Policy and Terms of Service apply.</p>
                                </div>
                            
                                
    
                                <button type="submit" className="btn btn-primary">Register</button>
                                 {err ?<div className="form-group"><br /><h6>{message}</h6></div>: null}
                                <div className="login-links-wrapper login-links-extra-links">
                                { type.includes('business') ?
                            <Link to ='/business/login' className="link-btn">Already have an account? <strong>Log In</strong></Link> :
                            <Link to ='/curator/login' className="link-btn">Already have an account? <strong>Log In</strong></Link>
                             }
                                
                                </div>
                          							
    
                                
                            </form>
}
                        </div>
                  
    
                    </div>
              
    
                    
                </div>			
            </div>
        </div>
    </div>
    )

}
}

export default Register