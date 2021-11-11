module.exports = (mongoose) => {
    const {universalEventTypes} = require("../constants/eventTypes");

    const universalEventSchema = mongoose.Schema({
        // A list of registered types
        type: {
            type: String,
            required: true,
            enum: universalEventTypes
        },

        // Originator  of this event
        performedBy: {
            type: String,
            required: true,
            enum: ['user', 'system', 'app']
        },

        // In case of User, this is ObjectID
        // In case of System, this is microservice name
        // In case of app, Oauth Client Id
        userId: {
            type: String,
            required: true
        },

        // Redis channel, socket.io room, amqp routing or similar
        channel: {type: String},

        // Event payload
        data: {},

        // Explicitly define event schema version
        version: {
            type: Number,
            default: 1
        }
    }, {timestamps: true})

    return mongoose.model("UniversalEvent", universalEventSchema);
}
