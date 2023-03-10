const { encryptPassword } = require('../../src/utils/encryptPassword');
const crypto = require('crypto');
jest.mock('crypto');
describe('encryptPassword', () => {
  it('should return a hash of the password', async () => {
    const password = 'user';
    const hashPassword = 'hashPassword';
    crypto.createHash.mockReturnValue({
      update: jest.fn().mockReturnThis(),
      digest: jest.fn().mockReturnValue(hashPassword),
    });
    const result = await encryptPassword(password);
    expect(result).toEqual(hashPassword);
  });
});
