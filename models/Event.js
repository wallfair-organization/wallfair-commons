const mongoose = require("mongoose");

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
    },
    'youtube_last_synced': String,
    'youtube_channel_id': String,
});

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255,
    },
    slug: {
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
    tags: [{
        name: String
    }],
    type: {
        type: String,
        required: true,
        enum: ['streamed', 'non-streamed']
    },
    category: {
        type: String,
        required: true,
    },
    metadata: {
        type: Metadata
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    deactivatedAt: {
        type: Date,
        required: false
    },
    bets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bet'
    }]
});

module.exports = mongoose.model("Event", eventSchema);
