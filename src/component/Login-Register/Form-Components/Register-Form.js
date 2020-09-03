import React from 'react'
import styled from 'styled-components'
import Links from '../../UI/Link/Link'
import {Link} from 'react-router-dom'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'
import SearchLocationInput  from '../../../utils/findYourBusiness'
import ValueLoader from '../../../utils/loader'
import Label from '../../UI/Label/label'

const FormGroup = styled.div `
margin-bottom:22px;
position:relative;
h6{
    color: red;
  }

  @media(max-width:899px){
    margin-bottom: 25px;
  }


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
@media (max-width:767px){
    display: block;
    > div{
        display: block;
        width:100%;
    }
}
`
const FindYourBusinessWrapper = styled.div`
h2{
    font-weight: 700; 
    font-size: 16px;
    line-height: 19px;
    color: #280A33;
}
p{
    font-size: 11px;
    line-height: 10px;
    margin:20px 0 30px;
    color:#000;
}


` 
const ErrorMessage = styled.div`
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 18px;
text-align: right;
color: #FF7171;
position: relative;
right: 0;
margin-top: 6px;
`


const RegisterForm = ({verified,err,firstError, business,loader,setbusiness,setBusinessInfo,setName, message,type,locationError,codeError,firstNameError,phoneError,emailError,passwordError,handleChange,handleSubmit}) => {
return (
    <>
{ verified ? ( <form onSubmit={ (e)=> handleSubmit(e) }>
<Row>
        <div className="col-md-12">
        <p> Enter the Confirmation code sent to your Registered Email</p>
            <FormGroup>
                <Label name="Confirmation Code" />
                <Input id='confirmationCode' type='text' onChange={ (e) => handleChange(e)} placeholder=""/>
                {codeError ?<ErrorMessage>Confirmation code does not match</ErrorMessage>: null}
            </FormGroup>
            <Button type="submit" className="btn btn-primary">{loader && !codeError? <ValueLoader /> : 'Confirm Sign up'}</Button>
    
         </div>
</Row>
</form> ) :
<form onSubmit={ (e)=> handleSubmit(e) }>

            <FormGroup>
            <Label name="Business Name" />
                <Input type="text" id="username" onChange={ (e) => handleChange(e) }
<<<<<<< HEAD
                 error = {firstNameError} placeholder=""/>
                 {firstError ?<ErrorMessage>Username length should be greater then 3.</ErrorMessage>: null}
=======
                 error = {firstNameError} placeholder="First Name"/>
                 {firstError ?<h6>Username length should be greater than 3.</h6>: null}
>>>>>>> 2cf5563c6956513a02c10a8d0ef92d165115d25d
                               
            </FormGroup>									

           <FormGroup>
           <Label name="Phone Number" />
                <Input id='phone_number' onChange={ (e) => handleChange(e) } 
                error={phoneError} placeholder=""/>
                {err && message&& message.includes("number") ?<ErrorMessage>{message}</ErrorMessage>: null}
            </FormGroup>									

	
            <FormGroup>
            <Label name="Email address" />
                <Input type="text" id='email' onChange={ (e) => handleChange(e) } 
<<<<<<< HEAD
                error={emailError} placeholder=""/>
              {err&&message&& message.includes("email") ?<ErrorMessage>{message}</ErrorMessage>: null}
=======
                error={emailError} placeholder="Email Address"/>
        
>>>>>>> 2cf5563c6956513a02c10a8d0ef92d165115d25d
            </FormGroup>									

            <FormGroup>
            <Label name="Password" />
                <Input type="password" id="password" onChange={ (e) => handleChange(e) } 
                error={passwordError} placeholder=""/>
                {err&&message&& message.includes("Password") ?<ErrorMessage>{message}</ErrorMessage>: null}
            </FormGroup>									
        



    <FindYourBusinessWrapper>
        {type.includes('business') ?
        <>
        <h2 onClick= {()=> setbusiness(true)}> Find Your Business</h2>
         <FormGroup>
        <SearchLocationInput id="location" error={locationError} handleChange={handleChange} setBusinessInfo={setBusinessInfo} setName={setName} /> 
            </FormGroup> 
            </>
         : null}
         {err &&message&& message.includes("business")?<ErrorMessage>{message}</ErrorMessage>: null}
        <p>By clicking register, I represent I have read, understand, and agree to the Postmates Privacy Policy and Terms of Service. This site is protected bt reCAPTCHA and google Privacy Policy and Terms of Service apply.</p>
    </FindYourBusinessWrapper>


    <Button type="submit" maxWidth="183px" className="btnRegister">{loader && !message? <ValueLoader /> : 'Sign Up'}</Button>
                          

    
  </form>
 }
 </>
 )
}

export default RegisterForm