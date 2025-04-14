CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT COMMENT '用户ID',
  username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名，唯一标识',
  password VARCHAR(255) NOT NULL COMMENT '用户密码（加密存储）',
  email VARCHAR(100) NOT NULL UNIQUE COMMENT '用户邮箱，唯一标识',
  company VARCHAR(100) NOT NULL COMMENT '用户所属公司',
  role ENUM('admin', 'user') DEFAULT 'user' COMMENT '用户角色（管理员或普通用户）',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_email (email) COMMENT '邮箱索引',
  INDEX idx_company (company) COMMENT '公司索引'
) COMMENT='用户表，存储系统中所有用户的信息';