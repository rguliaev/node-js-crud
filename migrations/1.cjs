/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('users', {
        id:  { type: 'uuid', primaryKey: true },
        name: { type: 'varchar(1000)', notNull: true },
        age: { type: 'integer', notNull: true },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp')
        }
    });
};

exports.down = (pgm) => {
    pgm.dropTable('users')
};
