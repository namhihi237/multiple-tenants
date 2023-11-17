import { config } from './orm.config';

import { join } from 'path';

module.exports = {
  ...config,
  entities: [join(__dirname, './modules/tenanted/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, './migrations/tenanted/*{.ts,.js}')],
};
