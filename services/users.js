const pgService = require('./users/pg');
const mongoService = require('./users/mongo');
const helpers = require('./users/_helpers');
let service = null;

const setParams = (params) => {
  if(params.useEngine === 'mongo') {
    service = new mongoService(params.mongoose);
  } else {
    service = new pgService(params.pg);
  }

  return params;
}

const getService = () => {
  return service;
}

module.exports = {
  setParams,
  getService,
  helpers
};
