const mongoose = require("mongoose");

const userChat = new mongoose.Schema({
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    date: {
        type: Date,
        required: true,
        default: Date.now,
    }
});
module.exports = mongoose.model("UserChat", userChat);