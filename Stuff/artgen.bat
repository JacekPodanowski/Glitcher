@echo off
setlocal enabledelayedexpansion

REM ####################################################################
REM ##                                                                ##
REM ##           "System Failure" Art Performance - v5 FINAL          ##
REM ##                 --- 100% STABLE & CRASH-PROOF ---              ##
REM ##                                                                ##
REM ##   Features a realistic startup with longer, randomized delays, ##
REM ##   a high-impact 5s crash with large, morphing memory blocks,   ##
REM ##   and a redesigned, stable "logging" art loop that runs forever.##
REM ##                                                                ##
REM ##          CLOSE THE WINDOW TO EXIT THE INFINITE LOOP.           ##
REM ##                                                                ##
REM ####################################################################

REM --- INITIAL SETUP ---
chcp 65001 > nul
for /f %%a in ('echo prompt $E^| cmd') do set "ESC=%%a"
set /a "width=80"
set /a "height=25"

REM ####################################################
REM ### PHASE 1: FAKE INITIALIZATION (Duration: ~10-15s) ###
REM ####################################################
cls
title System Initializing
echo System Integrity Check... OK
ping localhost -n 2 > nul
echo Connecting to update server... OK
ping localhost -n 2 > nul
for /l %%i in (1,1,7) do (
    echo Downloading segment [%%i/7]...
    set /a "delay = !random! * 900 / 32768 + 100"
    ping localhost -n 1 -w !delay! > nul
)
echo All segments downloaded.
ping localhost -n 2 > nul
<nul set /p "=Loading core modules..."
ping localhost -n 6 > nul

REM ##############################################
REM ### PHASE 2: THE MONOCHROME CRASH (Duration: 5s) ###
REM ##############################################
cls
title General protection fault
<nul set /p "=%ESC%[?25l"
set /a "crash_line_y=1"
set "block1_str=" & set "block2_str="
set "space_str= "

for /l %%t in (1,1,50) do (
    REM --- Clear previous frame's blocks ---
    for /l %%y in (!block1_y!,1,!block1_end_y!) do <nul set /p "=%ESC%[%%y;!block1_x!H!block1_str!"
    for /l %%y in (!block2_y!,1,!block2_end_y!) do <nul set /p "=%ESC%[%%y;!block2_x!H!block2_str!"

    REM --- Draw cascading error text on the left ---
    <nul set /p "=%ESC%[!crash_line_y!;1Hising opernd      "
    set /a "crash_line_y+=1"
    if !crash_line_y! GTR %height% set /a "crash_line_y=1"

    REM --- Calculate new glitchy block positions and sizes ---
    set /a "block1_w = 20 + !random! %% 20"
    set /a "block1_h = 5 + !random! %% 7"
    set /a "block1_x = 10 + !random! %% 10"
    set /a "block1_y = 2 + !random! %% 5"
    set /a "block1_end_y = block1_y + block1_h"

    set /a "block2_w = 25 + !random! %% 15"
    set /a "block2_h = 8 + !random! %% 6"
    set /a "block2_x = 45 + !random! %% 10"
    set /a "block2_y = 10 + !random! %% 5"
    set /a "block2_end_y = block2_y + block2_h"

    REM --- Generate the block strings ---
    set "block1_str=" & for /l %%i in (1,1,!block1_w!) do set "block1_str=!block1_str!%space_str%"
    set "block2_str=" & for /l %%i in (1,1,!block2_w!) do set "block2_str=!block2_str!%space_str%"

    REM --- Draw new blocks ---
    for /l %%y in (!block1_y!,1,!block1_end_y!) do <nul set /p "=%ESC%[%%y;!block1_x!H%ESC%[47m!block1_str!%ESC%[0m"
    for /l %%y in (!block2_y!,1,!block2_end_y!) do <nul set /p "=%ESC%[%%y;!block2_x!H%ESC%[47m!block2_str!%ESC%[0m"

    ping localhost -n 1 -w 100 > nul
)

REM #########################################################
REM ### PHASE 3: THE LOGGING AFTERMATH (Duration: Infinite) ###
REM #########################################################
cls
title Unresolved external symbol
set "error_table=Missing operand;Access is denied.;Object reference not set;undefined is not a function;Segmentation fault;Null pointer exception;Access violation;Index out of bounds;Unresolved external symbol;Stack overflow;Invalid memory reference;[process terminated];FATAL_ERROR;wtf is this;...;tf is this"
set /a "error_count=16"

:main_loop
    REM --- Decide what to do: Draw a new error or clear the screen? ---
    set /a "action_chance = !random! * 100 / 32768"

    if !action_chance! LSS 80 (
        REM --- DRAW A NEW ERROR MESSAGE ---
        set /a "text_index = !random! * %error_count% / 32768"
        set "temp_errors=!error_table!"
        for /l %%i in (1,1,!text_index!) do ( for /f "tokens=1* delims=;" %%a in ("!temp_errors!") do set "temp_errors=%%b" )
        for /f "tokens=1* delims=;" %%a in ("!temp_errors!") do set "error_text=%%a"

        set /a "rand_x = !random! * 60 / 32768 + 2"
        set /a "rand_y = !random! * %height% / 32768 + 1"
        set /a "rand_color = !random! * 60 / 32768 + 160"

        REM Style is now exclusively black text on a random colorful background
        <nul set /p "=%ESC%[!rand_y!;!rand_x!H%ESC%[38;5;16m%ESC%[48;5;!rand_color!m !error_text! %ESC%[0m"

    ) else (
        REM --- CLEAR THE SCREEN to simulate a log refresh/failure ---
        cls
    )

    REM Slow down the entire process for an atmospheric pace
    ping localhost -n 1 -w 200 > nul
goto main_loop