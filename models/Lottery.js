const mongoose = require("mongoose");

const LotteryQuestion = new mongoose.Schema({
    index: Number,
    name: String,
    imageUrl: String
});

const lotterySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    questions: [{
        type: LotteryQuestion
    }],
    winnerTicket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LotteryTicket',
        required: false,
    },
    createdAt: {
        type: String,
        required: true,
        default: Date.now,
    },
    closed: {
        type: Boolean,
        required: false,
        default: false
    },
    closedAt: {
        type: String,
        required: false,
        default: Date.now,     
    }
});

module.exports = mongoose.model("Lottery", lotterySchema);