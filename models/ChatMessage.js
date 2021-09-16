const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    type: {
        type: String,
        required: true,
        enum: ['game', 'event', 'user'],
    },
    message: {
        type: String,
        required: true,
        max: 1200,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    }
});
module.exports = mongoose.model("ChatMessage", chatMessageSchema);
