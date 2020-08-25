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
  label{
    margin: 0 0 0 10px; font-size: 14px;
  }
  display: -webkit-box; 
  display: -moz-box; 
  display: -ms-flexbox; 
  display: -webkit-flex; 
  display: flex; 
  -webkit-box-align: center; 
  -moz-box-align: center; 
  -ms-flex-align: center; 
  -webkit-align-items: center; 
  align-items: center;

  @media(max-width:899px){
    margin-bottom: 25px;

`
const renderMessage =getMessage()
const LoginForm = ({type,userError,error,passwordError,loader,message,handleChange,handleSubmit}) => {
return(
  <>
  {error ?<FormGroup><br /><h6>{message}</h6></FormGroup>: null}
      <form onSubmit={ (e) => handleSubmit(e) }>
							  <FormGroup>
                      <Input type="text" id='username' onChange={(e) => handleChange(e)} 
                        error={userError}  placeholder="Email Address"/>
							  </FormGroup>
                <FormGroup>

                        <Input type="password" id='password' onChange={(e) => handleChange(e)}
                          error={passwordError} placeholder="Password" />
							  </FormGroup>	
                <Button type="submit" className="btn btn-primary">{loader && !message? <ValueLoader /> : renderMessage.Log}</Button>
    
                <Links>
                        { type.includes('business') ?
                         <Link to ='/business/register' >{renderMessage.No_Account}<strong>Signup</strong></Link> :
                         <Link to ='/curator/register' >{renderMessage.No_Account}<strong>Signup</strong></Link>
                          }
                        { type.includes('business') ?
                         <Link to ='/business/forgot-password' >{renderMessage.Forgot}</Link> :
                         <Link to ='/curator/forgot-password' >{renderMessage.Forgot}</Link>
                          }
							   </Links> 
							
				</form>
        </>
     )
}

  export default LoginForm