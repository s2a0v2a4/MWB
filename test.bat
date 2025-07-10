@echo off
echo 🧪 Running NestJS Tests...
echo.

REM Environment-Variablen setzen
set NODE_ENV=test

echo 📝 Running Interest Controller Tests...
node_modules\.bin\jest --testPathPattern=interests.controller.spec.ts --verbose

echo.
echo 📝 Running All Tests...
node_modules\.bin\jest --passWithNoTests

pause
