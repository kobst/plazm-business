import React, {useState} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import EventImg from '../../../../../images/eventimg.png'
import LockImage from '../../../../../images/lock.png'


const ItemsWrapper = styled.div`
  position: relative;
  margin: 0 6px;
  padding: 0;
  text-align: center;
  min-height: 100%;
  width: 250px;
`
const CoverImg = styled.div`
  margin: 0px;
  height: 200px;
  display: flex;
  align-items: flex-start;
  /* overflow: hidden; */
  width: 100%;
  padding: 0;
  justify-content: center;
  width: 250px;
  &:hover {
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
`

const ItemsDescription = styled.div`
  padding: 15px;
  position: absolute;
  bottom: 0;
  background: linear-gradient(360deg, #000000 0%, rgba(7, 3, 46, 0) 91.23%);
  :hover {
    .test2 {
      visibility: visible;
    }
  }
`

const CollectionPara = styled.p`
  padding: 0;
  margin: 0;
  font-weight: 500;
  font-size: 12px;
  line-height: normal;
  text-align: left;
  color: #fff;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  cursor: pointer;
`

const Lock = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`

const DisplayItemContent = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  height: 500px;
  background: #fff;
  width: 300px;
  &.test2 {
      visibility: hidden;
    }
`



const NewInBuzzItems = ({  }) => {

  const [displayModal,setdisplayModal] = useState (false)

  return (
    <>
      <ItemsWrapper>
        <CoverImg>
          <img src={EventImg} alt="Image" />
          <Lock>
            <img src={LockImage} alt="Image" />
          </Lock>
          {/* <ItemsDescription onMouseOver={() => setdisplayModal(true)} onMouseLeave={() => setdisplayModal(false)}> */}
          <ItemsDescription>
            <CollectionPara>The 38 Essential Restaurants in New York City he 38 Essential Restaurants in New York City The 38 Essential Restaurants in New York City he 38 Essential Restaurants in New York CityThe 38 Essential Restaurants in New York City he 38 Essential Restaurants in New York City</CollectionPara>
            
              <DisplayItemContent className="test2">test</DisplayItemContent>
          
            {/* {displayModal && 
              <DisplayItemContent className="test2">test</DisplayItemContent>
            } */}
          </ItemsDescription>
        </CoverImg>
        {/* <DisplayItemContent>test</DisplayItemContent> */}
        


      </ItemsWrapper>
    </>
  )
}

NewInBuzzItems.propTypes = {
  article: PropTypes.object,
}

export default NewInBuzzItems
