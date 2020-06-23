import React from 'react'
import styled from 'styled-components'
import Links from '../../UI/Link/Link'
import {Link} from 'react-router-dom'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'
import SearchLocationInput  from '../../../utils/findYourBusiness'
import ValueLoader from '../../../utils/loader'

const FormGroup = styled.div `
margin-bottom:35px;
h6{
    color: red;
  }

  @media(max-width:899px){
    margin-bottom: 25px;

`
const Row = styled.div`
height: 100%;
display: table-row;
display: flex;
justify-content: space-between;

> div{
    display: table-cell; 
    width: 48%;
}
`
const FindYourBusinessWrapper = styled.div`
h2{
    font-size:20px; 
    font-weight: 800; 
    margin: 0;
    cursor: pointer;
}
p{
    font-size: 10px; 
    color:#808080; 
    margin: 10px 0 30px 0;
}
` 


const RegisterForm = ({verified,err,firstError, business,loader,setbusiness,message,type,codeError,firstNameError,phoneError,emailError,passwordError,handleChange,handleSubmit}) => {
return (
    <>
    {err ?<FormGroup><br /><h6>{message}</h6></FormGroup>: null}
{ verified ? ( <form onSubmit={ (e)=> handleSubmit(e) }>
<Row>
        <div className="col-md-12">
        <p> Enter the Confirmation code sent to your Registered Email</p>
            <FormGroup>
              <Input id='confirmationCode' type='text' onChange={ (e) => handleChange(e)} placeholder="Confirmation Code"/>
            </FormGroup>
            <Button type="submit" className="btn btn-primary">Confirm Sign up</Button>
            {codeError ?<div className="form-group"><br /><h6>Confirmation code does not match</h6></div>: null}
         </div>
</Row>
</form> ) :
<form onSubmit={ (e)=> handleSubmit(e) }>
    <Row>
            <FormGroup>
                <Input type="text" id="username" onChange={ (e) => handleChange(e) }
                 error = {firstNameError} placeholder="First Name"/>
                 {firstError ?<h6>Username length should be greater then 3.</h6>: null}
                               
            </FormGroup>									

            <FormGroup>
                <Input id="last_name" onChange={ (e) => handleChange(e)} type="text" placeholder="Last Name"/>
            </FormGroup>									
							
    </Row>
           <FormGroup>
                <Input id='phone_number' onChange={ (e) => handleChange(e) } 
                error={phoneError} placeholder="Phone Number"/>
            </FormGroup>									

	
            <FormGroup>
                <Input type="text" id='email' onChange={ (e) => handleChange(e) } 
                error={emailError} placeholder="Email address"/>
        
            </FormGroup>									

            <FormGroup>
                <Input type="password" id="password" onChange={ (e) => handleChange(e) } 
                error={passwordError} placeholder="Password"/>
            </FormGroup>									
        



    <FindYourBusinessWrapper>
        <h2 onClick= {()=> setbusiness(true)}> Find Your Business</h2>
        <br />
        <FormGroup>
        {business ? <SearchLocationInput onChange={() => null} />: null }
            </FormGroup>
        <p>By clicking register, I represent I have read, understand, and agree to the Postmates Privacy Policy and Terms of Service. This site is protected bt reCAPTCHA and google Privacy Policy and Terms of Service apply.</p>
    </FindYourBusinessWrapper>


    <Button type="submit" className="btn btn-primary">{loader && !message? <ValueLoader /> : 'Register'}</Button>
    <Links>
    { type.includes('business') ?
     <Link to ='/business/login' className="link-btn">Already have an account? <strong>Log In</strong></Link> :
     <Link to ='/curator/login' className="link-btn">Already have an account? <strong>Log In</strong></Link>
   }
    </Links>
                          

    
  </form>
 }
 </>
 )
}

export default RegisterForm