/**
 * 认证路由模块
 * 提供用户登录和认证状态检查接口
 * @file authRoutes.js
 * @version 1.0.6
 */
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

// Helper function for sending error responses
const sendErrorResponse = (res, status, message, error = null) => {
  console.error(message, error);
  return res.status(status).json({ 
    success: false, 
    msg: message,
    ...(error && { error: error.message })
  });
};

// Helper function to generate JWT token
const generateToken = (userId) => {
  const jwtSecret = config.get('jwtSecret');
  if (!jwtSecret) {
    throw new Error('JWT Secret is not defined in config');
  }

  const payload = {
    user: {
      id: userId,
    },
  };

  return jwt.sign(payload, jwtSecret, { expiresIn: 36000 });
};

// 在文件顶部添加
if (!config.has('jwtSecret')) {
  throw new Error('FATAL ERROR: jwtSecret is not defined in configuration');
}

// 安全头设置：
// 建议在路由中添加安全头
router.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY'); // 新增
  next();
});

// @route   GET /api/auth
// @desc    获取当前认证用户信息
// @access  Private
// @header  Authorization: Bearer {token}
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude password
    if (!user) {
      return sendErrorResponse(res, 404, 'User not found');
    }
    res.json({ success: true, user });
  } catch (err) {
    console.error(err.message);
    sendErrorResponse(res, 500, 'Server Error', err);
  }
});

// @route   POST /api/auth 
// @desc    用户登录认证
// @access  Public
// @param   {string} email - 用户邮箱
// @param   {string} password - 用户密码
router.post(
  '/',
  [
    check('email', 'Please enter a valid email').isEmail().normalizeEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return sendErrorResponse(res, 400, 'Invalid Credentials');
      }

      // 修改后的密码比较逻辑
      const isMatch = user.password 
        ? await bcrypt.compare(password, user.password)
        : await bcrypt.compare(password, '$2a$10$fakehashforsecurity'); // 虚假hash比较

      if (!isMatch) {
        return sendErrorResponse(res, 400, 'Invalid Credentials');
      }

      // 在登录成功处
      console.log(`User ${user.id} logged in at ${new Date().toISOString()}`);
      const token = generateToken(user.id);
      res.json({ success: true, token });
    } catch (err) {
      console.error(err.message);
      sendErrorResponse(res, 500, 'Server Error');
    }
  }
);

module.exports = router;
// 在config检查后添加
const TOKEN_EXPIRES_IN = '10h'; // JWT有效期
const MIN_PASSWORD_LENGTH = 6; // 密码最小长度
