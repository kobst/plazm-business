import React from 'react'
import Sidebar from '../../component/UI/Sidebar/Sidebar'
import styled from 'styled-components'
import RightSide from '../../component/RightSide/RightSide'
const DashboardContainer = styled.div`
display:flex;
@media (max-width:767px){
    flex-direction: column;  
}
`


const Dashboard = () => {
    
    return(
       <DashboardContainer>
       <Sidebar />
       <RightSide></RightSide>
       </DashboardContainer>

    )
}

export default Dashboard