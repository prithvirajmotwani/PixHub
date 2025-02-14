import React from "react";
import ModalLayout from "./ModalLayout/modal-layout";
import "./image.css";
function ImagePreviewModal({ open, onClose, imgUrl }) {
  return (
    <ModalLayout open={open} onClose={onClose} width="600px">
      <img src={imgUrl} alt="Image" className="imgClass" />
    </ModalLayout>
  );
}

export default ImagePreviewModal;
