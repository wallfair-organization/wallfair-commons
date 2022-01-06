const wallfair = require("../../index");

class Service {
  constructor(mongoose) {
    this.mongoose = mongoose;
    this.model = mongoose.models.User;
  }

  getUser = async (params, projection = null, options = {}) => {
    const user = await this.model.findOne(params, projection, options);
    return user ? user.toObject() : null;
  }

  getUsers = async (params, projection = null, options = {}) => {
    const users = await this.model.find(params, projection, options);
    return users;
  }

  getUserById = async (id, projection = null, options) => {
    return await this.getUser({_id: this.mongoose.Types.ObjectId(id)}, projection, options);
  }

  getRefByUserId = async (id) => {
    return await this.getUsers({ref: id.toString()}, ['id', 'username', 'email', 'date']);
  }

  getUserByWallet = async (walletAddress) => {
    return await this.getUser({walletAddress});
  }

  getUserByEmail = async (email) => {
    return await this.getUser({email});
  }

  getUserCount = async () => {
    return await this.model.countDocuments().exec();
  }

  getUserCountBy = async (params) => {
    return await this.model.countDocuments(params).exec();
  }

  getUsersById = async (ids, projection) => {
    return await this.model.find({_id: {$in: ids}}, projection)
  }

  createUser = async (userData) => {
    return await new this.model(userData).save();
  }

  checkUserGotBonus = async (bonusName, userId) => {
    const userData = await this.getUser({
      'bonus.name': bonusName,
      '_id': userId
    }, ['_id']);

    return userData ? true : false;
  }

  getUsersCountByBonus = async (bonusName) => {
    const counter = await this.model.countDocuments({
      'bonus.name': bonusName
    });

    return counter;
  }

  getLeaderboardSkipLimit = async (skip, limit) => {
    return this.model.find({ username: { $exists: true }, amountWon: { $exists: true, $ne: null } })
      .sort({ amountWon: -1, date: -1 })
      .select({ username: 1, amountWon: 1 })
      .limit(limit)
      .skip(skip)
      .exec();
  }

  addBonusFlagOnly = async (userId, bonusCfg, state = 1) => {
    if(userId && bonusCfg) {
      const toSave = {};
      toSave.name = bonusCfg.type;
      toSave.state = state;
      if(bonusCfg.amount) {
        toSave.amount = bonusCfg.amount;
      }

      return await this.model.updateOne({
        _id: this.mongoose.Types.ObjectId(userId)
      }, {
        $push: {
          bonus: toSave
        }
      });
    }
  }

  updateUser = async (params, toUpdate) => {
    return this.model.updateOne({
      $or: [{'_id': params._id}, {'email': params.email}]
    }, toUpdate)
  }

  addLeaderboardPoints = async (userId, points, factor) => {
    const toInc = +points * factor;
    return await this.model.updateOne({_id: userId}, {$inc: {amountWon: toInc}})
  }
}

module.exports = Service;
