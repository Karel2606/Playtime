// http client library for browser
import axios from "axios";

import { serviceUrl } from "../fixtures.js";

// use axios to create http requests and responses
export const playtimeService = {
  playtimeUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.playtimeUrl}/api/users`, user);
    return res.data;
  }
}