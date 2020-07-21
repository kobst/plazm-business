import React from 'react'
import styled from 'styled-components'
import Links from '../../UI/Link/Link'
import {Link} from 'react-router-dom'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'
import ValueLoader from '../../../utils/loader'
import {getMessage} from '../../../config'

const FormGroup = styled.div `
margin-bottom:35px;
h6{
    color: red;
  }
  h5{
    color: green;
  }

  @media(max-width:899px){
    margin-bottom: 25px;

`


const renderMessage = getMessage()
const ForgotPasswordForm = ({type,email,con,loader,emError, submitPassword,codeErr,error,passErr,newPassErr,emailError, confirmPassErr,verificationErr,handleChange,submitEmail}) => {
  
    return (
      <>
      {email ?
        <form onSubmit = {e => submitPassword(e)}>
                <FormGroup>
                    <Input type="text" id="code" error={codeErr} onChange={e => handleChange(e)} placeholder="Confirmation Code"/>
                </FormGroup>
                <FormGroup>
                    <Input type="password" id="password" error={newPassErr} onChange={e => handleChange(e)} placeholder="New Password"/>
                </FormGroup>
                <FormGroup>
                    <Input type="password" id="conPassword" error={confirmPassErr} onChange={e => handleChange(e)} placeholder="Confirm Password"/>
                </FormGroup>
                 <Button type="submit" className="btn btn-primary">{renderMessage.Submit}</Button>
                {error ?<FormGroup><br /><h6> {verificationErr}</h6></FormGroup>: null}
                {passErr ?<FormGroup><br /><h6> {renderMessage.Pass_Err} </h6></FormGroup>: null}
                {con ?<FormGroup><br /><h5> {renderMessage.con} </h5></FormGroup>: null}
                <Links>
                { type.includes('business') ?
                <Link to ='/business/login' className="link-btn">{renderMessage.Log_Link} </Link> :
                <Link to ='/curator/login' className="link-btn">{renderMessage.Log_Link}</Link>
                }
                </Links>


        </form>
   :

        <form onSubmit = {e => submitEmail(e)}>
                <FormGroup>
                    <Input type="text" id="username" onChange={e => handleChange(e)} error={emError} placeholder="Email address"/>
                </FormGroup>
                <Button type="submit" className="btn btn-primary">{loader && !emailError ? <ValueLoader />: 'Reset'}</Button>

                {emailError ?<FormGroup><br /><h6>{renderMessage.Email_Err}</h6></FormGroup>: null}
                <Links>
                { type.includes('business') ?
                <Link to ='/business/login' className="link-btn">{renderMessage.Log_Link}</Link> :
                <Link to ='/curator/login' className="link-btn">{renderMessage.Log_Link}</Link>
                }
                </Links>


         </form>
}      
         </>
         
               
        )
                }

export default ForgotPasswordForm

