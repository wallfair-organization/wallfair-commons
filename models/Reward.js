const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
