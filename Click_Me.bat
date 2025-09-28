@echo off
title GLITCH INJECTOR LAUNCHER
echo Setting up Unicode environment...

:: Set console to UTF-8
chcp 65001 >nul

:: Set PowerShell execution policy and encoding
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
"[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; ^
[Console]::InputEncoding = [System.Text.Encoding]::UTF8; ^
$Host.UI.RawUI.WindowTitle = 'GLITCH INJECTOR'; ^
& '.\Glitcher.ps1'"

pause