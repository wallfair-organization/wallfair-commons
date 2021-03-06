module.exports = (mongoose) => {
  const notificationSchema = new mongoose.Schema({
    newBetInEvent: Boolean,
    newRewardReceived: Boolean,
    myBetResolved: Boolean,
    eventOnline: Boolean,
    eventOffline: Boolean,
    placeBet: Boolean,
    cashoutBet: Boolean
  });

  const Preferences = new mongoose.Schema({
    currency: {
      type: String,
      default: 'WFAIR',
    },
    gamesCurrency: {
      type: String,
      default: 'USD'
    }
  });

  const KycType = new mongoose.Schema({
    status : {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'error'],
      required:false,
    },
    date : {
      type: Date,
      required:false,
    },
    uid:{
      type: String,
      required:false,
    },
    refreshToken:{
      type: String,
      required:false,
    }
  });


  const userSchema = new mongoose.Schema({
    phone: {
      type: String,
      required: false,
      max: 255,
    },
    name: {
      type: String,
      required: false,
      max: 128,
      min: 2,
    },
    username: {
      type: String,
      required: false,
      max: 128,
      min: 2,
    },
    country: {
      type: String,
      required: false,
    },
    birthdate: {
      type: Date,
      required: false,
    },
    email: {
      type: String,
      required: false,
      max: 128,
      min: 2,
    },
    walletAddress: {
      type: String,
      required: false,
      max: 42,
      min: 42
    },
    profilePictureUrl: {
      type: String,
      required: false,
      max: 128,
      min: 2
    },
    profilePicture: {
      type: String,
      required: false
    },
    password: {
      type: String,
      required: false,
      max: 128,
      min: 8,
    },
    ref: {
      type: String,
      required: false,
    },
    cid: {
      type: String,
      required: false,
    },
    sid: {
      type: String,
      required: false,
    },
    openBets: {
      type: [Object],
      required: true,
      default: [],
    },
    closedBets: {
      type: [Object],
      required: true,
      default: [],
    },
    confirmed: {
      type: Boolean,
      required: true,
      default: false,
    },
    admin: {
      type: Boolean,
      required: true,
      default: false,
    },
    emailConfirmed: {
      type: Boolean,
      required: true,
      default: false,
    },
    emailCode: {
      type: String,
      required: false,
      max: 6,
      min: 6,
    },
    passwordResetToken: {
      type: String,
      required: false,
      max: 12
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    amountWon: {
      type: Number,
      required: false,
      default: 0
    },
    tokensRequestedAt: {
      type: Date
    },
    notificationSettings: {
      type: notificationSchema
    },
    preferences: {
      type: Preferences,
      default: {},
    },
    trackers: {
      type: Object
    },
    aboutMe: {
      type: String,
      required: false,
    },
    alpacaBuilderProps: {
      type: Object,
      required: false,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'locked', 'banned'],
      default: 'active'
    },
    auth0Id: { type: mongoose.Schema.Types.String },
    kyc: {
      type: KycType,
      default: {},
    },
    tosConsentedAt: {
      type: Date,
      required: false,
    },
    accountSource: {
      type: String,
      default: 'email',
      required: false,
    },
    reactivateOn: {
      type: Date,
      default: null,
      required: false,
    },
    statusDescription: {
      type: String,
      default: null,
      required: false,
    },
    bonus: {
      type: [Object],
      default: []
    },
    tokensClaimedAt: {
      type: Date,
      required: false,
    },
  });

  return mongoose.model("User", userSchema);
}


