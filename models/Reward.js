const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    payload: {
        type: Object,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['badge', 'easter_egg', 'milestone', 'general']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Reward", rewardSchema);
