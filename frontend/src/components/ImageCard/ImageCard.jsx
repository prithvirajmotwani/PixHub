import React, { useState } from "react";
import "./ImageCard.css"; // Ensure correct file path for CSS styles
import ImagePreviewModal from "../modals/image-preview-modal";

import LongMenu from "./Menu";
const ImageCard = ({ image, userId }) => {
  const [openModal, setOpenModal] = useState(false);
  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  const onOpenModal = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };
  const previewImage = (val) => {
    setOpenModal(val);
  };
  return (
    <>
      <ImagePreviewModal
        open={openModal}
        onClose={onCloseModal}
        imgUrl={image.imgUrl}
      />
      <div className="image-card">
        <img
          src={image.imgUrl}
          alt={`Uploaded on ${formatDate(image.uploadDate)}`}
          onClick={onOpenModal}
        />

        <div className="image-details">
          <p>Size: {image.imgSize}</p>
          <p>
            Date Uploaded: {formatDate(image.uploadDate)}
            <div className="image__card-menu">
              <LongMenu
                previewImage={previewImage}
                imgId={image.imgId}
                userId={userId}
              />
            </div>
          </p>
        </div>
      </div>
    </>
  );
};

export default ImageCard;
