import React from 'react'
import styled from 'styled-components'
import Links from '../../UI/Link/Link'
import {Link} from 'react-router-dom'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'
import ValueLoader from '../../../utils/loader'
import {getMessage} from '../../../config'


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
const ForgotPasswordForm = ({type,email,con,loader,emError, submitPassword,codeErr,error,passErr,newPassErr,emailError, confirmPassErr,verificationErr,handleChange,submitEmail}) => {
  
    return (
      <>
      {email ?
        <form onSubmit = {e => submitPassword(e)}>
                <FormGroup>
                    <Input type="text" id="code" error={codeErr} onChange={e => handleChange(e)} placeholder="Confirmation Code"/>
                    {error ?<ErrorMessage> {verificationErr}</ErrorMessage>: null}
                     </FormGroup>
                <FormGroup>
                    <Input type="password" id="password" error={newPassErr} onChange={e => handleChange(e)} placeholder="New Password"/>
                </FormGroup>
                <FormGroup>
                    <Input type="password" id="conPassword" error={confirmPassErr} onChange={e => handleChange(e)} placeholder="Confirm Password"/>
                    {passErr ?<ErrorMessage> {renderMessage.Pass_Err}/</ErrorMessage>: null}
                    {con ?<SuccessMessage> {renderMessage.con} </SuccessMessage>: null}
                </FormGroup>
                 <Button type="submit" className="btn btn-primary">{renderMessage.Submit}</Button>


        </form>
   :

        <form onSubmit = {e => submitEmail(e)}>
                <FormGroup>
<<<<<<< HEAD
                    <Input type="text" id="username" onChange={e => handleChange(e)} error={emError} placeholder="Email address"/>
                    {emailError ?<ErrorMessage>{renderMessage.Email_Err}</ErrorMessage>: null}
=======
                    <Input type="text" id="username" onChange={e => handleChange(e)} error={emError} placeholder="Email Address"/>
>>>>>>> 2cf5563c6956513a02c10a8d0ef92d165115d25d
                </FormGroup>
                <Button type="submit" className="btn btn-primary">{loader && !emailError ? <ValueLoader />: 'Reset'}</Button>

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

