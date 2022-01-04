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

  getUserCount = async () => {
    return await this.model.countDocuments().exec();
  }

  getUserCountBy = async (params) => {
    return await this.model.countDocuments(params).exec();
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

  addBonusFlagOnly = async (userId, bonusCfg) => {
    if(userId && bonusCfg) {
      return await this.model.updateOne({
        _id: this.mongoose.Types.ObjectId(userId)
      }, {
        $push: {
          bonus: {
            name: bonusCfg.type
          }
        }
      });
    }
  }

  updateUser = async (params, toUpdate) => {
    return this.model.updateOne({
      '_id': params._id
    }, toUpdate)
  }
}

module.exports = Service;
