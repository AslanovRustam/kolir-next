import * as migration_20260616_145815_initial from './20260616_145815_initial';

export const migrations = [
  {
    up: migration_20260616_145815_initial.up,
    down: migration_20260616_145815_initial.down,
    name: '20260616_145815_initial'
  },
];
