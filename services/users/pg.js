const prepareProjection = (projection) => {
  let output = null;
  if (projection && projection.length) {
    output = projection.map((column) => {
      if(column === "date") {
        return 'created_at';
      }
      return column;
    }).join(',');
  }

  return output || '*';
}

class Service {
  constructor(pg) {
    this.pg = pg;
    this.queryRunner = pg.createQueryRunner();
  }

  getUser = async (params, projection) => {
    const userId = params?._id || params?.userId;

    const preparedProjection = projection ? prepareProjection(projection) : '*';
    const queryRaw = `SELECT ${preparedProjection}
                      FROM users
                      WHERE userid = '${userId}'`;

    const queryRes = await this.queryRunner.query(queryRaw);

    return queryRes?.[0];
  }

  getUserById = async (id) => {
    return await this.getUser({userId: id});
  }

  getRefByUserId = async (id) => {
    const queryRaw = `SELECT id, username, email, created_at
                      FROM users
                      WHERE ref = '${id}'`;

    const queryRes = await this.queryRunner.query(queryRaw);
    return queryRes?.[0];
  }

  getUserCount = async () => {
    const queryRaw = `SELECT count(id) as total
                      FROM users`
    const queryRes = await this.queryRunner.query(queryRaw);

    const total = queryRes?.[0]?.total || 0;
    return total;
  }
}

module.exports = Service;
