/* eslint-disable camelcase */

const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

const { mapDBToModel } = require('../../utils');

class MusicsService {
  constructor(collaborationService) {
    this._pool = new Pool();
    this._collaborationService = collaborationService;
  }

  async verifyNoteOwner(id, owner) {
    const query = {
      text: 'SELECT * FROM notes WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Catatan tidak ditemukan');
    }
    const note = result.rows[0];
    if (note.owner !== owner) {
      throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
    }
  }

  async addMusic({
    title,
    year,
    performer,
    genre,
    duration,
    owner,
  }) {
    const id = nanoid(16);
    const song = 'song-';

    const idSong = song.concat(id);
    const created_at = new Date().toISOString();
    const updated_at = created_at;

    const query = {
      text: 'INSERT INTO music VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      values: [idSong, title, year, performer, genre, duration, owner, created_at, updated_at],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Catatan gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getMusics(owner) {
    const query = {
      text: `SELECT music.* FROM music
      LEFT JOIN collaborations ON collaborations.music_id = music.id
      WHERE music.owner = $1 OR collaborations.user_id = $1
      GROUP BY music.id`,
      values: [owner],
    };
    const result = await this._pool.query(query);
    return result.rows.map(mapDBToModel);
  }

  async getMusicById(id) {
    const query = {
      text: `SELECT notes.*, users.username
      FROM notes
      LEFT JOIN users ON users.id = notes.owner
      WHERE notes.id = $1`,
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Music tidak ditemukan');
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

  async verifyNoteAccess(noteId, userId) {
    try {
      await this.verifyNoteOwner(noteId, userId);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      try {
        await this._collaborationService.verifyCollaborator(noteId, userId);
      } catch {
        throw error;
      }
    }
  }
}

module.exports = MusicsService;
