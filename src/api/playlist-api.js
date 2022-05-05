/* eslint-disable no-empty-function */
import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const playlistApi = {
  create: {
    auth: false,
    handler: async function(request, h) {
      try {
        const playlist = await db.playlistStore.addPlaylist(request.payload);
        if (playlist) {
            // http response code: resource created
          return h.response(playlist).code(201);
        }
        return Boom.badImplementation("error creating user");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

    find: {
      auth: false,
      handler: async function (request, h) {
        try {
          const playlists = await db.playlistStore.getAllPlaylists();
          return playlists;
        } catch (err) {
          return Boom.serverUnavailable("Database Error");
        }
      },
    },
  
    findOne: {
      auth: false,
      async handler(request) {
        try {
          const playlist = await db.playlistStore.getPlaylistById(request.params.id);
          if (!playlist) {
            return Boom.notFound("No Playlist with this id");
          }
          return playlist;
        } catch (err) {
          return Boom.serverUnavailable("No Playlist with this id");
        }
      },
    },

    deleteOne: {
      auth: false,
      handler: async function (request, h) {
        try {
          const playlist = await db.playlistStore.getPlaylistById(request.params.id);
          if (!playlist) {
            return Boom.notFound("No Playlist with this id");
          }
          await db.playlistStore.deletePlaylistById(playlist._id);
          return h.response().code(204);
        } catch (err) {
          return Boom.serverUnavailable("No Playlist with this id");
        }
      },
    },
  
    deleteAll: {
      auth: false,
      handler: async function (request, h) {
        try {
          await db.playlistStore.deleteAllPlaylists();
          return h.response().code(204);
        } catch (err) {
          return Boom.serverUnavailable("Database Error");
        }
      },
    },
 };