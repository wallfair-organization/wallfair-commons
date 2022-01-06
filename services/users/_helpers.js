const findUserByFilter = (users, filter) => {
  return users.find(u => {
    const userId = u._id || u.userid;
    return userId.toString() === filter
  })
}

module.exports = {
  findUserByFilter
}
