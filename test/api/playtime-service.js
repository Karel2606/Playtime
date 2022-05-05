// http client library for browser
import axios from "axios";

import { serviceUrl } from "../fixtures.js";
// wrapper to access api, for cleaner code in tests
//  operate against the api-routes 
// use axios to create http requests and responses
export const playtimeService = {
  playtimeUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.playtimeUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.playtimeUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.playtimeUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.playtimeUrl}/api/users`);
    return res.data;
  },

  async createPlaylist(playlist) {
    const res = await axios.post(`${this.playtimeUrl}/api/playlists`, playlist);
    return res.data;
  },

  async getPlaylist(id) {
    const res = await axios.get(`${this.playtimeUrl}/api/playlists/${id}`);
    return res.data;
  },

  async getAllPlaylists(){
    const res = await axios.get(`${this.playtimeUrl}/api/playlists`);
    return res.data;
  },

  async deleteAllPlaylists() {
    const res = await axios.delete(`${this.playtimeUrl}/api/playlists`);
    return res.data;
  },  

  async deletePlaylist(id) {
    const response = await axios.delete(`${this.playtimeUrl}/api/playlists/${id}`);
    return response;
  },


};
