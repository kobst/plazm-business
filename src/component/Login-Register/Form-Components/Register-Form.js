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


const RegisterForm = ({verified,err,firstError, business,loader,setbusiness,setBusinessInfo,setName, message,type,locationError,codeError,firstNameError,phoneError,emailError,passwordError,handleChange,handleSubmit}) => {
return (
    <>
    {err ?<FormGroup><br /><h6>{message}</h6></FormGroup>: null}
{ verified ? ( <form onSubmit={ (e)=> handleSubmit(e) }>
<Row>
        <div className="col-md-12">
        <p> Enter the Confirmation code sent to your Registered Email</p>
            <FormGroup>
                <Label name="Confirmation Code" />
                <Input id='confirmationCode' type='text' onChange={ (e) => handleChange(e)} placeholder=""/>
            </FormGroup>
            <Button type="submit" className="btn btn-primary">{loader && !codeError? <ValueLoader /> : 'Confirm Sign up'}</Button>
            {codeError ?<div className="form-group"><br /><h6>Confirmation code does not match</h6></div>: null}
         </div>
</Row>
</form> ) :
<form onSubmit={ (e)=> handleSubmit(e) }>

            <FormGroup>
            <Label name="Business Name" />
                <Input type="text" id="username" onChange={ (e) => handleChange(e) }
                 error = {firstNameError} placeholder=""/>
                 {firstError ?<h6>Username length should be greater then 3.</h6>: null}
                               
            </FormGroup>									

            {/* <FormGroup>
            <Label name="Last Name" />
                <Input id="last_name" onChange={ (e) => handleChange(e)} type="text" placeholder=""/>
            </FormGroup>									 */}

           <FormGroup>
           <Label name="Phone Number" />
                <Input id='phone_number' onChange={ (e) => handleChange(e) } 
                error={phoneError} placeholder=""/>
            </FormGroup>									

	
            <FormGroup>
            <Label name="Email address" />
                <Input type="text" id='email' onChange={ (e) => handleChange(e) } 
                error={emailError} placeholder=""/>
        
            </FormGroup>									

            <FormGroup>
            <Label name="Password" />
                <Input type="password" id="password" onChange={ (e) => handleChange(e) } 
                error={passwordError} placeholder=""/>
            </FormGroup>									
        



    <FindYourBusinessWrapper>
        {type.includes('business') ?
        <>
        <h2 onClick= {()=> setbusiness(true)}> Find Your Business</h2>
        {/* <FormGroup>
        <SearchLocationInput id="location" error={locationError} handleChange={handleChange} setBusinessInfo={setBusinessInfo} setName={setName} /> 
            </FormGroup> */}
            </>
         : null}
        <p>By clicking register, I represent I have read, understand, and agree to the Postmates Privacy Policy and Terms of Service. This site is protected bt reCAPTCHA and google Privacy Policy and Terms of Service apply.</p>
    </FindYourBusinessWrapper>


    <Button type="submit" maxWidth="183px" className="btnRegister">{loader && !message? <ValueLoader /> : 'Sign In'}</Button>
                          

    
  </form>
 }
 </>
 )
}

export default RegisterForm