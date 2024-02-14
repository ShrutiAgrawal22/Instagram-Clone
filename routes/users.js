var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var plm = require('passport-local-mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/instaclone');

var userSchema = mongoose.Schema({
  username : String,
  name : String,
  followers : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'user'
  }],
  following : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'user'
  }],
  posts : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'user'
  }],
  story : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'user'
  }],
  messages : {
    type : Array,
    default : []
  },
  profilepicture : String,
  bio : String,
  password : String,
  email : String
})

mongoose.plugin(plm);
module.exports = mongoose.model('user', userSchema);
