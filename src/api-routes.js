// defines http(REST) methodes: Get, Post, Put, Delete
import { userApi } from "./api/user-api.js";
import { playlistApi } from "./api/playlist-api.js";

export const apiRoutes = [
  { method: "POST", path: "/api/users", config: userApi.create },
  // gets all users 
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  // gets one user
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/playlists", config: playlistApi.create },
  { method: "DELETE", path: "/api/playlists", config: playlistApi.deleteAll },
  { method: "GET", path: "/api/playlists", config: playlistApi.find },
  { method: "GET", path: "/api/playlists/{id}", config: playlistApi.findOne },
  { method: "DELETE", path: "/api/playlists/{id}", config: playlistApi.deleteOne },


];