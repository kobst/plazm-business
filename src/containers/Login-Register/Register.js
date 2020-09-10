import React, {useState,useEffect} from 'react'
import './style.css'
import { Auth } from 'aws-amplify';
import history from '../../utils/history'
import Wrapper from '../../component/Login-Register/Wrapper'
import RegisterForm from '../../component/Login-Register/Form-Components/Register-Form'
import {getMessage} from '../../config'
import {callApi,addBusiness, updateBusiness} from '../../Api'

const renderMessage= getMessage()

const Register = (props) => {
    const type = props.match.url
    const [username,setUser]= useState()
    const [password,setPassword]= useState()
    const [verified,setVerified]= useState(false)
    const [email,setEmail]= useState()
    const [loc,setLoc]= useState()
    const [confirmationCode,setconfirmationCode]= useState()
    const [phone_number,setPhoneNumber]= useState()
    const [err,setError] = useState(false)
    const [message,setMessage] = useState()
    const [businessInfo,setBusinessInfo] = useState()
    const [name,setName]= useState()
    const [codeError,setCodeError] = useState(false)
    const [firstNameError,setFirstNameError] = useState(false)
    const [firstError,setFirstError] = useState(false)
    const [emailError,setEmailError] = useState(false)
    const [phoneError, setPhoneError] = useState(false)
    const [passwordError,setPasswordError] = useState(false)
    const [locationError,setLocError]= useState(false)
    const [business,setbusiness] = useState(false)
    const [loader,setLoader] = useState(false)
    const [emptyCode,setEmptyCodeError]= useState(false)
    const [phoneShort,setPhoneShort]= useState(false)
    const [phoneLong,setPhoneLong]= useState(false)
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
    

    const signUp = () => {
        Auth.signUp({
            username: email,
            password: password,
            attributes: {
                email: email,
                phone_number: phone_number, 
                name: username,
            }
        })
        .then(async(res) => {
            if(res.userSub){
         if(await checkUser(res.userSub)){
            setVerified(true)
            setError(false)
            setLoader(false)
            }
        }
        })
        .catch((err) => {
            if(err.message.includes('phone'))
            {  
                return(setMessage(renderMessage.phone_Err) , setError(true)) 
            }
            else{
                return(setMessage(err.message) , setError(true))
                
            }
    })
    }
  
    const confirmSignUp =() => {
        Auth.confirmSignUp(email, confirmationCode)
        .then(() => {
            Auth.signIn({
                username: email,
                password: password
            })
            // eslint-disable-next-line no-sequences
            .then(() =>( history.push('/dashboard'),
            window.location.reload() 
            ))
            .catch((err) => console.log(err))
        })
        .catch((err) => setCodeError(true))
    }
 
    function validateEmail(email) {
        // eslint-disable-next-line no-useless-escape
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    const ValidateCode= ()=> {
        if(!confirmationCode){
            setEmptyCodeError(true)
        }
        else{
            return true
        }
    }

    const Validation = () => {
        if(!username){
            setFirstNameError(true)
        }
        if(username){
            if(username.length<=3){
            setFirstError(true)
            }
        }
        if(!loc){
            setLocError(true)
        }
        if(loc){
        if(!name){
            setError(true)
            setMessage(renderMessage.Err)

        } else if(!businessInfo){
            setError(true)
            setMessage(renderMessage.Err)

        }
    }
        if(!phone_number){
            setPhoneError(true)
        }
        if(phone_number){
            if(phone_number.length<=5){
              setPhoneShort(true)
            }
            else if(phone_number.length>=50){
                setPhoneLong(true)
            }
        }
        if(!validateEmail(email)){
            setEmailError(true)
        }
        if(!password){
            setPasswordError(true)
        }
        if(password){
        if(password.length<=7){
            setError(true)
            setMessage(renderMessage.pass_length)
    }
}
        if(username && loc && username.length>3 && phone_number && validateEmail(email) && password && name && password.length>7 && phone_number.length>=5 &&
        phone_number.length<=50 ){
            return true
        }

    }
  
   const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage()
        if (verified && ValidateCode()) {
            setMessage()
            confirmSignUp();
            setLoader(true)
          }
        if(!verified && Validation()){
            setLoader(true)
            if(await checkBusiness()){
           setMessage()
           setError(false)
           signUp()
            }
            else{
                setError(true)
                setMessage(renderMessage.Busi_Err)

            }
        
    }
}

    const checkBusiness = async() => {
        
        const val = await callApi(name)
        if(val.length!==0 && val[0].userSub){
           return false

        }
        else{
            return true
        }
        
}
  const checkUser = async(userSub) => {
     const val = await callApi(name)
     if(val.length === 0){
     await addBusiness(userSub,businessInfo)
     return true
  }
  else if(val.length!==0 && !val[0].userSub){
     await updateBusiness(val[0],userSub)
     return true
}
 }
    const handleChange = (e) => {
        setFirstNameError(false)
        setFirstError(false)
        setPhoneError(false)
        setEmailError(false)
        setPasswordError(false)
        setError(false)
        setCodeError(false)
        setLocError(false)
        setLoader(false)
        setEmptyCodeError(false)
        setPhoneLong(false)
        setPhoneShort(false)
        if (e.target.id === 'username') {
            setUser(e.target.value)
        }
         else if (e.target.id === 'password') {
          setPassword(e.target.value)
        } else if (e.target.id === 'phone_number') {
          setPhoneNumber(e.target.value)
        } else if (e.target.id === 'email') {
          setEmail(e.target.value.trim())
        } else if (e.target.id === 'confirmationCode') {
          setconfirmationCode(e.target.value)
        }
        else if (e.target.id === 'location') {
            setName('')
            setBusinessInfo('')
            setLoc(e.target.value)
          }
    }

    return(
        <Wrapper type ={type} page='register' welcomeMessage={renderMessage.New_Reg}>
            <RegisterForm
                  type ={type}
                  err={err}
                  firstError={firstError}
                  passwordError={passwordError}
                  loader={loader}
                  message={message}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  verified={verified}
                  business={business}
                  setbusiness={setbusiness}
                  setBusinessInfo={setBusinessInfo}
                  setName={setName}
                  codeError={codeError}
                  firstNameError={firstNameError}
                  phoneError={phoneError}
                  emailError={emailError}
                  locationError={locationError}
                  emptyCode={emptyCode}
                  phoneLong={phoneLong}
                  phoneShort={phoneShort}
                  password={password}
                  />
        </Wrapper>
   
    )


}

export default Register