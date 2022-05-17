import Joi from "joi";

// description of validation rules for signup form
export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");
// enhance joi schemas to document!
export const UserSpec = Joi.object()
.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
  email: Joi.string().email().example("homer@simpson.com").required(),
  password: Joi.string().example("secret").required(),
  _id: IdSpec,
  __v: Joi.number(),
})
.label("UserDetails");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");

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