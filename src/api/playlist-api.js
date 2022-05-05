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
          return h.response(user).code(201);
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
      },
    },
  
    findOne: {
      auth: false,
      async handler(request) {
      },
    },

    deleteOne: {
      auth: false,
      handler: async function (request, h) {
      },
    },
  
    deleteAll: {
      auth: false,
      handler: async function (request, h) {
      },
    },
 };