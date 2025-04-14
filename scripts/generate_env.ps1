$envTemplate = @"
# 自动生成的.env文件
# 最后生成时间: $(Get-Date)

# ======== 数据库配置 ========
DB_HOST=localhost
DB_PORT=27017
DB_NAME=auto_bidding_prod
DB_USER=admin_$(Get-Random -Minimum 1000 -Maximum 9999)
DB_PASS=$(-join ((33..126) | Get-Random -Count 16 | % {[char]$_}))

# ======== 应用安全配置 ========
APP_PORT=3000
JWT_SECRET=$(-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 64 | % {[char]$_}))
SESSION_SECRET=$(-join ((33..126) | Get-Random -Count 32 | % {[char]$_}))

# ======== 第三方服务 ========
# Stripe支付
STRIPE_PUB_KEY=pk_test_$(Get-Random -Minimum 100000 -Maximum 999999)
STRIPE_SECRET_KEY=sk_test_$(Get-Random -Minimum 100000 -Maximum 999999)

# 邮件服务
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=no-reply@auto-bidding.com
SMTP_PASS=$(-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 12 | % {[char]$_}))

# ======== 功能开关 ========
FEATURE_AUTO_BIDDING=true
FEATURE_EMAIL_VERIFY=false
"@

# 确保目录存在
New-Item -Path "d:\auto-bidding-app\src\services\backend" -ItemType Directory -Force | Out-Null
$envTemplate | Out-File "d:\auto-bidding-app\src\services\backend\.env" -Encoding utf8

Write-Host ".env文件已生成于 d:\auto-bidding-app\src\services\backend\.env" -ForegroundColor Green