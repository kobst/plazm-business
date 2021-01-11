import React, {useState,useEffect}from 'react'
import Modal from 'react-modal'
import CloseIcon from '../../images/cross-modal.svg'
import Watermark from '../../images/watermark.png'
// import Image from '../../images/user.png'
import WishlistIcon from '../../images/wishlist-icon.svg'
// import CommentIcon from '../../images/comment.svg'
import CommnentImg from '../../images/comment-img.png'
import ReplyIcon from '../../images/reply.svg'
// import Wishlistgrey from '../../images/wishlist-grey.svg'
// import Commentgrey from '../../images/comment-grey.svg'
// import rightarrowblack from '../../images/right-arrow-black.svg'
import SlideShow from '../UI/SlideShow'
import {fetchComments} from '../../Api'

const PostModalBox = ({ isOpen, closeModal, value, place}) => {
  const [description, setDescription] = useState()
  const [image,setImage]= useState([])
  const [comments,setComments]= useState([])
  const [message,setMessage]= useState()

  const ConvertNumberToTwoDigitString = (n) => {
    return n > 9 ? "" + n : "0" + n;
  }
  const getDate = (value) => {
    const date = new Date(value);
    const time = ConvertNumberToTwoDigitString(date.getHours()) +
      ":" + ConvertNumberToTwoDigitString(date.getMinutes()) + ", " + ((date.toLocaleString()).substring(0,new Date(date).toLocaleString().indexOf(",")).replace(/\//g,'-'));
    return time

  }


 useEffect(() => {
  const  getAllData = async(id)=>{
    const allComments = await fetchComments(id)
    setComments(allComments)
   }
     if(value){
      setDescription(value.data)
      setImage(value.media)
      getAllData(value._id)
     }
    
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [value,closeModal])
 let ws = new WebSocket("ws://localhost:3001/dev?userId=5e10fc74432aedc2a29b7226")

 ws.onopen = () => {

 };
 ws.onmessage = (evt) => {
   // on receiving a message, add it to the list of messages
   const message = JSON.parse(evt.data);
    setMessage(message)
 };
 ws.onclose = () => {
   console.log("disconnected");
 };

 
 
 const returnSlider=()=>{
  if(image.length>1)
  {return(
  <div className="imageSlider">
    <SlideShow image={image} />
  </div>
  )
  }
  else if(image.length===1){
    return(
      <div className="imageSlider">
   <img src={image[0].image} alt="img" />
  </div>
    )
  }
  else{
    return null
  }
 }



  return (
    <div>
      <Modal
        isOpen={isOpen}
        // onAfterOpen={this.afterOpenModal}
        onRequestClose={() => closeModal()}
        className="Modal postModal"
        overlayClassName="Overlay"
        htmlOpenClassName="ReactModal__Html--open"
      >

        <div style={ image.length>0?{maxWidth:'1000px'}:{maxWidth:'600px'}} className="ContentModal">
          {returnSlider()}
          <div className="postOuter">
            <button onClick={closeModal}>
              <img src={CloseIcon} alt="Close" />
            </button>
            <div className="postDetails">
              <div className="messageSec">
                <div className="image"><img src={place.default_image_url?place.default_image_url:Watermark} alt="" /></div>
                <div className="text">
                   <h2>{value&&value.name ? value.name : place.company_name }</h2>
                   <span>{value ?(getDate(value.updatedAt)):null}</span>
                    <p>{value ? description:null}</p>
                  {/* <div className="postBottom">
                    <div className="Icon">
                      <div><img src={Wishlistgrey} alt="" /><sup>3</sup></div>
                      <div><img src={Commentgrey} alt="" /><sup>3</sup></div>
                    </div>
                    <p>2 Comments</p>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="commentSec">
            {comments && comments.length!==0?
              comments.map(v => (
                <>
                <div className="commentLeft">
                <div class="commentimg">
                  <img src={CommnentImg} alt="" />
                </div>
                <div className="commentText">
                  <div className="left">
                    <div class="topHeading">
                      <h3>{v.userId.name}</h3>
                      <span>{v.created_on}</span>
                      </div>
                    <p>{v.body}</p>
                    </div>
                    <div className="commenticon">
                      <img src={WishlistIcon} alt=""  />
                      <img src={ReplyIcon} alt=""  />
                    </div>
                </div>
            </div>
               </>)):null}
        
            </div>
          </div>
        </div>
      </Modal>
    </div >
  )
}

export default PostModalBox
