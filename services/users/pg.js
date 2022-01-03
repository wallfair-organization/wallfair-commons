class Service {
  constructor(pg) {
    this.pg = pg;
    this.queryRunner = pg.createQueryRunner();
  }

  getUser = async (params) => {
    const userId = params?._id || params?.userId;
    const queryRaw = `SELECT * FROM users WHERE userid = '${userId}'`;
    const queryRes = await this.queryRunner.query(queryRaw);
    return queryRes?.[0];
  }

  getUserById = async (id) => {
    return await this.getUser({userId: id});
  }

  getUserCount = async () => {
    const queryRaw = `SELECT count(id) as total FROM users`
    const queryRes = await this.queryRunner.query(queryRaw);

    const total = queryRes?.[0]?.total || 0;
    return total;
  }
}

module.exports = Service;
