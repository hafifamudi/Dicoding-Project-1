/* eslint-disable camelcase */

const mapDBToModel = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  created_at,
  updated_at,
  username,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  insertedAt: created_at,
  updatedAt: updated_at,
  username,
});

module.exports = { mapDBToModel };
