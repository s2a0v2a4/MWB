# start-dev.ps1 - PowerShell Script für Development-Start
Write-Host "🚀 Starting NestJS Backend in Development Mode..." -ForegroundColor Green

# Environment-Variablen setzen
$env:NODE_ENV = "development"
$env:PORT = "5000"
$env:FRONTEND_URL = "http://localhost:3000"
$env:CORS_ORIGINS = "http://localhost:3000,http://127.0.0.1:3000"
$env:LOG_LEVEL = "debug"

Write-Host "📝 Environment Variables:" -ForegroundColor Yellow
Write-Host "   NODE_ENV: $env:NODE_ENV"
Write-Host "   PORT: $env:PORT"
Write-Host "   FRONTEND_URL: $env:FRONTEND_URL"
Write-Host "   CORS_ORIGINS: $env:CORS_ORIGINS"
Write-Host ""

# NestJS starten
npx nest start --watch
