@echo off
title Payload Injector

:: This command reads the content of glitch_payload.js and pipes it to the clipboard.
type "glitch_payload.js" | clip

cls
echo.
echo   =================================================
echo         PAYLOAD COPIED TO CLIPBOARD
echo   =================================================
echo.
echo   The entire glitch script has been copied for you.
echo.
echo   [[ HOW TO USE ON A REAL WEBSITE ]]
echo.
echo   1. Navigate to your target website in your browser.
echo   2. Open Developer Tools (Press F12 or Ctrl+Shift+I).
echo   3. Go to the 'Console' tab.
echo   4. Click inside the console, paste the code (Ctrl+V), and press Enter.
echo.
echo.
echo   =================================================
echo.
pause