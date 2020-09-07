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
position:relative;
`
const ForgotPassword = styled.div`
margin-top: 10px;
text-align:right;
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
// const SuccessMessage = styled.div`
// font-style: normal;
// font-weight: normal;
// font-size: 14px;
// line-height: 18px;
// text-align: right;
// color: #1483Ab;
// position: absolute;
// right: 0;
// bottom: -25px;
// `  
const renderMessage =getMessage()
const LoginForm = ({type,userError,error,passwordError,loader,message,handleChange,handleSubmit}) => {
return(
  <>
      <form onSubmit={ (e) => handleSubmit(e) }>
							  <FormGroup>
                  <Label name="Enter your login ID" />
                      <Input type="text" id='username' onChange={(e) => handleChange(e)} 
                        error={userError}  placeholder="Email address"/>
                        {error && message ==='User does not exist.' ?<ErrorMessage>{message}</ErrorMessage>: null}
							  </FormGroup>
                <FormGroup>
                    <Label name="Password" />
                        <Input type="password" id='password' onChange={(e) => handleChange(e)}
                          error={passwordError} placeholder="Password" />
                          {error && message !=='User does not exist.' ?<ErrorMessage>{message}</ErrorMessage>: null}
							  </FormGroup>	
                <Button type="submit" className="btn btn-primary">{loader && !message? <ValueLoader /> : renderMessage.Log}</Button>
    
                <ForgotPassword>
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