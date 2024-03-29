import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import CloseIcon from '../../images/cross-modal.svg';
import Watermark from '../../images/watermark.png';
import WishlistIcon from '../../images/wishlist-icon.svg';
import CommnentImg from '../../images/comment-img.png';
import ReplyIcon from '../../images/reply.svg';
import SlideShow from '../UI/SlideShow';
import {fetchComments} from '../../Api';
import {Scrollbars} from 'react-custom-scrollbars';

const PostModalBox = ({isOpen, closeModal, value, place, newComment}) => {
  const [description, setDescription] = useState();
  const [image, setImage]= useState([]);
  const [comments, setComments]= useState([]);
  const [allReplies, setAllReplies]= useState([]);
  const convertNumberToTwoDigitString = (n) => {
    return n > 9 ? '' + n : '0' + n;
  };
  const getDate = (value) => {
    const date = new Date(value);
    const time = convertNumberToTwoDigitString(date.getHours()) +
      ':' + convertNumberToTwoDigitString(date.getMinutes()) + ', ' + ((date.toLocaleString()).substring(0, new Date(date).toLocaleString().indexOf(',')).replace(/\//g, '-'));
    return time;
  };

  useEffect(() => {
    const getAllData = async (id)=>{
      const allComments = await fetchComments(id);
      setAllReplies([]);
      if (allComments.length!==0) {
        const reply = allComments[0].replies;
        setAllReplies(reply);
        setComments(allComments);
      }
    };
    if (value) {
      setDescription(value.data);
      setImage(value.media);
      getAllData(value._id);
    }
  }, [value, closeModal, newComment]);


  const returnSlider=()=>{
    if (image.length>1) {
      return (
        <div className="imageSlider">
          <SlideShow image={image} />
        </div>
      );
    } else if (image.length===1) {
      return (
        <div className="imageSlider">
          <img src={image[0].image} alt="img" />
        </div>
      );
    } else {
      return null;
    }
  };

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

        <div style={ image.length>0?{maxWidth: '1000px'}:{maxWidth: '600px'}} className="ContentModal">
          {returnSlider()}
          <div className="postOuter">
            <button onClick={closeModal}>
              <img src={CloseIcon} alt="Close" />
            </button>
            <div className="postDetails">
              <div className="messageSec">
                <div className="image">
                  <img src={place.default_image_url?place.default_image_url:Watermark} alt="" />
                </div>
                <div className="text">
                  <h2>{value&&value.name ? value.name : place.company_name }</h2>
                  <span>{value ?(getDate(value.updatedAt)):null}</span>
                  <p>{value ? description:null}</p>
                </div>
              </div>
            </div>
            <Scrollbars className="" autoHeight autoHeightMax={736} style={{overflow: 'hidden'}}>
              <div className="commentSec">
                {comments && comments.length!==0?
              allReplies.map((v) => (
                <>
                  <div className="commentLeft">
                    <div className="commentimg">
                      <img src={CommnentImg} alt="" />
                    </div>
                    <div className="commentText">
                      <div className="left">
                        <div className="topHeading">
                          <h3>{v.userId.name}</h3>
                          <span>{getDate(comments[0].createdAt)}</span>
                        </div>
                        <p>{v.body}</p>
                      </div>
                      <div className="commenticon">
                        <img src={WishlistIcon} alt="" />
                        <img src={ReplyIcon} alt="" />
                      </div>
                    </div>
                  </div>
                </>)):null}

              </div>
            </Scrollbars>
          </div>
        </div>

      </Modal>
    </div>

  );
};

export default PostModalBox;
