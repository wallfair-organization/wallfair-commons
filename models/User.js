const mongoose = require("mongoose");

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
  email: {
    type: String,
    required: true,
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
  status: {
    type: String,
    enum: ['active', 'inactive', 'locked'],
    default: 'active'
  },
  auth0Id: { type: mongoose.Schema.Types.String },
});

module.exports = mongoose.model("User", userSchema);
