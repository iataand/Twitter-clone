import { RiImageAddFill } from "react-icons/ri";
import { imageFailedMessage, imageSuccesMessage } from "../../../constants";
import { Alert } from "react-bootstrap";
import CancelImageUpload from "./CancelImageUpload";
import "./createPostStyle.css";

export default function PostButtons({
  handleAttachImage,
  imageLoadedMessage,
  setImageLoadedMessage,
  setImageToUpload,
  setImagePreview,
}) {
  return (
    <div className="d-flex justify-content-between align-items-center">
      {imageLoadedMessage != null ? (
        <Alert
          variant={imageLoadedMessage ? "success" : "danger"}
          className={
            imageLoadedMessage ? "ImageLoadedSuccesful" : "ImageLoadedFailed"
          }
        >
          {imageLoadedMessage ? (
            <>
              {`${imageSuccesMessage} `}
              <CancelImageUpload
                setImageLoadedMessage={setImageLoadedMessage}
                setImageToUpload={setImageToUpload}
                setImagePreview={setImagePreview}
              ></CancelImageUpload>
            </>
          ) : (
            <>{imageFailedMessage}</>
          )}
        </Alert>
      ) : (
        <div
          className="AttachImageButton d-flex ml-3"
          onClick={handleAttachImage}
        >
          <RiImageAddFill className="mt-1"></RiImageAddFill>
          <span className="ml-1">Attach image</span>
        </div>
      )}

      <button
        className={
          imageLoadedMessage === false
            ? "btn btn-dark mr-1 disabled"
            : "btn btn-dark mr-1"
        }
        type={imageLoadedMessage === false ? "button" : "submit"}
      >
        Post
      </button>
    </div>
  );
}
