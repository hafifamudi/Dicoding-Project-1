const { MusicPayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const MusicsValidator = {
  validateMusicPayload: (payload) => {
    const validationResult = MusicPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = MusicsValidator;
