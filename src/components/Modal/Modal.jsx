import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 'calc(100vw - 96px)',
    maxHeight: 'calc(100vh - 48px)',
    overflow: 'hidden',
  },
};

 Modal.setAppElement('#root');

 export const ModalContainer = ({ selectedImage, closeImage }) => {
  return (
    <Modal 
      style={customStyles}
      isOpen={selectedImage !== null}
      shouldCloseOnEsc={selectedImage !== null}
      onRequestClose={closeImage}
    >
      <img src={selectedImage} alt="Large size" width="700px" />
    </Modal>
  );
};

ModalContainer.propTypes = {
  selectedImage: PropTypes.string.isRequired,
  closeImage: PropTypes.func.isRequired,
};
