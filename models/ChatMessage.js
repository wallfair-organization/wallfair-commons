module.exports = (mongoose) => {
  const chatMessageSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    roomId: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
      max: 1200,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    read: {
      type: Date,
      required: false,
    },
    payload: {
      type: Object,
      required: false,
    },
  });

  return mongoose.model('ChatMessage', chatMessageSchema);
}


