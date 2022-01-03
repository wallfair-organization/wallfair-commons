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
}

module.exports = Service;
