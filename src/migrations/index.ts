import * as migration_20260616_145815_initial from './20260616_145815_initial';
import * as migration_20260715_132502_add_submissions from './20260715_132502_add_submissions';

export const migrations = [
  {
    up: migration_20260616_145815_initial.up,
    down: migration_20260616_145815_initial.down,
    name: '20260616_145815_initial',
  },
  {
    up: migration_20260715_132502_add_submissions.up,
    down: migration_20260715_132502_add_submissions.down,
    name: '20260715_132502_add_submissions'
  },
];
