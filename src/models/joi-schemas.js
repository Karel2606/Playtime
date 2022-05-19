import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

// description of validation rules for login form
export const UserCredentialsSpec = Joi.Object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

// description of validation rules for signup form
// enhance joi schemas to document!
// schema inheritance: userspec is extension of usercredentialsspec
export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");


// joi schema inheritance: userspecplus is extension of userspec
export const UserSpecPlus = UserSpec.keys({
  // reuse idSpec schema in userSpec --> joi schema inheritance!
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

// description of validation rules for add track form/api call
export const TrackSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Piano Sonata No. 7"),
    artist: Joi.string().required().example("Beethoven"),
    duration: Joi.number().allow("").optional().example(12),
    playlistid: IdSpec,
  })
  .label("Track");

  export const TrackSpecPlus = TrackSpec.keys({
    _id: IdSpec,
    __v: Joi.number(),
  }).label("TrackPlus");
  
  export const TrackArraySpec = Joi.array().items(TrackSpecPlus).label("TrackArray");

// description of validation rules for add playlist form/api call
export const PlaylistSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Beethoven Sonatas"),
    userid: IdSpec,
    tracks: TrackArraySpec,
  })
  .label("Playlist");

export const PlaylistSpecPlus = PlaylistSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PlaylistPlus");

export const PlaylistArraySpec = Joi.array().items(PlaylistSpecPlus).label("PlaylistArray");