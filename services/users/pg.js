const prepareProjection = (projection) => {
  let output = null;
  if (projection && projection.length) {
    output = projection.map((column) => {
      if (column === "date") {
        return 'created_at';
      }
      return column;
    }).join(',');
  }

  return output || '*';
}

const objKeysToLowerCase = (source) => {
  return Object.keys(source)
    .reduce((destination, key) => {
      destination[key.toLowerCase()] = source[key];
      return destination;
    }, {});
}

const prepareJsonPath = (params) => {
  const key = Object.keys(params)[0];
  const pathValue = params[key];

  const jsonPath = key.split('.').map((item, index) => {
    if (index > 0) {
      return `'${item}'`;
    }
    return item;
  });

  const pathString = jsonPath.join('->>');

  return {
    pathString,
    pathValue
  };
}

class Service {
  constructor(pg) {
    this.pg = pg;
    this.queryRunner = pg.createQueryRunner();
    this.queryBuilder = pg.createQueryBuilder();
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

  getUserByWallet = async (walletAddress) => {
    const queryRaw = `SELECT *
                      FROM users
                      WHERE walletaddress = '${walletAddress}'`;

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

  getUserCountBy = async (params) => {
    const {pathString, pathValue} = prepareJsonPath(params)

    const queryRaw = `SELECT count(id) as total
                      FROM users
                      WHERE ${pathString} = '${pathValue}'`;
    const queryRes = await this.queryRunner.query(queryRaw);

    const total = queryRes?.[0]?.total || 0;
    return total;
  }

  checkUserGotBonus = async (bonusName, userId) => {
    const queryRaw = `SELECT userId
                      FROM users,
                           JSONB_ARRAY_ELEMENTS(bonus) AS bonuses
                      WHERE bonuses ->> 'name' = '${bonusName}' AND userid = ${userId};`;
    const queryRes = await this.queryRunner.query(queryRaw);

    const userData = queryRes?.[0] || null;

    return userData ? true : false;
  }

  getUsersCountByBonus = async (bonusName) => {
    const queryRaw = `SELECT count(id) as total
                      FROM users,
                           JSONB_ARRAY_ELEMENTS(bonus) AS bonuses
                      WHERE bonuses ->> 'name' = '${bonusName}';`;
    const queryRes = await this.queryRunner.query(queryRaw);

    const counter = queryRes?.[0]?.total || null;

    return counter;
  }

  addBonusFlagOnly = async (userId, bonusCfg) => {
    if (userId && bonusCfg) {
      const toPush = JSON.stringify({
          name: bonusCfg.type
      });
      const queryRaw = `UPDATE users
                        SET bonus = bonus || '${toPush}'::jsonb
                        WHERE userId = '${userId}'
                        returning *;`;
      const queryRes = await this.queryRunner.query(queryRaw);

    }
  }

  updateUser = async (params, toUpdate) => {
    const queryRes = await this.queryBuilder
      .update('users')
      .set(objKeysToLowerCase(toUpdate))
      .where("userid = :userId", { userId: params.userid })
      .execute();

    console.log('queryRes', queryRes);
  }
}

module.exports = Service;
