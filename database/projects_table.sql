CREATE TABLE projects (
  id INT PRIMARY KEY AUTO_INCREMENT COMMENT '项目ID',
  name VARCHAR(255) NOT NULL COMMENT '项目名称',
  description TEXT COMMENT '项目描述',
  budget DECIMAL(12, 2) NOT NULL COMMENT '项目预算（单位：元）',
  deadline DATE NOT NULL COMMENT '项目截止日期',
  industry ENUM('建筑', '市政', '交通', '能源', '水利') NOT NULL COMMENT '所属行业',
  status ENUM('open', 'closed') DEFAULT 'open' COMMENT '项目状态（开放或关闭）',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_industry (industry) COMMENT '行业索引',
  INDEX idx_status (status) COMMENT '状态索引'
) COMMENT='项目表，存储所有项目信息';