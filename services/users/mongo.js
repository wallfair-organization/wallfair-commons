class Service {
  constructor(mongoose) {
    this.mongoose = mongoose;
    this.model = mongoose.models.User;
  }

  getUser = async (params, projection = null, options = {}) => {
    return await this.model.findOne(params, projection, options);
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
}

module.exports = Service;
