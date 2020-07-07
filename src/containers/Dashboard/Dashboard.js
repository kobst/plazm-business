import React, {useEffect} from 'react'
import Sidebar from '../../component/UI/Sidebar/Sidebar'
import styled from 'styled-components'
import RightSide from '../../component/RightSide/RightSide'
import { Auth } from 'aws-amplify';
import history from '../../utils/history'
const DashboardContainer = styled.div`
display:flex;
@media (max-width:767px){
    flex-direction: column;  
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
       <Sidebar />
       <RightSide></RightSide>
       </DashboardContainer>

    )
}

export default Dashboard