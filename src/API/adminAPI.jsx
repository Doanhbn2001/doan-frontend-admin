import axios from 'axios';
// import axiosClient from './axiosClient';
//const url = 'https://5f68-2405-4802-115-5f80-d8cf-6aa3-9c7f-41f8.ap.ngrok.io/';
const url = 'http://localhost:5000/';

const AdminAPI = {
  postSignIn: (user) => {
    return axios({
      method: 'post',
      url: url + 'auth/signin',
      data: user,
      // withCredentials: true,
    });
  },

  getPlants: (search) => {
    return axios({
      url: url + 'plants//get-all-plants?search=' + search,
      // withCredentials: true,
    });
  },

  getTypes: (search) => {
    return axios({
      url: url + 'plants//get-all-types?search=' + search,
      // withCredentials: true,
    });
  },

  addType: (type) => {
    console.log(type);
    return axios({
      method: 'post',
      url: url + 'auth//add-type',
      data: { type: type },
    });
  },

  deleteType: (id) => {
    return axios({
      method: 'post',
      url: url + 'auth//delete-type',
      data: { id: id },
    });
  },

  addPlant: (data) => {
    return axios({
      method: 'post',
      url: url + 'auth//add-plant',
      data: data,
    });
  },

  deletePlant: (id) => {
    return axios({
      method: 'post',
      url: url + 'auth//delete-plant',
      data: { id: id },
    });
  },

  getPlant: (id) => {
    return axios({
      method: 'post',
      url: url + 'plants//get-detail',
      data: { id: id },
    });
  },

  editPlant: (data) => {
    return axios({
      method: 'post',
      url: url + 'auth//edit-plant',
      data: data,
    });
  },
};

export default AdminAPI;
