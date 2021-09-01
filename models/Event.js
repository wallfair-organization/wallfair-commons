const mongoose = require("mongoose");

const Outcome = new mongoose.Schema({
    index: Number,
    name: String,
});

const Metadata = new mongoose.Schema({
    'twitch_id': String, 
    'twitch_login': String, 
    'twitch_name':String, 
    'twitch_game_id': String, 
    'twitch_game_name': String, 
    'twitch_channel_title': String,
    'twitch_last_synced': String, 
    'twitch_subscribed_online': {
        type: String,
        enum: ["false", "pending", "true"] 
        // "false" when unsubscribed, 
        // "pending" when sub is requested, 
        // "true" when sub is confirmed
    },
    'twitch_subscribed_offline': {
        type: String,
        enum: ["false", "pending", "true"] 
        // "false" when unsubscribed, 
        // "pending" when sub is requested, 
        // "true" when sub is confirmed
    }
});

exports.BetTemplate = new mongoose.Schema({
    betDuration: {
        type: Number,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    marketQuestion: {
        type: String,
        max: 255,
    },
    description: {
        type: String,
        max: 1200,
    },
    hot: {
        type: Boolean,
    },
    outcomes: [{
        type: Outcome
    }],
});

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255,
    },
    streamUrl: {
        type: String,
        required: true,
        max: 500,
    },
    state: {
        type: String,
        required: false,
        enum: ["coming_soon", "offline", "online"]
    },
    previewImageUrl: {
        type: String,
        required: true,
        max: 255,
    },
    tags: [
        {
            name: String
        }
    ],
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    type: {
        type: String,
        required: true,
        enum: ['streamed', 'non-streamed', 'game']
    },
    category: {
        type: String,
        required: true,
        enum: ['streamed-esports', 'streamed-shooter', 'streamed-mmorpg', 'streamed-other', 'sports', 'politics', 'crypto', 'celebrities', 'other']
    },
    metadata: {
        type: Metadata
    },
    betTemplate: this.BetTemplate,
    bets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bet'
    }]
});

module.exports = mongoose.model("Event", eventSchema);
