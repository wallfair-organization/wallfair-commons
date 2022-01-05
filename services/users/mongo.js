class Service {
  constructor(mongoose) {
    this.mongoose = mongoose;
    this.model = mongoose.models.User;
  }

  getUser = async (params, projection = null, options = {}) => {
    const user = await this.model.findOne(params, projection, options);
    return user ? user.toObject() : null;
  }

  getUserById = async (id, projection = null, options) => {
    return await this.getUser({_id: this.mongoose.Types.ObjectId(id)}, projection, options);
  }

  getRefByUserId = async (id) => {
    return await this.getUser({ref: id}, ['id', 'username', 'email', 'date']);
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
}

module.exports = Service;
