/* eslint-disable camelcase */

const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

const { mapDBToModel } = require('../../utils');

class MusicsService {
  constructor() {
    this._pool = new Pool();
  }

  async addMusic({
    title,
    year,
    performer,
    genre,
    duration,
  }) {
    const id = nanoid(16);
    const song = 'song-';

    const idSong = song.concat(id);
    const created_at = new Date().toISOString();
    const updated_at = created_at;

    const query = {
      text: 'INSERT INTO music VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      values: [idSong, title, year, performer, genre, duration, created_at, updated_at],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Catatan gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getMusics() {
    const result = await this._pool.query('SELECT * FROM music');
    return result.rows.map(mapDBToModel);
  }

  async getMusicById(id) {
    const query = {
      text: 'SELECT * FROM music WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Catatan tidak ditemukan');
    }

    return result.rows.map(mapDBToModel)[0];
  }

  async editMusicById(id, {
    title,
    year,
    performer,
    genre,
    duration,
  }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE music SET title = $1, year = $2, performer = $3, genre = $4, duration = $5,updated_at = $6 WHERE id = $7 RETURNING id',
      values: [title, year, performer, genre, duration, updatedAt, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
    }
  }

  async deleteMusicById(id) {
    const query = {
      text: 'DELETE FROM music WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = MusicsService;
