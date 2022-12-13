import React from 'react';
import Modal from 'react-modal';
import Galleryimg1 from '../../images/gallery-img.png';
import ButtonSmall from '../UI/ButtonSmall';
import CrossIcon from '../../images/cross-pink.svg';

const GallerModalBox = ({isOpen, closeModal}) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        // onAfterOpen={this.afterOpenModal}
        onRequestClose={() => closeModal()}
        className="Modal galleryModal"
        overlayClassName="Overlay"
        htmlOpenClassName="ReactModal__Html--open"
      >
        <div className="ModalHeader">
          {/* <button onClick={closeModal}>
            <img src={closeIcon} alt="Close" />
          </button> */}
          <h3>Select Pictures from the gallery</h3>
        </div>
        <div className="ContentModal">
          <div className="GallerySection">
            <div className="list">
              <img src={Galleryimg1} alt="img" />
            </div>
            <div className="list active">
              <img src={Galleryimg1} alt="img" />
            </div>
            <div className="list">
              <img src={Galleryimg1} alt="img" />
            </div>
            <div className="list">
              <img src={Galleryimg1} alt="img" />
            </div>
            <div className="list active">
              <img src={Galleryimg1} alt="img" />
            </div>
            <div className="list">
              <img src={Galleryimg1} alt="img" />
            </div>
            <div className="list">
              <img src={Galleryimg1} alt="img" />
            </div>
            <div className="list">
              <img src={Galleryimg1} alt="img" />
            </div>
            <div className="list">
              <img src={Galleryimg1} alt="img" />
            </div>
            <div className="list">
              <img src={Galleryimg1} alt="img" />
            </div>
            <div className="list">
              <img src={Galleryimg1} alt="img" />
            </div>
            <div className="list">
              <img src={Galleryimg1} alt="img" />
            </div>
            <div className="list">
              <img src={Galleryimg1} alt="img" />
            </div>
          </div>
          <ul>
            <li>image1<img src={CrossIcon} alt="delete" /></li>
            <li>image2<img src={CrossIcon} alt="delete" /></li>
            <li>image3<img src={CrossIcon} alt="delete" /></li>
            <li>image4<img src={CrossIcon} alt="delete" /></li>
          </ul>
          <div className="uploadimg"><p>Drap or <span>Upload</span> Image</p></div>

          <div className="modalButton">
            <ButtonSmall maxWidth="100px" onClick={() => closeModal()}
              type="submit" className="btn btn-primary ">Publish</ButtonSmall>
          </div>
        </div>
      </Modal>
    </div >
  );
};

export default GallerModalBox;
