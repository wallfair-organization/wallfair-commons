const mongoose = require("mongoose");
const {notificationTypes} = require("../constants/eventTypes");

const universalEventSchema = mongoose.Schema({
    //Aggregate, if there is an entity associated with an event (i.e Bet, Game)
    agg: {type: mongoose.Schema.Types.ObjectId},
    //If there is a user associated with an event
    user: {ref: 'User', type: mongoose.Schema.Types.ObjectId},
    //A list of registered types
    type: {
        type: String,
        enum: Object.values(notificationTypes)
    },
    //A short human readable message
    message: {type: String},
    //Event payload
    data: {},
    //Event source, pid, service, channel, etc.
    metadata: {},
    //Explicitly define event schema version
    version: {type: Number, default: 1}
},    {timestamps: true})

module.exports = mongoose.model
