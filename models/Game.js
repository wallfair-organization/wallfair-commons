const mongoose = require("mongoose");

const game = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'coming-soon'],
    },
    picture: {
      type: String,
    },  
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      required: true,
      default: Date.now,
    }
});
module.exports = mongoose.model("Game", game);