/* eslint-disable no-empty-function */
import Boom from "@hapi/boom";
import { IdSpec, PlaylistArraySpec, PlaylistSpec, PlaylistSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const playlistApi = {
  create: {
    auth: {
      strategy: "jwt",
    },
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
    tags: ["api"],
    description: "Create a Playlist",
    notes: "Returns the newly created playlist",
    validate: { payload: PlaylistSpec, failAction: validationError },
    response: { schema: PlaylistSpecPlus, failAction: validationError },
  },

    find: {
      auth: {
        strategy: "jwt",
      },
      handler: async function (request, h) {
        try {
          const playlists = await db.playlistStore.getAllPlaylists();
          return playlists;
        } catch (err) {
          return Boom.serverUnavailable("Database Error");
        }
      },
      tags: ["api"],
      response: { schema: PlaylistArraySpec, failAction: validationError },
      description: "Get all playlists",
      notes: "Returns all playlists",
    },
  
    findOne: {
      auth: {
        strategy: "jwt",
      },
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
      tags: ["api"],
    description: "Find a Playlist",
    notes: "Returns a playlist",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PlaylistSpecPlus, failAction: validationError },
    },

    deleteOne: {
      auth: {
        strategy: "jwt",
      },
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
      tags: ["api"],
      description: "Delete a playlist",
      validate: { params: { id: IdSpec }, failAction: validationError },
    },
  
    deleteAll: {
      auth: {
        strategy: "jwt",
      },
      handler: async function (request, h) {
        try {
          await db.playlistStore.deleteAllPlaylists();
          return h.response().code(204);
        } catch (err) {
          return Boom.serverUnavailable("Database Error");
        }
      },
      tags: ["api"],
      description: "Delete all PlaylistApi",
    },
 };