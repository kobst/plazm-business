import React, { useState, useEffect } from 'react'
import './style.css'
import { Auth } from 'aws-amplify';
import history from '../../utils/history'
import Wrapper from '../../component/Login-Register/Wrapper'
import ForgotPasswordForm from '../../component/Login-Register/Form-Components/Forgot-Password-Form'
import {getMessage} from '../../config'

const renderMessage= getMessage()

const ForgotPassword = (props) => {
    console.log(props.match.params)
    const type = props.match.url
    const [username,setUserName] = useState()
    const [code,setCode] = useState()
    const [new_password,setPassword] = useState()
    const [confirmPass,setConfirmPass] = useState()
    const [email,setEmail] = useState(false)
    const [error,setError] = useState(false)
    const [emailError,setEmailError] = useState(false)
    const [passErr,setPassErr] = useState(false)
    const [verificationErr,setVerificationErr] = useState()
    const [codeErr,setcodeErr] = useState(false)
    const [newPassErr,setNewPassErr] = useState(false)
    const [confirmPassErr,setConfirmPassErr] = useState(false)
    const [con,setCon] = useState(false)
    const [loader,setLoader] = useState(false)
    const [emError,setEmError]= useState(false)
    
    useEffect(() => {
        let updateUser = async authState => {
          try {
             await Auth.currentAuthenticatedUser()
             history.push('/dashboard')
             window.location.reload() 
            
          } catch {
          }
        }
        updateUser()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    const submitEmail = e => {
        e.preventDefault()
        setLoader(true)
        if(username&&validateEmail(username)){
    Auth.forgotPassword(username)
    .then(data => setEmail(true) )
    .catch(err => setEmailError(true));
        e.target.reset()
        }
        else{
            setLoader(false)
            setEmError(true)

        }
    }
   
    const submitPassword = e => {
        e.preventDefault()
        setError(false)
        setPassErr(false)
    if(new_password === confirmPass && Validation()){
    Auth.forgotPasswordSubmit(username, code, new_password)
    .then(data => {if(type.includes('business')){
        setCon(true)
        return (history.push(`/business/login`),
        window.location.reload() )
        }
        else{
            return( history.push(`/curator/login`),
            window.location.reload())  
        }
    }
     )
    .catch(err => setVerificationErr(err.message), setError(true));
}
    else if(new_password!== confirmPass){
        setPassErr(true)
    }
   }
   const Validation = () => {
    if(!code){
        setcodeErr(true)
    }
    if(!new_password){
        setNewPassErr(true)
    }
    if(new_password && confirmPass){
    if(new_password.length<=7 && confirmPass.length<=7){
    setVerificationErr(renderMessage.pass_length)
    setError(true)
}
    }
    if(!confirmPass){
        setConfirmPassErr(true)
    }
    if(code && new_password && confirmPass && new_password.length>7 && confirmPass.length>7){
        return true
    }

}
function validateEmail(user) {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(user).toLowerCase());
}

   const handleChange = e => {
    setError(false)
    setcodeErr(false)
    setNewPassErr(false)
    setConfirmPassErr(false)
    setEmailError(false)
    setPassErr(false)
    setEmError(false)
    setLoader(false)
    setVerificationErr('')
    if (e.target.id === 'username') {
      setUserName(e.target.value.trim())
      
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

 return(
     <Wrapper type ={type} page='forgot' heading={renderMessage.Reset} welcomeMessage={email?renderMessage.Res_Message:renderMessage.Email_Msg}>
         <ForgotPasswordForm 
         type = {type}
         con={con}
         email ={email}
         loader= {loader} 
         submitPassword = {submitPassword}
         codeErr= {codeErr}
         error = {error}
         passErr =  {passErr}
         newPassErr = {newPassErr}
         emailError={emailError}
         emError={emError}
         confirmPassErr= {confirmPassErr}
         verificationErr={verificationErr}
         handleChange={handleChange}
         submitEmail={submitEmail}
         password={new_password}
         
         />
         </Wrapper>

 )
    
 }

export default ForgotPassword