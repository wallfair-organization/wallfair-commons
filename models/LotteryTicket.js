const mongoose = require("mongoose");

const lotteryTicketSchema = new mongoose.Schema({
    lotteryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lottery',
        required: true,
    } ,
    
    lotteryQuestionIndex: {
        type: Number,
        required: false,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    skip: {
        type: Boolean,
        required: true
    },

    createdAt: {
        type: String,
        required: true,
        default: Date.now,
    },

});

module.exports = mongoose.model("Lottery", lotteryTicketSchema);