import React, { useState } from 'react';
import styled from 'styled-components';
import LikeIcon from '../../../images/wishlist-icon.svg';
import CommentIcon from '../../../images/comment.svg';
import EditModalBox from '../../Edit-Post';
import DeleteModalBox from '../../Delete-Post';

const ListContainer = styled.div`
  display: flex;
  font-family: 'Roboto', sans-serif;
  border-bottom: 1px solid #ddd;
  padding: 15px 0;
`;
const ImgSec = styled.div`
  width: 24px;
  height: 24px;
  background: #c4c4c4;
  border-radius: 100%;
`;
const TextSec = styled.div`
  width: calc(100% - 42px);
  margin-left: 15px;
  h4 {
    font-size: 16px;
    font-weight: 500px;
  }
  span {
    font-size: 12px;
    margin-left: auto;
    margin-bottom: 10px;
  }
  p {
    font-size: 14px;
    margin-bottom: 0px;
    margin-top: 5px;
  }
  button {
    background: #000;
    color: white;
    font-weight: 500;
    font-family: 'Roboto', sans-serif;
    border-radius: 5px;
    align-items: center;
    padding: 0 10px;
    border: none;
    margin-right: 4px;
  }
`;
const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Icon = styled.div`
  text-align: right;
  img {
    margin-left: 30px;
    cursor: pointer;
  }
`;

// const Listing = ({mentions,value,data,users}) => {
//     const [isOpen,setIsOpen]= useState(false)
//     const [deleteOpen,setDeleteOpen]= useState(false)
//     const [content,setContent]= useState()
//     const [id,setId]= useState()
//     const handleEdit= (v)=> {
//         setIsOpen(true)
//         setContent(v)
//    }
// //    const changeColor = (str)=> {
// //     for (let i = 0; i < str.length; i++) {
// //        if(str.charAt(i)==='@'){
// //         for (let j= i){
// //           if(str.charAt(j)===' ')
// //           {
// //               break
// //           }
// //         }
// //        }
// //       }
// //    }
//     const handleDelete= (v)=> {
//     setDeleteOpen(true)
//     setId(v._id)
//     }
//     if(typeof value !== 'undefined'){
//     return(
//         <>
//           <EditModalBox setIsOpen={setIsOpen} isOpen={isOpen} closeModal={() => setIsOpen(false)} users={users} value={content}/>
//           <DeleteModalBox setDeleteOpen={setDeleteOpen} postId={id} isOpen={deleteOpen} closeModal={() => setDeleteOpen(false)}/>
//         {value.map(v => (
//         <ListContainer>
//         <ImgSec/>
//         <TextSec>
//             <FlexRow>
//             <h4>{v.name? v.name:data.company_name}</h4>
//             <span>{(new Date(v.updatedAt).toLocaleString()).substring(0,new Date(v.updatedAt).toLocaleString().indexOf(","))}</span>
//             </FlexRow>
//             <p>{v.content}</p>
//             {mentions==='All Mentions'||(v.name!==data.company_name&& v.name)?
//             <Icon>
//             <img src={LikeIcon} alt={LikeIcon} />
//             <img src={CommentIcon} alt={CommentIcon} />
//             </Icon>: null
//              }
//              <FlexRow>
//             <span>
//                 <button onClick={()=> handleEdit(v)}>Edit</button>
//                 <button onClick={()=> handleDelete(v)}>Delete</button>
//             </span>
//           </FlexRow>
//         </TextSec>
//         </ListContainer>
//         ))}
//         </>
//     )
//     }
//     else{
//         return null
//     }
// }

// export default Listing
