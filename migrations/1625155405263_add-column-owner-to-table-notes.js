/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.addColumn('music', {
    owner: {
      type: 'VARCHAR(50)',
    },
  });
};

exports.down = pgm => {
   pgm.dropColumn('music', 'owner');
};
