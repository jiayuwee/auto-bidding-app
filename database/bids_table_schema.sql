CREATE TABLE bids (
  id INT PRIMARY KEY AUTO_INCREMENT COMMENT '标书ID',
  project_id INT NOT NULL COMMENT '关联的项目ID',
  user_id INT NOT NULL COMMENT '关联的用户ID',
  content TEXT NOT NULL COMMENT '标书内容',
  price DECIMAL(10, 2) NOT NULL COMMENT '报价金额（单位：元）',
  status ENUM('draft', 'submitted') DEFAULT 'draft' COMMENT '标书状态（草稿或已提交）',
  industry ENUM('建筑', '市政', '交通', '能源', '水利') NOT NULL COMMENT '所属行业',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE COMMENT '关联项目表',
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE COMMENT '关联用户表',
  INDEX idx_project_id (project_id) COMMENT '项目ID索引',
  INDEX idx_user_id (user_id) COMMENT '用户ID索引'
) COMMENT='标书表，存储用户提交的标书信息';