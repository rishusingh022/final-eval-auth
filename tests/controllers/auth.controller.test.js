const authController = require('../../src/controllers/auth.controller');
const authServices = require('../../src/services/auth.services');
const { HTTPError } = require('../../src/utils/errorHandler');

describe('Auth Controller', () => {
  describe('registerUser', () => {
    it('should return 201 and user data when user is created successfully', async () => {
      const mockReq = {
        body: {
          username: 'test',
          password: 'test',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockUser = {
        id: 1,
        username: 'test',
        password: 'test',
        createdAt: '2021-01-01',
        updatedAt: '2021-01-01',
      };
      authServices.registerUser = jest.fn().mockResolvedValue(mockUser);
      await authController.registerUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'User created successfully',
        data: mockUser,
      });
    });
    it('should return 400 and error message when user already exists', async () => {
      const mockReq = {
        body: {
          username: 'test',
          password: 'test',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockError = new HTTPError('User already exists', 400);
      authServices.registerUser = jest.fn().mockRejectedValue(mockError);
      await authController.registerUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: mockError.message,
      });
    });
    it('should return 500 and error message when error is not instance of HTTPError', async () => {
      const mockReq = {
        body: {
          username: 'test',
          password: 'test',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockError = new Error('Something went wrong');
      authServices.registerUser = jest.fn().mockRejectedValue(mockError);
      await authController.registerUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Something went wrong',
      });
    });
  });
  describe('loginUser', () => {
    it('should return 200 and user data when user is logged in successfully', async () => {
      const mockReq = {
        body: {
          username: 'test',
          password: 'test',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockUser = {
        id: 1,
        username: 'test',
        password: 'test',
        createdAt: '2021-01-01',
        updatedAt: '2021-01-01',
      };
      authServices.loginUser = jest.fn().mockResolvedValue(mockUser);
      await authController.loginUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'User logged in successfully',
        data: mockUser,
      });
    });
    it('should return 404 and error message when user is not found', async () => {
      const mockReq = {
        body: {
          username: 'test',
          password: 'test',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockError = new HTTPError('User not found', 404);
      authServices.loginUser = jest.fn().mockRejectedValue(mockError);
      await authController.loginUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: mockError.message,
      });
    });
    it('should return 400 and error message when password is incorrect', async () => {
      const mockReq = {
        body: {
          username: 'test',
          password: 'test',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockError = new HTTPError('Password is incorrect', 400);
      authServices.loginUser = jest.fn().mockRejectedValue(mockError);
      await authController.loginUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: mockError.message,
      });
    });
    it('should return 500 and error message when error is not instance of HTTPError', async () => {
      const mockReq = {
        body: {
          username: 'test',
          password: 'test',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockError = new Error('Something went wrong');
      authServices.loginUser = jest.fn().mockRejectedValue(mockError);
      await authController.loginUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Something went wrong',
      });
    });
  });
  describe('validateUserTOken', () => {
    it('should return 200 and user data when token is valid', async () => {
      const mockReq = {
        body: {
          token: 'test',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockUser = {
        id: 1,
        username: 'test',
        password: 'test',
        createdAt: '2021-01-01',
        updatedAt: '2021-01-01',
      };
      authServices.validateUserToken = jest.fn().mockResolvedValue(mockUser);
      await authController.validateUserToken(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'User validated successfully',
        data: mockUser,
      });
    });
    it('should return 401 and error message when token is invalid', async () => {
      const mockReq = {
        body: {
          token: 'test',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockError = new HTTPError('token not valid', 401);
      authServices.validateUserToken = jest.fn().mockRejectedValue(mockError);
      await authController.validateUserToken(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: mockError.message,
      });
    });
    it('should return 500 and error message when error is not instance of HTTPError', async () => {
      const mockReq = {
        body: {
          token: 'test',
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockError = new Error('Something went wrong');
      authServices.validateUserToken = jest.fn().mockRejectedValue(mockError);
      await authController.validateUserToken(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: 'Something went wrong',
      });
    });
  });
});
