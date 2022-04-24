import Joi from "joi";

// description of validation rules for signup form
export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

// description of validation rules for login form
export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

// description of validation rules for add track form
export const TrackSpec = {
  title: Joi.string().required(),
  artist: Joi.string().required(),
  duration: Joi.number().allow("").optional(),
};

// description of validation rules for add playlist form
export const PlaylistSpec = {
  title: Joi.string().required(),
};