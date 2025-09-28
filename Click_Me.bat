@echo off
title GLITCH INJECTOR LAUNCHER

chcp 65001 >nul

echo Setting up environment...

cd /d "%~dp0stuff"

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
"[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; ^
[Console]::InputEncoding = [System.Text.Encoding]::UTF8; ^
$Host.UI.RawUI.WindowTitle = 'GLITCH INJECTOR'; ^
& '.\Glitcher.ps1'"

pause