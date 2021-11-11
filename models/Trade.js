module.exports = (mongoose) => {
  const tradeSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    betId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bet',
      required: true,
    },
    outcomeIndex: {
      type: Number,
      required: true,
    },
    investmentAmount: {
      type: Number,
      required: true,
    },
    outcomeTokens: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'sold', 'rewarded', 'closed'],
      default: 'active',
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  });

  return mongoose.model("Trade", tradeSchema);
}


