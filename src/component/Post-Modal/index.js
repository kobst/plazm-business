import React, {useState,useEffect}from 'react'
import Modal from 'react-modal'
import CloseIcon from '../../images/cross-modal.svg'
// import Image from '../../images/user.png'
// import WishlistIcon from '../../images/wishlist-icon.svg'
// import CommentIcon from '../../images/comment.svg'
// import CommnentImg from '../../images/comment-img.png'
// import ReplyIcon from '../../images/reply.svg'
// import Wishlistgrey from '../../images/wishlist-grey.svg'
// import Commentgrey from '../../images/comment-grey.svg'
// import rightarrowblack from '../../images/right-arrow-black.svg'
import SlideShow from '../UI/SlideShow'

const PostModalBox = ({ isOpen, closeModal, value, place}) => {
  const [description, setDescription] = useState()
  const [image,setImage]= useState([])

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
     if(value){
      setDescription(value.data)
      setImage(value.media)
     }
    
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [value,closeModal])
 
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
                <div className="image"><img src={place.default_image_url?place.default_image_url:null} alt="" /></div>
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
                {/* <div className="commentLeft">
                    <div class="commentimg">
                      <img src={CommnentImg} alt="" />
                    </div>
                    <div className="commentText">
                      <div className="left">
                        <div class="topHeading">
                          <h3>Kevin Nash</h3>
                          <span>23m</span>
                          </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis aliquam adipiscing aliquam est arcu quis facilisi. Sed id feugiat felis porttitor pharetra.</p>
                        </div>
                        <div className="commenticon">
                          <img src={WishlistIcon} alt=""  />
                          <img src={ReplyIcon} alt=""  />
                        </div>
                    </div>
                </div>

                <div className="commentLeft ml-55">
                    <div class="commentimg">
                      <img src={CommnentImg} alt="" />
                    </div>
                    <div className="commentText">
                      <div className="left">
                        <div class="topHeading">
                          <h3>Kevin Nash</h3>
                          <span>23m</span>
                          </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis aliquam adipiscing aliquam est arcu quis facilisi. Sed id feugiat felis porttitor pharetra.</p>
                        </div>
                        <div className="commenticon">
                          <img src={WishlistIcon} alt=""  />
                          <img src={ReplyIcon} alt=""  />
                        </div>
                    </div>
                </div>
                <div className="commentLeft">
                    <div class="commentimg">
                      <img src={CommnentImg} alt="" />
                    </div>
                    <div className="commentText">
                      <div className="left">
                        <div class="topHeading">
                          <h3>Kevin Nash</h3>
                          <span>23m</span>
                          </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis aliquam adipiscing aliquam est arcu quis facilisi. Sed id feugiat felis porttitor pharetra.</p>
                        </div>
                        <div className="commenticon">
                          <img src={WishlistIcon} alt=""  />
                          <img src={ReplyIcon} alt=""  />
                        </div>
                    </div>
                </div> */}

            </div>
          </div>
        </div>
      </Modal>
    </div >
  )
}

export default PostModalBox
