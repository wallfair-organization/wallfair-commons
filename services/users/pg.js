class Service {
  constructor(pg) {
    this.pg = pg;
    this.queryRunner = pg.createQueryRunner();
  }

  getUserCount = async () => {
    const queryRaw = `SELECT * FROM casino_trades WHERE state = $1`
    const queryRes = await this.queryRunner.query(queryRaw, [2]);

    const total = queryRes.length || 0;
    return total;
  }
}

module.exports = Service;
