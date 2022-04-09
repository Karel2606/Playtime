import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      // for storing/retrieve playlist by userid
      const loggedInUser = request.auth.credentials;
      // only displaying authenticated user!
      const playlists = await db.playlistStore.getUserPlaylists(loggedInUser._id);
      const viewData = {
        title: "Playtime Dashboard",
        user: loggedInUser,
        playlists: playlists,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addPlaylist: {
    handler: async function (request, h) {
      // get userid from logged session
      const loggedinUser = request.auth.credentials;
      const newPlayList = {
        // binde playlist to userid of auth user in session
        userid: loggedinUser._id,
        title: request.payload.title,
      };
      await db.playlistStore.addPlaylist(newPlayList);
      return h.redirect("/dashboard");
    },
  },
};