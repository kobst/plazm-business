import React, { useState, useEffect } from 'react'
import './style.css'
import { Auth } from 'aws-amplify';
import history from '../../utils/history'
import Wrapper from '../../component/Login-Register/Wrapper'
import ForgotPasswordForm from '../../component/Login-Register/Form-Components/Forgot-Password-Form'
import {getMessage} from '../../config'

const renderMessage= getMessage()

const ForgotPassword = (props) => {
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
    const [loader,setLoader] = useState(false)
    
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
    Auth.forgotPassword(username)
    .then(data => setEmail(true) )
    .catch(err => setEmailError(true));
        e.target.reset()
    }
   
    const submitPassword = e => {
        e.preventDefault()
        setError(false)
        setPassErr(false)
    if(new_password === confirmPass && Validation()){
    Auth.forgotPasswordSubmit(username, code, new_password)
    .then(data => {if(type.includes('business')){
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
    if(!confirmPass){
        setConfirmPassErr(true)
    }
    else{
        return true
    }

}

   const handleChange = e => {
    setError(false)
    setcodeErr(false)
    setNewPassErr(false)
    setConfirmPassErr(false)
    setPassErr(false)
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
     <Wrapper heading={renderMessage.Reset} welcomeMessage={email?renderMessage.Res_Message:renderMessage.Email_Msg}>
         <ForgotPasswordForm 
         type = {type}
         email ={email}
         loader= {loader} 
         submitPassword = {submitPassword}
         codeErr= {codeErr}
         error = {error}
         passErr =  {passErr}
         newPassErr = {newPassErr}
         emailError={emailError}
         confirmPassErr= {confirmPassErr}
         verificationErr={verificationErr}
         handleChange={handleChange}
         submitEmail={submitEmail}
         
         />
         </Wrapper>

 )
    
 }

export default ForgotPassword