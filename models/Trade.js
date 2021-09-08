const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  betId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bet'
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open'
  }
});

module.exports = mongoose.model("Trade", tradeSchema);
