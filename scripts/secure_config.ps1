# 设置文件权限
icacls "d:\auto-bidding-app\.env" /inheritance:r /grant:r "Administrator:(R,W)"
icacls "d:\auto-bidding-app\src\services\backend\.env" /inheritance:r /grant:r "Administrator:(R,W)"

# 备份.env文件
$backupDir = "d:\auto-bidding-app\backups\env_$(Get-Date -Format 'yyyyMMdd')"
mkdir $backupDir -Force
Copy-Item "d:\auto-bidding-app\src\services\backend\.env" $backupDir