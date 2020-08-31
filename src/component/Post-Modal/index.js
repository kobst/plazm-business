import React from 'react'
import Modal from 'react-modal'
import UploadImage from '../../images/upload-img.jpg'
import Image from '../../images/user.png'
import WishlistIcon from '../../images/wishlist-icon.svg'
import CommentIcon from '../../images/comment.svg'
import CloseIcon from '../../images/cross-modal.svg'
import CommnentImg from '../../images/comment-img.png'
import ReplyIcon from '../../images/reply.svg'

const PostModalBox = ({ isOpen, closeModal }) => {



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

        <div className="ContentModal">
          <div class="imageSlider">
            <img src={UploadImage} alt="" />
          </div>
          <div className="postOuter">
            <button onClick={closeModal}>
              <img src={CloseIcon} alt="Close" />
            </button>
            <div className="postDetails">
              <div className="messageSec">
                <div className="image"><img src={Image} alt="" /></div>
                <div className="text">
                  <h2>Ahmad Torff</h2>
                  <span>wed 16th Aug 2020</span>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie sed eget nisi, quam erat massa morbi. Ultrices sapien, magna pellentesque eget vulputate tortor augue massa lorem. Scelerisque diam proin in aliquet nulla blandit vitae penatibus. Aenean laoreet varius non tempus at ut mi mauris.
                  </p>
                  <div className="postBottom">
                    <div className="Icon">
                      <div><img src={WishlistIcon} alt="" /><sup>3</sup></div>
                      <div><img src={CommentIcon} alt="" /><sup>3</sup></div>
                    </div>
                    <p>2 Comments</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="commentSec">
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
            </div>
          </div>
        </div>
      </Modal>
    </div >
  )
}

export default PostModalBox
