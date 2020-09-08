import React, {useState, useEffect} from 'react'
import './style.css'
import { Auth } from 'aws-amplify';
import {getMessage} from '../../config'

import history from '../../utils/history'
import Wrapper from '../../component/Login-Register/Wrapper'
import LoginForm from '../../component/Login-Register/Form-Components/Login-Form'

const renderMessage= getMessage()

const Login = (props) => {
    const type = props.match.url
    const [user,setUser]= useState()
    const [password,setPassword]= useState()
    const [error,setError] = useState(false)
    const [userError,setuserError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [message,setmessage] = useState()
    const [loader,setLoader] = useState(false)

    useEffect(() => {
        let updateUser = async authState => {
          try {
             await Auth.currentAuthenticatedUser()
             history.push('/dashboard')
             window.location.reload() 
            
          } catch {
             console.log(message)
          }
        }
        updateUser()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    const signIn = () => {
        Auth.signIn({
            username: user,
            password: password
        })
        // eslint-disable-next-line no-sequences
        .then(() =>( history.push('/dashboard'),
        window.location.reload() 
        ))
        .catch((err) =>{ 
        if(err){
            return(setmessage(err.message),setError(true))}})
    }

    function validateEmail(user) {
        // eslint-disable-next-line no-useless-escape
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(user).toLowerCase());
    }

    const handleSubmit = e => {
        e.preventDefault()
        setError(false)
        setmessage()
        if(Validation()){
         setLoader(true)
         signIn()
        }
}

const Validation = () => {
    if(!user){
      setuserError(true)
    }
    if(user){
    if(!validateEmail(user)){
        setError(true)
        setmessage(renderMessage.emErr)
    }
}
    if(!password){
        setPasswordError(true)
    }
    else if(user && password && validateEmail(user)){
        return true
    }

}

   const handleChange = e => {
       setError(false)
       setmessage()
       setLoader(false)
       setuserError(false)
       setPasswordError(false)
        if (e.target.id === 'username') {
          setUser(e.target.value.trim())
          
        } else if (e.target.id === 'password') {
          setPassword(e.target.value)
        }
    }



    return(
        <Wrapper type ={type} page='login' heading={renderMessage.Welcome} welcomeMessage={renderMessage.Login_Mess} >
            <LoginForm
                  type ={type}
                  error={error}
                  userError={userError}
                  passwordError={passwordError}
                  loader={loader}
                  message={message}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  />
                  </Wrapper>
   
    )
}

export default Login