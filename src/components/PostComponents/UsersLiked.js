import React from "react";

export default function UsersLiked({ usersLiked, handleShow }) {
  return (
    <div className="Likes">
      <p
        variant="primary"
        onClick={handleShow}
        className="d-flex justify-content-center"
        style={{ cursor: "pointer" }}
      >
        {usersLiked.length > 0 ? (
          usersLiked.length == 1 ? (
            <>{usersLiked.length} like </>
          ) : (
            <>{usersLiked.length} likes </>
          )
        ) : (
          ""
        )}
      </p>
    </div>
  );
}
