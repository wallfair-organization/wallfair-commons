class Service {
  constructor(pg) {
    this.pg = pg;
    this.queryRunner = pg.createQueryRunner();
  }

  getUserCount = async () => {
    const queryRaw = `SELECT count(id) as total FROM users`
    const queryRes = await this.queryRunner.query(queryRaw);

    const total = queryRes?.[0]?.total || 0;
    return total;
  }
}

module.exports = Service;
