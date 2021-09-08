const mongoose = require("mongoose");

const LotteryQuestion = new mongoose.Schema({
    index: Number,
    name: String,
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
});

module.exports = mongoose.model("Lottery", lotterySchema);