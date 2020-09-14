
import React, { useState } from 'react'
import styled from 'styled-components'
import PlusIcon from '../../../images/plus.svg'
import CloseIcon from '../../../images/close.svg'
import GalleryImg from '../../../images/gallery-img.png'
import GalleryImg1 from '../../../images/gallery-img1.png'
import GalleryWishlist from '../../../images/wishlist-gallery.svg'
import GallerModalBox from '../../Add-Gallery/index'

const GallerySection = styled.div`
margin-top: 20px;
display: flex;
padding: 0 10px;
flex-wrap: wrap;
img{
  border-radius: 13px;
  max-width:100%;
}
@media (max-width:767px){
  padding: 0px;
}
`

const Gallery = (props) => {
  const [isOpen,setIsOpen]= useState(false)




    return(
      <>
      { props.type==='edit'?
      <GallerySection>
        <div class="galleryImage">
          <p onClick={() => setIsOpen(true)}><img src={PlusIcon} alt="" /> Photo</p>
          <GallerModalBox  isOpen={isOpen} closeModal={() => setIsOpen(false)}/>
        </div>
        <div className="galleryImage">
          <img src={GalleryImg1} alt="" />
          <img src={GalleryWishlist} alt="Wishlist" className="wishlistGalery" />
        </div>
        <div className="galleryImage">
          <img src={GalleryImg} alt="" />
          <img src={CloseIcon} alt="Close" className="close" />
        </div>
        <div className="galleryImage">
          <img src={GalleryImg} alt="" />
        </div>
        <div className="galleryImage">
          <img src={GalleryImg} alt="" />
        </div>
      </GallerySection>
       : <GallerySection>
        <div class="galleryImage">
          <p onClick={() => setIsOpen(true)}><img src={PlusIcon} alt="" /> Photo</p>
          <GallerModalBox  isOpen={isOpen} closeModal={() => setIsOpen(false)}/>


        </div>
        <div className="galleryImage">
          <img src={GalleryImg1} alt="" />
          <img src={GalleryWishlist} alt="Wishlist" className="wishlistGalery" />
        </div>
        <div className="galleryImage">
          <img src={GalleryImg} alt="" />
          <img src={CloseIcon} alt="Close" className="close" />
        </div>
        <div className="galleryImage">
          <img src={GalleryImg} alt="" />
        </div>
        <div className="galleryImage">
          <img src={GalleryImg} alt="" />
        </div>
        <div className="galleryImage">
          <img src={GalleryImg} alt="" />
        </div>
        <div className="galleryImage">
          <img src={GalleryImg} alt="" />
          <img src={GalleryWishlist} alt="Wishlist" className="wishlistGalery" />
        </div>
        <div className="galleryImage">
          <img src={GalleryImg} alt="" />
        </div>
        <div className="galleryImage">
          <img src={GalleryImg} alt="" />
          <img src={CloseIcon} alt="Close" className="close" />
        </div>
        <div className="galleryImage">
          <img src={GalleryImg} alt="" />
        </div>
        <div className="galleryImage">
          <img src={GalleryImg} alt="" />
        </div>
      </GallerySection>
    }
    </>
    )
}

export default Gallery