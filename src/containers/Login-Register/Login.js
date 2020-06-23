import React, {useState, useEffect} from 'react'
import './style.css'
import { Auth } from 'aws-amplify';
import {Link} from "react-router-dom";
import ValueLoader from '../../utils/loader'
import Input from '../../component/UI/Input/Input'
import Button from '../../component/UI/Button/Button'
import history from '../../utils/history'

const Login = (props) => {
    const type = props.match.url
    const [user,setUser]= useState()
    const [password,setPassword]= useState()
    const [signedIn,setSignedIn]= useState(false)
    const [error,setError] = useState(false)
    const [userError,setuserError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [message,setmessage] = useState()
    const [loader,setLoader] = useState(false)

    useEffect(() => {
        let updateUser = async authState => {
          try {
             await Auth.currentAuthenticatedUser()
             setSignedIn(true)
            
          } catch {
             setSignedIn(false)
          }
        }
        updateUser()
      }, [signedIn]);

    const signIn = () => {
        Auth.signIn({
            username: user,
            password: password
        })
        .then(() =>( history.push('/dashboard'),
        window.location.reload() 
        ))
        .catch((err) => setmessage(err.message),setError(true))
    }

    function validateEmail(user) {
        // eslint-disable-next-line no-useless-escape
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(user).toLowerCase());
    }

    const handleSubmit = e => {
        e.preventDefault()
        if(Validation()){
         setLoader(true)
         signIn()
         setUser('')
         setPassword('')
        }
}

const Validation = () => {
    if(!validateEmail(user)){
        setuserError(true)
    }
    if(!password){
        setPasswordError(true)
    }
    else{
        return true
    }

}

   const handleChange = e => {
       setError(false)
       setuserError(false)
       setPasswordError(false)
        if (e.target.id === 'username') {
          setUser(e.target.value)
          
        } else if (e.target.id === 'password') {
          setPassword(e.target.value)
        }
    }


  

    return(
    <div className="login-wrapper">
        <div className="container-fluid">
        <div className="row">
        <div className="col-md-6 cover-image"> </div>
			<div className="col-md-6">
                <div className="login-form-wrapper">
					<div className="login-form-header">
						<h1>Howdy! Welcome Back</h1>
						<p> login to start working on your business profile page </p>
					</div>
                    {error ?<div className="form-group"><br /><h6>{message}</h6></div>: null}
                    <div className="login-form-nested-wrapper login-fields-spacing"> 
                    <form onSubmit={ (e) => handleSubmit(e) }>
							<div className="form-group">
                                <Input type="text" id='username' onChange={(e) => handleChange(e)} 
                                 error={userError}  placeholder="Email address"/>
							</div>
                            <div className="form-group">

                                <Input type="password" id='password' onChange={(e) => handleChange(e)}
                                  error={passwordError} placeholder="Password" />
							</div>
							<div className="form-group remember-checkbox">
								<input type="checkbox" id="rememberMe" />
								<label htmlFor="rememberMe">Remember me</label>
							</div>	
                            <Button type="submit" className="btn btn-primary">{loader && !message? <ValueLoader /> : 'Login'}</Button>
    
                            <div className="login-links-wrapper login-links-extra-links">
                            { type.includes('business') ?
                            <Link to ='/business/register' >Don't have an account? <strong>Signup</strong></Link> :
                             <Link to ='/curator/register' >Don't have an account? <strong>Signup</strong></Link>
                             }
                               { type.includes('business') ?
                            <Link to ='/business/forgot-password' >Forgot Password</Link> :
                             <Link to ='/curator/forgot-password' >Forgot Password</Link>
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

export default Login