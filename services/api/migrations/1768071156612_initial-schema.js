/* eslint-disable camelcase */

exports.shorthands = {
  id: {
    type: 'uuid',
    primaryKey: true,
  },
  created_at: {
    type: 'timestamp with time zone',
    notNull: true,
  },
  updated_at: {
    type: 'timestamp with time zone',
    notNull: true,
  },
};

exports.up = (pgm) => {
  pgm.createExtension('pgcrypto', { ifNotExists: true });

  pgm.createTable('users', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
    },
    email: { type: 'varchar(255)', notNull: true, unique: true },
    password_hash: { type: 'text', notNull: true },
    created_at: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.createTable('videos', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
    },
    user_id: {
      type: 'uuid',
      notNull: true,
      references: '"users"(id)',
      onDelete: 'CASCADE',
    },
    title: { type: 'text' },
    status: { type: 'varchar(50)', notNull: true, default: 'uploading' },
    storage_path: { type: 'text' },
    encryption_key_ciphertext: { type: 'text' },
    created_at: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  pgm.createTable('incidents', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
    },
    creator_user_id: {
      type: 'uuid',
      notNull: true,
      references: '"users"(id)',
      onDelete: 'CASCADE',
    },
    title: { type: 'text' },
    description: { type: 'text' },
    location_tile: { type: 'varchar(255)' },
    starts_at: { type: 'timestamp with time zone' },
    ends_at: { type: 'timestamp with time zone' },
    created_at: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('incidents');
  pgm.dropTable('videos');
  pgm.dropTable('users');
  pgm.dropExtension('pgcrypto');
};
