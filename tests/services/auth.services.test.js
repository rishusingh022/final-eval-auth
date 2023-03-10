const db = require('../../database/models');
const authServices = require('../../src/services/auth.services');
const { HTTPError } = require('../../src/utils/errorHandler');
const encryptPassword = require('../../src/utils/encryptPassword');

describe('Auth Services', () => {
  describe('registerUser', () => {
    it('should return user data when user is created successfully', async () => {
      const mockUser = {
        id: 1,
        username: 'test',
        password: 'test',
        createdAt: '2021-01-01',
        updatedAt: '2021-01-01',
      };
      const mockEncryptedPassword = 'test';
      jest.spyOn(db.user, 'findOne').mockResolvedValue(null);
      jest
        .spyOn(encryptPassword, 'encryptPassword')
        .mockResolvedValue(mockEncryptedPassword);
      jest.spyOn(db.user, 'create').mockResolvedValue(mockUser);
      const newUser = await authServices.registerUser(
        mockUser.username,
        mockUser.password
      );
      expect(newUser).toEqual(mockUser);
    });
    it('should throw error when user already exists', async () => {
      const mockUser = {
        id: 1,
        username: 'test',
        password: 'test',
        createdAt: '2021-01-01',
        updatedAt: '2021-01-01',
      };
      jest.spyOn(db.user, 'findOne').mockResolvedValue(mockUser);
      await expect(
        authServices.registerUser(mockUser.username, mockUser.password)
      ).rejects.toThrowError(HTTPError);
    });
  });
  describe('loginUser', () => {
    it('should return token when user is logged in successfully', async () => {});
  });
});
