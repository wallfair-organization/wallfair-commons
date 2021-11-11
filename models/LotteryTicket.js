module.exports = (mongoose) => {
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
            required: false,
            default: Date.now,
        },
    });

    return mongoose.model("LotteryTicket", lotteryTicketSchema);
}

