import React from 'react'
import styled from 'styled-components'
import Links from '../../UI/Link/Link'
import {Link} from 'react-router-dom'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'
import ValueLoader from '../../../utils/loader'
import {getMessage} from '../../../config'
import Label from '../../UI/Label/label'

const FormGroup = styled.div `
margin-bottom:22px;
`
const ForgotPassword = styled.div`
margin-top: 10px;
a{
font-family: 'IBM Plex Sans', sans-serif;
font-size: 16px;
line-height:21px;
text-decoration:none;
color:#156064;
:hover{
  color: #156064; text-decoration:underline;
  }
}

`
const renderMessage =getMessage()
const LoginForm = ({type,userError,error,passwordError,loader,message,handleChange,handleSubmit}) => {
return(
  <>
  {error ?<FormGroup><br /><h6>{message}</h6></FormGroup>: null}
      <form onSubmit={ (e) => handleSubmit(e) }>
							  <FormGroup>
                  <Label name="Enter Your Login ID" />
                      <Input type="text" id='username' onChange={(e) => handleChange(e)} 
                        error={userError}  placeholder="Email address"/>
							  </FormGroup>
                <FormGroup>
                    <Label name="Password" />
                        <Input type="password" id='password' onChange={(e) => handleChange(e)}
                          error={passwordError} placeholder="Password" />
							  </FormGroup>	
                <Button type="submit" className="btn btn-primary">{loader && !message? <ValueLoader /> : renderMessage.Log}</Button>
    
                <ForgotPassword>
                        { type.includes('business') ?
                         <Link to ='/business/register' >{renderMessage.No_Account}<strong>Signup</strong></Link> :
                         <Link to ='/curator/register' >{renderMessage.No_Account}<strong>Signup</strong></Link>
                          }
                        { type.includes('business') ?
                         <Link to ='/business/forgot-password' >{renderMessage.Forgot}</Link> :
                         <Link to ='/curator/forgot-password' >{renderMessage.Forgot}</Link>
                          }
							   </ForgotPassword> 
							
				</form>
        </>
     )
}

  export default LoginForm