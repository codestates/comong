import { initModels } from './init-models';
import { Sequelize } from 'sequelize';
import { config } from '../config/config';

const env = 'development';
const sequelizeConfig = config[env];

const sequelize = new Sequelize(
  sequelizeConfig.database,
  sequelizeConfig.username,
  sequelizeConfig.password,
  {
    host: sequelizeConfig.host,
    timezone: sequelizeConfig.timezone,
    dialect: 'mysql',
  },
);

const models: {} = {
  ...initModels(sequelize),
  sequelize: sequelize,
  Sequelize: Sequelize
}

module.exports = models;
