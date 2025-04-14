$envFile = "d:\auto-bidding-app\src\services\backend\.env"
if (-not (Test-Path $envFile)) {
    Write-Host "错误：.env文件不存在" -ForegroundColor Red
    exit 1
}

# 检查关键配置项
$requiredVars = @("DB_HOST", "JWT_SECRET", "PORT")
foreach ($var in $requiredVars) {
    if (-not (Select-String -Path $envFile -Pattern "^$var=" -Quiet)) {
        Write-Host "警告：缺少必要配置 $var" -ForegroundColor Yellow
    }
}