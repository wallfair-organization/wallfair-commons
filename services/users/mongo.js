class Service {
  constructor(mongoose) {
    this.mongoose = mongoose;
    this.model = mongoose.models.User;
  }

  getUser = async (params) => {
    return await this.model.findOne(params);
  }

  getUserById = async (id) => {
    return await this.getUser({_id: this.mongoose.Types.ObjectId(id)});
  }

  getUserCount = async () => {
    return await this.model.countDocuments().exec();
  }
}

module.exports = Service;
