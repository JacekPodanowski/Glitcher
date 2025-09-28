@echo off

chcp 65001 >nul

cd /d "%~dp0stuff"

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
"[Console]::OutputEncoding = [System.Text.Encoding]::UTF8; ^
[Console]::InputEncoding = [System.Text.Encoding]::UTF8; ^
$Host.UI.RawUI.WindowTitle = '_#_#_#_#_#_#_#_#_#_#_#_#_#_#_#_#______________________GLTT777CH_111NJ3CTOR______________________#_#_#_#_#_#_#_#_#_#_#_#_#_'; ^
& '.\Glitcher.ps1'"

pause