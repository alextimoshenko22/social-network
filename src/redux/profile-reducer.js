import { profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_STATUS = "SET-STATUS";
const DELETE_POST = 'DELETE-POST';
const SAVE_PHOTO_SUCCESS = 'SAVE-PHOTO-SUCCESS';

let initialState = {
  posts: [
    { id: 1, message: "Hello World!", likesCount: 2 },
    { id: 2, message: "Nice Day!", likesCount: 21 },
    { id: 3, message: "WTF", likesCount: 21 },
  ],
  profile: null,
  status: ""
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost]
      };
    }
    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status
      }
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter(p => p.id !== action.postId)
      }
    }
    case SAVE_PHOTO_SUCCESS: {
      return {
        ...state,
        profile: {...state.profile, photos: action.photos}
      }
    }
    default:
      return state;
  }
};

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText });

export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });

export const setStatus = (status) => ({ type: SET_STATUS, status });

export const deletePost = (postId) => ({ type: DELETE_POST, postId });

export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})

//THUNK

export const getUserProfile = (userId) => async (dispatch) => {
  let data = await profileAPI.getProfile(userId);
  dispatch(setUserProfile(data));
}

export const getStatus = (userId) => async (dispatch) => {
  let data = await profileAPI.getStatus(userId);
  dispatch(setStatus(data));
}

export const updateStatus = (status) => async (dispatch) => {
  let data = await profileAPI.updateStatus(status);
  if (data.resultCode === 0) {
    dispatch(setStatus(status));
  }
}

export const savePhoto = (file) => async (dispatch) => {
  let data = await profileAPI.savePhoto(file);
  if (data.resultCode === 0) {
    dispatch(savePhotoSuccess(data.data.photos));
  }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  const data = await profileAPI.saveProfile(profile);
  if (data.resultCode === 0) {
    dispatch(getUserProfile(userId));
  }
  else {
    return Promise.reject(data.messages[0]);
  }
}

export default profileReducer;

