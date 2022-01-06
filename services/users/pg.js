const prepareProjection = (projection) => {
  let output = null;
  if (projection && projection.length) {
    output = projection.map((column) => {
      if (column === "date") {
        return 'created_at';
      }

      if (column === "_id") {
        return 'userid';
      }

      return column.toLowerCase();
    }).join(',');
  }

  return output || '*';
}

const objKeysToLowerCase = (source) => {
  return Object.keys(source)
    .reduce((destination, key) => {
      let newKey = null;
      if(key === "_id") {
        newKey = 'userid';
      } else {
        newKey = key.toLowerCase();
      }

      destination[newKey] = source[key];

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

const prepareArrayForIn = (ids) => {
  const elements = ids.map((item, index) => {
    return `'${item}'`;
  });

  return elements.join(',');
}

class Service {
  constructor(pg) {
    this.pg = pg;
    this.queryRunner = pg.createQueryRunner();
    this.queryBuilder = pg.createQueryBuilder();
  }

  getUser = async (params, projection) => {
    const userId = params?._id || params?.userId;
    const username = params?.username;

    const preparedProjection = projection ? prepareProjection(projection) : '*';
    const queryRaw = `SELECT ${preparedProjection}
                      FROM users
                      WHERE userid = '${userId}' OR username = '${username}'`;

    const queryRes = await this.queryRunner.query(queryRaw);

    return queryRes?.[0];
  }

  getUserById = async (id) => {
    return await this.getUser({userId: id});
  }

  getRefByUserId = async (id) => {
    const queryRaw = `SELECT userid, username, email, created_at
                      FROM users
                      WHERE ref = '${id}'`;

    const queryRes = await this.queryRunner.query(queryRaw);
    return queryRes;
  }

  getUserByWallet = async (walletAddress) => {
    const queryRaw = `SELECT *
                      FROM users
                      WHERE walletaddress = '${walletAddress}'`;

    const queryRes = await this.queryRunner.query(queryRaw);
    return queryRes?.[0];
  }

  getUserByEmail = async (email) => {
    const queryRaw = `SELECT *
                      FROM users
                      WHERE email = '${email}'`;

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

  getUsersById = async (ids, projection) => {
    const preparedProjection = projection ? prepareProjection(projection) : '*';
    const prepareIds = prepareArrayForIn(ids);
    const queryRaw = `SELECT ${preparedProjection}
                      FROM users
                      WHERE userid IN (${prepareIds})`;

    const queryRes = await this.queryRunner.query(queryRaw);
    return queryRes;
  }

  getLeaderboardSkipLimit = async (skip, limit) => {
    const queryRaw = `SELECT username, amountwon, userid
                      FROM users
                      WHERE username IS NOT NULL AND amountwon IS NOT NULL
                      ORDER BY amountwon DESC, created_at DESC`;

    const queryRes = await this.queryRunner.query(queryRaw);
    return queryRes;
  }

  createUser = async (userData) => {
    const toInsert = objKeysToLowerCase(userData);

    const queryRes = await this.queryBuilder
      .insert()
      .into('users')
      .values([toInsert])
      .returning('*')
      .execute().then((response) => {
        return response?.raw[0];
      });

    return queryRes;
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

  addBonusFlagOnly = async (userId, bonusCfg, state = 1) => {
    if (userId && bonusCfg) {
      const toPush = {};
      toPush.name = bonusCfg.type;
      toPush.state = state;
      if(bonusCfg.amount) {
        toPush.amount = bonusCfg.amount;
      }

      const queryRaw = `UPDATE users
                        SET bonus = bonus || '${JSON.stringify(toPush)}'::jsonb
                        WHERE userId = '${userId}'
                        returning *;`;
      const queryRes = await this.queryRunner.query(queryRaw);

    }
  }

  updateUser = async (params, toUpdate) => {
    const userId = params._id || params.userId;

    const queryRes = await this.queryBuilder
      .update('users')
      .set(objKeysToLowerCase(toUpdate))
      .where("userid = :userId", { userId })
      .orWhere("email = :email", { email: params.email })
      .execute();
  }

  addLeaderboardPoints = async (userId, points, factor) => {
    const toInc = +points * factor;

    const queryRaw = `UPDATE users
                        SET amountwon = amountwon + ${toInc}::float
                        WHERE userId = '${userId}'
                        returning amountwon;`;

    const queryRes = await this.queryRunner.query(queryRaw);

    return queryRes?.[0];
  }
}

module.exports = Service;
