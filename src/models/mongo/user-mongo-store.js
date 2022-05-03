// use mongo model to access db
import { User } from "./user.js";

export const userMongoStore = {
  async getAllUsers() {
    // lean option returns Plain Old Javascript object for faster and less memory intensive queries
    const users = await User.find().lean();
    return users;
  },

  async getUserById(id) {
    if (id) {
      try {
        const user = await User.findOne({ _id: id }).lean();
        return user;
      } catch (error) {
        console.log("Could not find User ID");
        return null;
      }
    }
    return null;
  },

  async addUser(user) {
    const newUser = new User(user);
    const userObj = await newUser.save();
    const u = await this.getUserById(userObj._id);
    return u;
  },

  async getUserByEmail(email) {
    const user = await User.findOne({ email: email }).lean();
    return user;
  },

  async deleteUserById(id) {
    try {
      await User.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await User.deleteMany({});
  },
};
