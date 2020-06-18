import React, {useState, useEffect} from 'react'
import './login.css'
import { Auth } from 'aws-amplify';
import {Link} from "react-router-dom";

const Login = (props) => {
    const type = props.match.url
    const [user,setUser]= useState()
    const [password,setPassword]= useState()
    const [signedIn,setSignedIn]= useState(false)
    const [error,setError] = useState(false)
    useEffect(() => {
        let updateUser = async authState => {
          try {
             await Auth.currentAuthenticatedUser()
            setSignedIn(true)
            
          } catch {
           
          }
        }
        updateUser()
      }, []);

    const signIn = () => {
        Auth.signIn({
            username: user,
            password: password
        })
        .then(() =>{  setSignedIn(true) 
            console.log('successfully signed in')})
        .catch((err) => setError(true))
    }

    const handleSubmit = e => {
        e.preventDefault()
         signIn()
         setUser('')
         setPassword('')
         e.target.reset()
}

   const handleChange = e => {
        if (e.target.id === 'username') {
          setUser(e.target.value)
          
        } else if (e.target.id === 'password') {
          setPassword(e.target.value)
        }
    }


  
    if (signedIn) {
        return (
            <div>
                <h1>You have signed in!</h1>
                <button type="submit" onClick = {() => (
                    // eslint-disable-next-line no-sequences
                    Auth.signOut(),
                    window.location.reload())} className="btn btn-primary">  <Link to ='/register' ></Link>Logout</button>
            </div>
        );
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
						<h1>Howdy! Welcome Back</h1>
						<p> login to start working on your business profile page </p>
					</div>
                    <div className="login-form-nested-wrapper login-fields-spacing"> 
                    <form onSubmit={ (e) => handleSubmit(e) }>
							<div className="form-group">
                            <input type="email" id='username' onChange={(e) => handleChange(e)} className="form-control" placeholder="Email address"/>
							</div>
                            <div className="form-group">
								<input type="password" id='password' onChange={(e) => handleChange(e)} className="form-control" placeholder="Password" />
							</div>
							<div className="form-group remember-checkbox">
								<input type="checkbox" id="rememberMe" />
								<label htmlFor="rememberMe">Remember me</label>
							</div>	
							<button type="submit" className="btn btn-primary">Login</button>
                            {error ?<div class="form-group"><br /><h6> Invalid Username or Password</h6></div>: null}
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
}

export default Login