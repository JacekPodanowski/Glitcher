@echo off
setlocal enabledelayedexpansion

REM ####################################################################
REM ##                                                                ##
REM ##           "Final Masterpiece" Glitch Art Performance           ##
REM ##                     --- v10.0 ULTIMATE ---                     ##
REM ##                                                                ##
REM ##   NEW FEATURES: Bigger rough squares that never disappear,     ##
REM ##   infinite shaking, partial off-screen flight, chaotic logs,   ##
REM ##   and random freezes during chaos phase for realism.           ##
REM ##                                                                ##
REM ##          CLOSE THE WINDOW TO EXIT THE INFINITE LOOP.           ##
REM ##                                                                ##
REM ####################################################################

REM --- INITIAL SETUP ---
chcp 65001 > nul
for /f %%a in ('echo prompt $E^| cmd') do set "ESC=%%a"
set /a "width=80"
set /a "height=25"

REM --- Create the Curated "Table" of Error Messages ---
set "error_table=Access is denied;Object reference not set;undefined is not a function;Segmentation fault;Null pointer exception;Access violation;Index out of bounds;Unresolved external symbol;Stack overflow;Invalid memory reference;process terminated;FATAL_ERROR;wtf is this;downloading core;memory corruption;buffer overflow;illegal instruction;bus error;core dumped"
set /a "error_count=19"

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
echo Loading core modules...
ping localhost -n 6 > nul

REM ##############################################
REM ### PHASE 2: INITIAL CRASH SETUP (Duration: 3s) ###
REM ##############################################
cls
title General protection fault
set /a "crash_line_y=1"

REM --- Create 2-4 permanent squares with base positions ---
set /a "num_blocks = !random! %% 3 + 2"
for /l %%b in (1,1,!num_blocks!) do (
    set /a "block%%b_base_x = !random! * 60 / 32768 + 5"
    set /a "block%%b_base_y = !random! * 15 / 32768 + 2"
    set /a "block%%b_size = 35 + !random! %% 25"
)

REM --- Short crash intro ---
for /l %%t in (1,1,30) do (
    set /a "rand_y = !random! * %height% / 32768 + 1"
    set /a "rand_x = !random! * 50 / 32768 + 1"
    echo %ESC%[!rand_y!;!rand_x!Hising opernd
    ping localhost -n 1 -w 50 > nul
)

REM #########################################################
REM ### PHASE 3: INFINITE CHAOS WITH PERSISTENT SQUARES ###
REM #########################################################
cls
title Unresolved external symbol

REM --- Initialize the screen buffer for logs ---
set "empty_line="
for /l %%i in (1,1,%width%) do set "empty_line=!empty_line! "
for /l %%i in (0,1,%height%) do set "screen_line_%%i=!empty_line!"

REM --- Initialize square strings to prevent errors ---
for /l %%b in (1,1,!num_blocks!) do (
    set "block%%b_str="
    for /l %%i in (1,1,!block%%b_size!) do set "block%%b_str=!block%%b_str! "
    set "block%%b_current_x=!block%%b_base_x!"
    set "block%%b_current_y=!block%%b_base_y!"
)

:infinite_chaos_loop
    REM --- Random freeze chance (5% chance for 1-5 second freeze) ---
    set /a "freeze_chance = !random! * 100 / 32768"
    if !freeze_chance! LSS 5 (
        set /a "freeze_time = !random! * 5 / 32768 + 1"
        ping localhost -n !freeze_time! > nul
    )

    REM --- ERASE old squares ---
    for /l %%b in (1,1,!num_blocks!) do (
        if defined block%%b_current_y (
            REM --- Create rough edges by varying the square height ---
            set /a "square_height = 8 + !random! %% 6"
            set /a "end_y = !block%%b_current_y! + !square_height!"
            if !end_y! GTR %height% set /a "end_y = %height%"
            
            for /l %%y in (!block%%b_current_y!,1,!end_y!) do (
                REM --- Make rough left and right edges ---
                set /a "left_indent = !random! %% 3"
                set /a "right_reduce = !random! %% 4"
                set /a "line_width = !block%%b_size! - !right_reduce!"
                set /a "actual_x = !block%%b_current_x! + !left_indent!"
                
                REM --- Erase with spaces ---
                set "erase_str="
                for /l %%i in (1,1,!line_width!) do set "erase_str=!erase_str! "
                echo %ESC%[%%y;!actual_x!H!erase_str!
            )
        )
    )

    REM --- Scroll and update the log buffer ---
    for /l %%i in (%height%,-1,1) do (
        set /a "prev_line_index = %%i - 1"
        if !prev_line_index! GEQ 0 (
            call set "line_content=%%screen_line_!prev_line_index!%%"
            set "screen_line_%%i=!line_content!"
        )
    )
    set "screen_line_0=!empty_line!"

    REM --- 30% chance to add new error message ---
    set /a "error_chance = !random! * 100 / 32768"
    if !error_chance! LSS 30 (
        set /a "text_index = !random! * %error_count% / 32768"
        set "temp_errors=!error_table!"
        for /l %%i in (1,1,!text_index!) do (
            for /f "tokens=1* delims=;" %%a in ("!temp_errors!") do set "temp_errors=%%b"
        )
        for /f "tokens=1* delims=;" %%a in ("!temp_errors!") do set "error_text=%%a"
        
        set /a "rand_x = !random! * 35 / 32768 + 15"
        set /a "style_chance = !random! * 100 / 32768"
        if !style_chance! LSS 25 (
            set "error_string=%ESC%[30;47m!error_text!%ESC%[0m"
        ) else (
            set "error_string=%ESC%[37;40m!error_text!%ESC%[0m"
        )
        
        set "line=!screen_line_0!"
        if !rand_x! LSS 75 (
            call set "before=%%line:~0,!rand_x!%%"
            set "screen_line_0=!before!!error_string!"
        )
    )

    REM --- Calculate NEW positions for squares (with shake and drift) ---
    for /l %%b in (1,1,!num_blocks!) do (
        REM --- Strong shake effect ---
        set /a "shake_x = !random! %% 11 - 5"
        set /a "shake_y = !random! %% 7 - 3"
        
        REM --- Slow drift that can go off-screen ---
        set /a "drift_chance = !random! %% 100"
        if !drift_chance! LSS 10 (
            set /a "drift_x = !random! %% 7 - 3"
            set /a "drift_y = !random! %% 5 - 2"
            set /a "block%%b_base_x = !block%%b_base_x! + !drift_x!"
            set /a "block%%b_base_y = !block%%b_base_y! + !drift_y!"
            
            REM --- Allow partial off-screen positioning ---
            if !block%%b_base_x! LSS -15 set /a "block%%b_base_x = 70"
            if !block%%b_base_x! GTR 85 set /a "block%%b_base_x = -10"
            if !block%%b_base_y! LSS -3 set /a "block%%b_base_y = 20"
            if !block%%b_base_y! GTR 25 set /a "block%%b_base_y = -2"
        )
        
        set /a "block%%b_current_x = !block%%b_base_x! + !shake_x!"
        set /a "block%%b_current_y = !block%%b_base_y! + !shake_y!"
    )

    REM --- DRAW the squares at new positions ---
    for /l %%b in (1,1,!num_blocks!) do (
        set /a "square_height = 8 + !random! %% 6"
        set /a "end_y = !block%%b_current_y! + !square_height!"
        if !end_y! GTR %height% set /a "end_y = %height%"
        
        REM --- Only draw if at least partially on screen ---
        if !block%%b_current_y! LEQ %height% if !end_y! GTR 0 (
            set /a "start_y = !block%%b_current_y!"
            if !start_y! LSS 1 set /a "start_y = 1"
            
            for /l %%y in (!start_y!,1,!end_y!) do (
                REM --- Create rough edges ---
                set /a "left_indent = !random! %% 3"
                set /a "right_reduce = !random! %% 4"
                set /a "line_width = !block%%b_size! - !right_reduce!"
                set /a "actual_x = !block%%b_current_x! + !left_indent!"
                
                REM --- Only draw if x position is somewhat reasonable ---
                if !actual_x! GTR -20 if !actual_x! LSS 100 (
                    set "draw_str="
                    for /l %%i in (1,1,!line_width!) do set "draw_str=!draw_str! "
                    echo %ESC%[%%y;!actual_x!H%ESC%[47m!draw_str!%ESC%[0m
                )
            )
        )
    )

    REM --- Render the scrolling log background ---
    for /l %%i in (1,1,%height%) do (
        echo %ESC%[%%i;1H%ESC%[37mFATAL_ERROR !screen_line_%%i!
    )

    REM --- Animation delay ---
    ping localhost -n 1 -w 80 > nul
goto infinite_chaos_loop