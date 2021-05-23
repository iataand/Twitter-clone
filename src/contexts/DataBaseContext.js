import { useContext, createContext } from "react";
import { database } from "../firebase";

const DataBaseContext = createContext();

export const useDatabase = () => {
  return useContext(DataBaseContext);
};

export default function DatabaseProvider({ children }) {
  const dbRef = database.ref("posts");

  const addUserToDatabase = (user) => {
    return database.ref("users").push(user);
  };

  const getCommsRef = (postId) => {
    return database.ref(`posts/${postId}`);
  };

  const getLikesRef = (postId) => {
    return database.ref(`posts/${postId}/likedBy`);
  };

  const addPostToDatabase = (post) => {
    return database.ref("posts").push(post);
  };

  const addCommToPost = (postId, comment, user) => {
    return database
      .ref(`posts/${postId}/comments`)
      .push({ user: user, text: comment });
  };

  const getLikes = (postId) => {
    return database
      .ref(`posts/${postId}/likedBy`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const incrementLikes = (postId) => {
    return database.ref(`/posts/${postId}/likes`).transaction((value) => {
      return (value || 0) + 1;
    });
  };

  const decrementLikes = (postId) => {
    return database.ref(`/posts/${postId}/likes`).transaction((value) => {
      return (value || 0) - 1;
    });
  };

  const addLikeToPost = (postId, user) => {
    return database.ref(`posts/${postId}/likedBy`).push(user);
  };

  const addLike = (postId) => {
    return database.ref(`users/likedPosts`).push(postId);
  };

  const removeLike = (postId, user) => {
    return database
      .ref(`posts/${postId}/likedBy/`)
      .get()
      .then((res) => {
        if (res) {
          const id = Object.entries(res.val()).find((el) => el[1] === user);
          database.ref(`posts/${postId}/likedBy/${id[0]}`).remove();
        }
      });
  };

  const removePost = (postId) => {
    return database.ref(`posts/${postId}`).remove();
  };

  const removeComment = (commentId, postId) => {
    return database.ref(`posts/${postId}/comments/${commentId}`).remove();
  };

  const states = {
    getCommsRef,
    addCommToPost,
    addPostToDatabase,
    dbRef,
    addLike,
    addUserToDatabase,
    addLikeToPost,
    getLikes,
    getLikesRef,
    incrementLikes,
    removeLike,
    decrementLikes,
    removePost,
    removeComment,
  };

  return (
    <DataBaseContext.Provider value={states}>
      {children}
    </DataBaseContext.Provider>
  );
}
