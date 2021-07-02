/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  // membuat table collaborations
  pgm.createTable('collaborations', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    music_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

 /*
    Menambahkan constraint UNIQUE, kombinasi dari kolom music_id dan user_id.
    Guna menghindari duplikasi data antara nilai keduanya.
  */
  pgm.addConstraint('collaborations', 'unique_music_id_and_user_id', 'UNIQUE(music_id, user_id)');
 
  // memberikan constraint foreign key pada kolom note_id dan user_id terhadap notes.id dan users.id
  pgm.addConstraint('collaborations', 'fk_collaborations.music_id_musics.id', 'FOREIGN KEY(music_id) REFERENCES music(id) ON DELETE CASCADE');
  pgm.addConstraint('collaborations', 'fk_collaborations.user_id_users.id', 'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE'); 
};

exports.down = pgm => {
  // menghapus tabel collaborations
  pgm.dropTable('collaborations');
};
