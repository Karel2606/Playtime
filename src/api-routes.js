// defines http(REST) methodes: Get, Post, Put, Delete
import { userApi } from "./api/user-api.js";

export const apiRoutes = [
  { method: "POST", path: "/api/users", config: userApi.create },
  // gets all users 
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  // gets one user
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
];