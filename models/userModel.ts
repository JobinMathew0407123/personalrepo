// src/models/userModel.ts

// import mongoose, { Schema, Document } from 'mongoose';

// export interface IUser extends Document {
//   username: string;
//   email: string;
//   password: string;
// }

// const UserSchema: Schema = new Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
// });

// const User = mongoose.model<IUser>('User', UserSchema);

// export default User;

import mongoose from 'mongoose';

const mongoosedb = require('mongoose');

const postSchema = new mongoosedb.Schema({
  title: String,
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
