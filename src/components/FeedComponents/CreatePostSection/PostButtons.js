import { RiImageAddFill } from "react-icons/ri";
import "./style.css";

export default function PostButtons({ handleAttachImage, imageLoaded }) {
  return (
    <div className="d-flex justify-content-between align-items-center">
      {imageLoaded ? (
        <span className="ImageLoaded">Image loaded, click post to upload</span>
      ) : (
        <div
          className="AttachImageButton d-flex ml-3"
          onClick={handleAttachImage}
        >
          <RiImageAddFill className="mt-1"></RiImageAddFill>
          <span className="ml-1">Attach image</span>
        </div>
      )}

      <button className="btn btn-dark mr-1" type="submit">
        Post
      </button>
    </div>
  );
}
