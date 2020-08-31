import React, {useEffect} from 'react'
import styled from 'styled-components'
import RightSide from '../../component/RightSide/RightSide'
import { Auth } from 'aws-amplify';
import history from '../../utils/history'
import Header from '../../component/Header'
import Footer from '../../component/Footer'
const DashboardContainer = styled.div`
display:flex;
background: linear-gradient(157.1deg, #FF7171 -1.1%, #FF479D 100%);
@media (max-width:767px){
    flex-direction: column;  
}
`
const Container = styled.div`
max-width:1440px;
width:100%;
padding:0 30px;
margin:35px auto 0;
@media{
  padding:0 15px;
   margin:15px auto 0;
}
`


const Dashboard = () => {
    useEffect(() => {
        let updateUser = async authState => {
          try {
             await Auth.currentAuthenticatedUser()
        } catch {
            history.push('/business/login')
            window.location.reload() 
          }
        }
        updateUser()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
    return(
       <DashboardContainer>
         <Container>
          <Header />
          <RightSide/>
          <Footer />
       </Container>
       </DashboardContainer>

    )
}

export default Dashboard