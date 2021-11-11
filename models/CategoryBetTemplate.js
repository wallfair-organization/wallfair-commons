module.exports = (mongoose) => {
    const Outcome = new mongoose.Schema({
        index: Number,
        name: String,
    });

    const categoryBetTemplateSchema = new mongoose.Schema({
        category: {
            type: String,
            required: true
        },

        name: {
            type: String,
            required: true,
        },

        marketQuestion: {
            type: String,
            required: true,
            max: 255,
        },

        evidenceDescription: {
            type: String,
            required: false,
            max: 1200,
        },

        startType: {
            type: Boolean,
            required: true,
            enum: ['Immediately', 'After some time']
        },

        startInMinutes: {
            type: Number,
            required: false
        },

        outcomes: [{
            type: Outcome
        }],
    });

    return mongoose.model("CategoryBetTemplate", categoryBetTemplateSchema);
}
