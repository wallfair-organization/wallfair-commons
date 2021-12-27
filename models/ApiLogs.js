module.exports = (mongoose) => {
  const apiLogs = new mongoose.Schema({
    api_type: {
      type: String,
      required: true
    },
    userId: {
      type: String
    },
    path: {
      type: String,
      required: true
    },
    method: {
      type: String,
      required: true
    },
    body: {
      type: Object
    },
    query: {
      type: Object
    },
    headers: {
      type: Object
    },
    statusCode: {
      type: String
    },
    ip: {
      type: String
    }
  }, {
    collection: 'api_logs',
    timestamps: {
      createdAt: true,
      updatedAt: false
    }
  });

  return mongoose.model('ApiLogs', apiLogs);
}


