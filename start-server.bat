@echo off
echo ===================================================
echo   Starting OOADCRAFT Local Backend & Cloudflare Tunnel
echo ===================================================
echo.

echo 1. Starting Spring Boot Backend (Port 8080)...
start "OOADCRAFT Backend" cmd /k "cd /d D:\ooadcraft\backend && java -jar target\ooadcraft-backend-0.0.1-SNAPSHOT.jar"

timeout /t 5 /nobreak >nul

echo 2. Starting Cloudflare Tunnel...
start "Cloudflare Tunnel" cmd /k "cd /d D:\ooadcraft && .\cloudflared.exe tunnel --url http://localhost:8080"

echo.
echo ===================================================
echo   Server and Tunnel are now running!
echo   Vercel site: https://ooad-craft.vercel.app
echo ===================================================
pause
