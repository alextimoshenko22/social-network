//DAL уровень
import * as axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: { "API-KEY": "b8557fb1-7fbc-465b-affe-5ccd2ceec209" },
});

export const usersAPI = {

  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data); //promise: возвращаем только data из response
  },

  follow(userId) {
    return instance.post(`follow/${userId}`).then((response) => response.data);
  },

  unfollow(userId) {
    return instance.delete(`follow/${userId}`).then((response) => response.data);
  },
};

export const authAPI = {

  authMe() {
    return instance.get(`auth/me`).then((response) => response.data);
  },

  login(email, password, rememberMe = false) {
    return instance.post('/auth/login', {email, password, rememberMe}).then((response)=>response.data);
  },

  logout() {
    return instance.delete('/auth/login');
  },

};

export const profileAPI = {

  getProfile(userId) {
    return instance.get(`profile/${userId}`).then((response) => response.data);
  },

  getStatus(userId) {
    return instance.get(`profile/status/` + userId).then((response) => response.data);
  },

  updateStatus(status) {
    return instance.put('profile/status/', {status: status}).then((response) => response.data);
  },

  savePhoto(photoFile) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance.put('/profile/photo', formData).then((response) => response.data);
  },

  saveProfile(profile) {
    return instance.put('/profile', profile).then((response) => response.data);
  },

};


export const securityAPI = {

  getCaptchaUrl() {
    return instance.get(`/security/get-captcha-url`).then((response) => response.data);
  },

};