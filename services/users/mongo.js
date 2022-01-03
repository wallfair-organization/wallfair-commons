class Service {
  constructor(mongoose) {
    this.mongoose = mongoose;
    this.model = mongoose.models.User;
  }

  getUserCount = async () => {
    const total = await this.model.countDocuments().exec();
    return total;
  }
}

module.exports = Service;
