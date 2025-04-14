const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// 项目模型
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 }, // 项目名称
  description: { type: String, trim: true, maxlength: 500 }, // 项目描述
  budget: { type: Number, required: true, min: 0 }, // 项目预算
  deadline: { type: Date, required: true }, // 截止日期
  industry: { type: String, required: true, enum: ['建筑', '市政', '交通', '能源'] }, // 工程行业分类
}, { timestamps: true }); // 自动添加 createdAt 和 updatedAt 字段

// 用户模型
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 50 }, // 用户名
  password: { type: String, required: true, minlength: 6 }, // 密码
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ }, // 邮箱
  company: { type: String, required: true, trim: true }, // 用户所属公司
  role: { type: String, enum: ['admin', 'user'], default: 'user' }, // 用户角色
}, { timestamps: true });

// 在保存用户之前对密码进行哈希处理
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// 标书模型
const bidSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true, index: true }, // 关联的项目
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true }, // 关联的用户
  content: { type: String, required: true, trim: true }, // 标书内容
  price: { type: Number, required: true, min: 0 }, // 报价
  status: { type: String, enum: ['draft', 'submitted'], default: 'draft' }, // 状态
  createdAt: { type: Date, default: Date.now }, // 创建时间
}, { timestamps: true });

// 导出模型
module.exports = {
  Project: mongoose.model('Project', projectSchema),
  User: mongoose.model('User', userSchema),
  Bid: mongoose.model('Bid', bidSchema),
};