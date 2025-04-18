# 清理旧进程
try {
    Get-Process | Where-Object { $_.Name -match 'node|react' } | Stop-Process -Force -ErrorAction Stop
} catch {
    Write-Host "进程清理时出错: $_" -ForegroundColor Yellow
}

# 检查并释放8082端口
$port = 8082
try {
    $process = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Select-Object OwningProcess -First 1
    if ($process) {
        Stop-Process -Id $process.OwningProcess -Force -ErrorAction Stop
        Start-Sleep -Seconds 2
    }
} catch {
    Write-Host "端口释放时出错: $_" -ForegroundColor Yellow
}

# 启动Metro（增加等待时间）
try {
    $metro = Start-Process -PassThru -NoNewWindow -FilePath "cmd" -ArgumentList "/c npx react-native start --port 8082"
    Start-Sleep -Seconds 5  # 增加等待确保服务完全启动
    if (-not $metro.HasExited) {
        Write-Host "Metro服务启动成功" -ForegroundColor Green
    } else {
        Write-Host "Metro服务意外退出" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "启动Metro失败: $_" -ForegroundColor Red
    exit 1
}

# 启动Android应用（增强结构检查）
try {
    $androidPath = "android"
    $requiredFiles = @(
        "gradlew.bat",
        "settings.gradle", 
        "app/build.gradle",
        "gradle/wrapper/gradle-wrapper.properties"
    )

    if (-not (Test-Path $androidPath)) {
        Write-Host "错误：项目缺少android目录" -ForegroundColor Red
        Write-Host "建议解决方案：" -ForegroundColor Yellow
        Write-Host "1. 运行：npx react-native init AutoBiddingApp --template react-native-template-typescript"
        Write-Host "2. 将现有代码迁移到新项目"
        exit 1
    }

    $missingFiles = @()
    foreach ($file in $requiredFiles) {
        $fullPath = Join-Path $androidPath $file
        if (-not (Test-Path $fullPath)) {
            $missingFiles += $file
        }
    }

    if ($missingFiles.Count -gt 0) {
        Write-Host "错误：缺少以下关键文件：" -ForegroundColor Red
        $missingFiles | ForEach-Object { Write-Host " - $_" }
        Write-Host "建议解决方案：" -ForegroundColor Yellow
        Write-Host "1. 删除android目录" 
        Write-Host "2. 运行：npx react-native eject"
        exit 1
    }
    
    $android = Start-Process -PassThru -NoNewWindow -FilePath "cmd" -ArgumentList "/c npx react-native run-android"
    if (-not $android.HasExited) {
        Write-Host "Android应用启动成功" -ForegroundColor Green
    }
} catch {
    Write-Host "启动Android应用失败: $_" -ForegroundColor Red
    exit 1
}