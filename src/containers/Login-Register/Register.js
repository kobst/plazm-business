import React, {useState} from 'react'
import './style.css'
import { Auth } from 'aws-amplify';
import history from '../../utils/history'
import Wrapper from '../../component/Login-Register/Wrapper'
import RegisterForm from '../../component/Login-Register/Form-Components/Register-Form'
import {getMessage} from '../../config'


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
        
            if(await checkBusiness(res.userSub)){
            setVerified(true)
            setError(false)
            }
            else{
                setError(true)
                setMessage(renderMessage.Busi_Err) 

            }
        })
        .catch((err) => setMessage(err.message) , setError(true) )
    }
  
    const confirmSignUp = () => {
        Auth.confirmSignUp(email, confirmationCode)
        .then(() => {
            if(type.includes('business')){
            return (history.push(`/business/login`),
            window.location.reload() )
            }
            else{
                return( history.push(`/curator/login`),
                window.location.reload())  
            }
        })
        .catch((err) => setCodeError(true))
    }
 
    function validateEmail(email) {
        // eslint-disable-next-line no-useless-escape
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const Validation = () => {
        if(!username){
            setFirstNameError(true)
        }
        if(username){
            if(username.length<3){
            setFirstError(true)
            }
        }
        if(!loc){
            setLocError(true)
        }
        if(!phone_number){
            setPhoneError(true)
        }
        if(!validateEmail(email)){
            setEmailError(true)
        }
        if(!password){
            setPasswordError(true)
        }
        else if(username && loc && phone_number && validateEmail(email) && password ){
            return true
        }

    }
  
   const handleSubmit = (e) => {
        e.preventDefault();
        setMessage()
        if (verified) {
            setMessage()
            confirmSignUp();
          }
        if(!verified && Validation()){
           setMessage()
           setError(false)
           signUp()
           setLoader(true)
        
    }
}
    const callApi = async() => {
        const response= await fetch(`${process.env.REACT_APP_API_URL}/api/place/${name}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const body = await response.text();
      return JSON.parse(body)
    }

    const addBusiness = async (userSub) => {
        const response= await fetch(`${process.env.REACT_APP_API_URL}/api/place`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                
                    status: businessInfo.business_status,
                    userAddress: businessInfo.formatted_address,
                    telephone: businessInfo.international_phone_number,
                    companyName:businessInfo.name,
                    placeId: businessInfo.place_id,
                    mapLink:businessInfo.url,
                    rating: businessInfo.rating,
                    website: businessInfo.website,
                    userSub: userSub,
                    latitude: businessInfo.geometry.location.lat(),
                    longitude: businessInfo.geometry.location.lng(),
                
          })
        });
          const body = await response.text();
          return body

    }
    const updateBusiness = async (id,userSub) => {
        const response= await fetch(`${process.env.REACT_APP_API_URL}/api/place`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({  
                _id:id,
                userSub: userSub,
                    
                
          })
        });
          const body = await response.text();
          console.log(body)
          return body

    }

    const checkBusiness = async(userSub) => {
        const val = await callApi()
        if(val.length!==0 && val[0].userSub){
           return false

        }
        else if(val.length === 0){
            await addBusiness(userSub)
            return true
        }
        else if(val.length!==0 && !val[0].userSub){
            await updateBusiness(val[0]._id,userSub)
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
        if (e.target.id === 'username') {
            setUser(e.target.value)
        }
         else if (e.target.id === 'password') {
          setPassword(e.target.value)
        } else if (e.target.id === 'phone_number') {
          setPhoneNumber(e.target.value)
        } else if (e.target.id === 'email') {
          setEmail(e.target.value)
        } else if (e.target.id === 'confirmationCode') {
          setconfirmationCode(e.target.value)
        }
        else if (e.target.id === 'location') {
            setLoc(e.target.value)
          }
    }

    return(
        <Wrapper heading={renderMessage.Reg} welcomeMessage={renderMessage.New_Reg}>
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
                  />
        </Wrapper>
   
    )


}

export default Register