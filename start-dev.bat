@echo off
echo 🚀 Starting NestJS Backend in Development Mode...

REM Environment-Variablen setzen
set NODE_ENV=development
set PORT=5000
set FRONTEND_URL=http://localhost:3000
set CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
set LOG_LEVEL=debug

echo 📝 Environment Variables:
echo    NODE_ENV: %NODE_ENV%
echo    PORT: %PORT%
echo    FRONTEND_URL: %FRONTEND_URL%
echo    CORS_ORIGINS: %CORS_ORIGINS%
echo.

REM NestJS starten
npx nest start --watch
