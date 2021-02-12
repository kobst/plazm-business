import React from 'react'
import styled from 'styled-components'
import Links from '../../UI/Link/Link'
import {Link} from 'react-router-dom'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'
import ValueLoader from '../../../utils/loader'
import {getMessage} from '../../../config'
import Label from '../../UI/Label/label'
import PasswordStrengthMeter from '../../PasswordStrenthMeter/PasswordStrengthMeter'

const FormGroup = styled.div `
margin-bottom:22px;
position:relative;
h6{
    color: red;
  }
  h5{
    color: green;
  }


`
const ErrorMessage = styled.div`
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 18px;
text-align: right;
color: #FF7171;
position: absolute;
right: 0;
bottom: -25px;
`
const SuccessMessage = styled.div`
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 18px;
text-align: right;
color: #1483Ab;
position: absolute;
right: 0;
bottom: -25px;
` 


const renderMessage = getMessage()
const ForgotPasswordForm = ({type,ResponseValue,email,password,con,loader,emError, submitPassword,codeErr,error,passErr,newPassErr,emailError, confirmPassErr,verificationErr,handleChange,submitEmail}) => {
  
    return (
      <>
      {ResponseValue===2 ?
        <form onSubmit = {e => submitPassword(e)}>
                <FormGroup>
                    <Label name="New Password" />
                    <Input type="password" id="password" error={newPassErr} onChange={e => handleChange(e)} />
                    <PasswordStrengthMeter password={password} />
                </FormGroup>
                <FormGroup>
                    <Label name="Confirm Password" />
                    <Input type="password" id="conPassword" error={confirmPassErr} onChange={e => handleChange(e)} />
                    {passErr ?<ErrorMessage> {renderMessage.Pass_Err}</ErrorMessage>: null}
                    {con ?<SuccessMessage> {renderMessage.con} </SuccessMessage>: null}
                </FormGroup>
                 <Button type="submit" className="btn btn-primary">{renderMessage.Reset}</Button>


        </form>
   :

        <form onSubmit = {e => submitEmail(e)}>
          { email?
          <>
        <p className="code"> We have send you a Reset Password link on your registered email, 
                        Please click on the reset link to reset your password. </p>
           </> :
                 <>
                <FormGroup>
                    <Label name="Email address" />
                    <Input type="text" id="username" onChange={e => handleChange(e)} error={emError} />
                    {emailError ?<ErrorMessage>{renderMessage.Email_Err}</ErrorMessage>: null}
                </FormGroup>
                <Button type="submit" className="btn btn-primary">{loader && !emailError ? <ValueLoader />: 'Reset'}</Button>

                <Links>
                { type.includes('business') ?
                <Link to ='/business/login' className="link-btn">{renderMessage.Log_Link}</Link> :
                <Link to ='/consumer/login' className="link-btn">{renderMessage.Log_Link}</Link>
                }
                </Links>
                 </>   }


         </form>
}      
         </>
         
               
        )
                }

export default ForgotPasswordForm

