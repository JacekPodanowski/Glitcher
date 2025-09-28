@echo off
setlocal enabledelayedexpansion

REM ####################################################################
REM ##                                                                ##
REM ##           "Final Masterpiece" Glitch Art Performance           ##
REM ##                     --- v13.0 BORDER FOCUSED ---               ##
REM ##                                                                ##
REM ##   NEW: Squares prefer border positions but occasionally drift  ##
REM ##   toward center, creating more realistic crash behavior.       ##
REM ##                                                                ##
REM ##          CLOSE THE WINDOW TO EXIT THE INFINITE LOOP.           ##
REM ##                                                                ##
REM ####################################################################

REM --- INITIAL SETUP ---
chcp 65001 > nul
for /f %%a in ('echo prompt $E^| cmd') do set "ESC=%%a"
set /a "width=80"
set /a "height=25"

REM --- Memory section names and error overlays ---
set "memory_sections=HEAP;STACK;CODE;DATA;KERNEL;USER;DRIVER;SYSTEM;MODULE;BUFFER"
set "overlay_errors=Access violation;Null pointer;Stack corruption;Buffer overflow;Heap corruption;Invalid handle;Permission denied;Resource leak;Deadlock detected"
set /a "section_count=10"
set /a "overlay_count=9"

REM --- Base memory address (will increment) ---
set /a "base_addr_high=0x40000000"
set /a "base_addr_low=0x1000"

REM ####################################################
REM ### PHASE 1: FAKE INITIALIZATION (Duration: ~10-15s) ###
REM ####################################################
cls
title System Initializing
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

REM --- Create 2-4 permanent squares with BORDER-BIASED positions ---
set /a "num_blocks = !random! %% 3 + 2"
for /l %%b in (1,1,!num_blocks!) do (
    REM --- 70% chance to spawn near borders, 30% chance for center area ---
    set /a "spawn_type = !random! * 100 / 32768"
    
    if !spawn_type! LSS 70 (
        REM --- Border spawn logic ---
        set /a "border_choice = !random! * 4 / 32768"
        if !border_choice! EQU 0 (
            REM --- Left border (x: -10 to 15) ---
            set /a "block%%b_base_x = !random! * 25 / 32768 - 10"
            set /a "block%%b_base_y = !random! * 20 / 32768 + 1"
        ) else if !border_choice! EQU 1 (
            REM --- Right border (x: 60 to 85) ---
            set /a "block%%b_base_x = !random! * 25 / 32768 + 60"
            set /a "block%%b_base_y = !random! * 20 / 32768 + 1"
        ) else if !border_choice! EQU 2 (
            REM --- Top border (y: -3 to 5) ---
            set /a "block%%b_base_x = !random! * 60 / 32768 + 5"
            set /a "block%%b_base_y = !random! * 8 / 32768 - 3"
        ) else (
            REM --- Bottom border (y: 18 to 27) ---
            set /a "block%%b_base_x = !random! * 60 / 32768 + 5"
            set /a "block%%b_base_y = !random! * 9 / 32768 + 18"
        )
    ) else (
        REM --- Center area spawn (30% chance) ---
        set /a "block%%b_base_x = !random! * 40 / 32768 + 20"
        set /a "block%%b_base_y = !random! * 12 / 32768 + 6"
    )
    
    set /a "block%%b_size = 35 + !random! %% 25"
    
    REM --- Set movement tendency: border squares tend to move toward center ---
    if !spawn_type! LSS 70 (
        set "block%%b_tendency=center"
    ) else (
        set "block%%b_tendency=border"
    )
)

REM --- Short crash intro ---
for /l %%t in (1,1,30) do (
    set /a "rand_y = !random! * %height% / 32768 + 1"
    set /a "rand_x = !random! * 50 / 32768 + 1"
    echo %ESC%[!rand_y!;!rand_x!Hising opernd
    ping localhost -n 1 -w 50 > nul
)

REM #########################################################
REM ### PHASE 3: INFINITE CHAOS WITH REALISTIC HEX DUMPS ###
REM #########################################################
cls
title Unresolved external symbol

REM --- Initialize the screen buffer for hex dumps ---
set "empty_line="
for /l %%i in (1,1,60) do set "empty_line=!empty_line! "
for /l %%i in (0,1,%height%) do set "screen_line_%%i=!empty_line!"

REM --- Initialize square strings ---
for /l %%b in (1,1,!num_blocks!) do (
    set "block%%b_str="
    for /l %%i in (1,1,!block%%b_size!) do set "block%%b_str=!block%%b_str! "
    set "block%%b_current_x=!block%%b_base_x!"
    set "block%%b_current_y=!block%%b_base_y!"
)

REM --- Full error message display timer ---
set /a "full_error_timer=0"
set "full_error_active=0"

:infinite_chaos_loop
    REM --- More frequent freeze chance (15% chance for 1-10 second freeze) ---
    set /a "freeze_chance = !random! * 100 / 32768"
    if !freeze_chance! LSS 15 (
        set /a "freeze_time = !random! * 10 / 32768 + 1"
        ping localhost -n !freeze_time! > nul
        
        REM --- 20% chance during freeze to spawn displaced restart process ---
        set /a "restart_chance = !random! * 100 / 32768"
        if !restart_chance! LSS 20 (
            REM --- Calculate random displacement ---
            set /a "disp_x = !random! * 30 / 32768 + 5"
            set /a "disp_y = !random! * 15 / 32768 + 2"
            
            REM --- Spawn displaced downloading process ---
            echo %ESC%[!disp_y!;!disp_x!HDownloading segment [1/7]...
            ping localhost -n 1 -w 300 > nul
            set /a "disp_y = !disp_y! + 1"
            if !disp_y! LEQ %height% echo %ESC%[!disp_y!;!disp_x!HDownloading segment [2/7]...
            ping localhost -n 1 -w 250 > nul
            set /a "disp_y = !disp_y! + 1"
            if !disp_y! LEQ %height% echo %ESC%[!disp_y!;!disp_x!HDownloading segment [3/7]...
            ping localhost -n 1 -w 200 > nul
            set /a "disp_y = !disp_y! + 1"
            if !disp_y! LEQ %height% echo %ESC%[!disp_y!;!disp_x!HDownloading segment [4/7]...
            ping localhost -n 1 -w 150 > nul
            set /a "disp_y = !disp_y! + 1"
            if !disp_y! LEQ %height% echo %ESC%[!disp_y!;!disp_x!HDownloading segment [5/7]...
            ping localhost -n 1 -w 100 > nul
            set /a "disp_y = !disp_y! + 1"
            if !disp_y! LEQ %height% echo %ESC%[!disp_y!;!disp_x!HDownloading segment [6/7]...
            ping localhost -n 1 -w 100 > nul
            set /a "disp_y = !disp_y! + 1"
            if !disp_y! LEQ %height% echo %ESC%[!disp_y!;!disp_x!HDownloading segment [7/7]...
            ping localhost -n 1 -w 100 > nul
            set /a "disp_y = !disp_y! + 1"
            if !disp_y! LEQ %height% echo %ESC%[!disp_y!;!disp_x!HAll segments downloaded.
            ping localhost -n 1 -w 200 > nul
            set /a "disp_y = !disp_y! + 1"
            if !disp_y! LEQ %height% echo %ESC%[!disp_y!;!disp_x!HLoading core modules...
            ping localhost -n 2 > nul
        )
    )

    REM --- ERASE old squares ---
    for /l %%b in (1,1,!num_blocks!) do (
        if defined block%%b_current_y (
            set /a "square_height = 8 + !random! %% 6"
            set /a "end_y = !block%%b_current_y! + !square_height!"
            if !end_y! GTR %height% set /a "end_y = %height%"
            
            for /l %%y in (!block%%b_current_y!,1,!end_y!) do (
                set /a "left_indent = !random! %% 3"
                set /a "right_reduce = !random! %% 4"
                set /a "line_width = !block%%b_size! - !right_reduce!"
                set /a "actual_x = !block%%b_current_x! + !left_indent!"
                
                set "erase_str="
                for /l %%i in (1,1,!line_width!) do set "erase_str=!erase_str! "
                echo %ESC%[%%y;!actual_x!H!erase_str!
            )
        )
    )

    REM --- Scroll hex dump buffer ---
    for /l %%i in (%height%,-1,1) do (
        set /a "prev_line_index = %%i - 1"
        if !prev_line_index! GEQ 0 (
            call set "line_content=%%screen_line_!prev_line_index!%%"
            set "screen_line_%%i=!line_content!"
        )
    )
    set "screen_line_0=!empty_line!"

    REM --- Generate realistic hex dump line ---
    set /a "hex_chance = !random! * 100 / 32768"
    if !hex_chance! LSS 60 (
        REM --- Generate memory address ---
        set /a "base_addr_low = !base_addr_low! + !random! * 32 / 32768 + 16"
        if !base_addr_low! GTR 0xFFFF (
            set /a "base_addr_high = !base_addr_high! + 0x1000"
            set /a "base_addr_low = !base_addr_low! - 0x10000"
        )
        
        REM --- Get random memory section ---
        set /a "section_idx = !random! * %section_count% / 32768"
        set "temp_sections=!memory_sections!"
        for /l %%i in (1,1,!section_idx!) do (
            for /f "tokens=1* delims=;" %%a in ("!temp_sections!") do set "temp_sections=%%b"
        )
        for /f "tokens=1* delims=;" %%a in ("!temp_sections!") do set "section_name=%%a"
        
        REM --- Generate hex data ---
        set "hex_data="
        for /l %%i in (1,1,8) do (
            set /a "hex_val = !random! * 256 / 32768"
            if !hex_val! LSS 16 ( set "hex_byte=0!hex_val!" ) else ( set "hex_byte=!hex_val!" )
            set "hex_data=!hex_data! !hex_byte!"
        )
        
        REM --- Create memory dump line ---
        set "memory_line=!section_name! 0x!base_addr_high!!base_addr_low! !hex_data!"
        set "screen_line_0=!memory_line!"
        
        REM --- 20% chance for error overlay on this line ---
        set /a "overlay_chance = !random! * 100 / 32768"
        if !overlay_chance! LSS 20 (
            set /a "overlay_idx = !random! * %overlay_count% / 32768"
            set "temp_overlays=!overlay_errors!"
            for /l %%i in (1,1,!overlay_idx!) do (
                for /f "tokens=1* delims=;" %%a in ("!temp_overlays!") do set "temp_overlays=%%b"
            )
            for /f "tokens=1* delims=;" %%a in ("!temp_overlays!") do set "overlay_text=%%a"
            
            REM --- Random position for overlay ---
            set /a "overlay_pos = !random! * 25 / 32768 + 20"
            call set "before_overlay=%%screen_line_0:~0,!overlay_pos!%%"
            
            REM --- 30% chance for stacked overlays (2-3 times) ---
            set /a "stack_chance = !random! * 100 / 32768"
            if !stack_chance! LSS 30 (
                set "screen_line_0=!before_overlay!%ESC%[30;47m!overlay_text!%ESC%[0m %ESC%[30;47m!overlay_text!%ESC%[0m"
                REM --- 10% chance for triple stack ---
                set /a "triple_chance = !random! * 100 / 32768"
                if !triple_chance! LSS 10 (
                    set "screen_line_0=!screen_line_0! %ESC%[30;47m!overlay_text!%ESC%[0m"
                )
            ) else (
                set "screen_line_0=!before_overlay!%ESC%[30;47m!overlay_text!%ESC%[0m"
            )
        )
    )

    REM --- More frequent full error messages at bottom ---
    set /a "full_error_timer = !full_error_timer! + 1"
    if !full_error_timer! GTR 50 (
        if !full_error_active! EQU 0 (
            set "full_error_active=1"
            set /a "full_error_timer=0"
            REM --- Randomize error message type ---
            set /a "error_type = !random! * 3 / 32768"
            if !error_type! EQU 0 (
                echo %ESC%[23;1H%ESC%[41;37m EXCEPTION: Access violation reading location 0x00000000               %ESC%[0m
                echo %ESC%[24;1H%ESC%[41;37m The instruction at 0x7FF123456789 referenced memory at 0x00000000    %ESC%[0m
                echo %ESC%[25;1H%ESC%[41;37m The memory could not be read. Click OK to terminate the application.  %ESC%[0m
            ) else if !error_type! EQU 1 (
                echo %ESC%[23;1H%ESC%[41;37m FATAL ERROR: Stack buffer overflow detected                            %ESC%[0m
                echo %ESC%[24;1H%ESC%[41;37m Program: C:\Windows\System32\svchost.exe                             %ESC%[0m
                echo %ESC%[25;1H%ESC%[41;37m A buffer overrun has been detected which has corrupted the stack.     %ESC%[0m
            ) else (
                echo %ESC%[23;1H%ESC%[41;37m KERNEL PANIC: Unable to handle kernel paging request                  %ESC%[0m
                echo %ESC%[24;1H%ESC%[41;37m at virtual address 0xc0000000                                        %ESC%[0m
                echo %ESC%[25;1H%ESC%[41;37m Oops: 0002 [1] PREEMPT SMP                                           %ESC%[0m
            )
        )
    )
    if !full_error_timer! GTR 20 if !full_error_active! EQU 1 (
        set "full_error_active=0"
        set /a "full_error_timer=0"
        REM --- Clear the error message area ---
        echo %ESC%[23;1H                                                                                
        echo %ESC%[24;1H                                                                                
        echo %ESC%[25;1H                                                                                
    )

    REM --- Calculate NEW positions for squares with BIAS TOWARD MOVEMENT ---
    for /l %%b in (1,1,!num_blocks!) do (
        REM --- Strong shake effect ---
        set /a "shake_x = !random! %% 11 - 5"
        set /a "shake_y = !random! %% 7 - 3"
        
        REM --- Biased drift based on tendency ---
        set /a "drift_chance = !random! %% 100"
        if !drift_chance! LSS 15 (
            call set "tendency=%%block%%b_tendency%%"
            if "!tendency!"=="center" (
                REM --- Border squares drift toward center (40x12 area) ---
                set /a "center_x = 40"
                set /a "center_y = 12"
                set /a "current_x = !block%%b_base_x!"
                set /a "current_y = !block%%b_base_y!"
                
                if !current_x! LSS !center_x! ( set /a "drift_x = 1 + !random! %% 3" ) else ( set /a "drift_x = -1 - !random! %% 3" )
                if !current_y! LSS !center_y! ( set /a "drift_y = 1 + !random! %% 2" ) else ( set /a "drift_y = -1 - !random! %% 2" )
                
                REM --- 25% chance to switch tendency to border ---
                set /a "switch_chance = !random! * 100 / 32768"
                if !switch_chance! LSS 25 set "block%%b_tendency=border"
                
            ) else (
                REM --- Center squares drift toward borders ---
                set /a "border_choice = !random! * 4 / 32768"
                if !border_choice! EQU 0 ( set /a "drift_x = -2 - !random! %% 3" )
                if !border_choice! EQU 1 ( set /a "drift_x = 2 + !random! %% 3" )
                if !border_choice! EQU 2 ( set /a "drift_y = -1 - !random! %% 2" )
                if !border_choice! EQU 3 ( set /a "drift_y = 1 + !random! %% 2" )
                
                REM --- 20% chance to switch tendency to center ---
                set /a "switch_chance = !random! * 100 / 32768"
                if !switch_chance! LSS 20 set "block%%b_tendency=center"
            )
            
            set /a "block%%b_base_x = !block%%b_base_x! + !drift_x!"
            set /a "block%%b_base_y = !block%%b_base_y! + !drift_y!"
            
            REM --- Allow extensive off-screen positioning ---
            if !block%%b_base_x! LSS -25 set /a "block%%b_base_x = 90"
            if !block%%b_base_x! GTR 95 set /a "block%%b_base_x = -20"
            if !block%%b_base_y! LSS -5 set /a "block%%b_base_y = 28"
            if !block%%b_base_y! GTR 30 set /a "block%%b_base_y = -4"
        )
        
        set /a "block%%b_current_x = !block%%b_base_x! + !shake_x!"
        set /a "block%%b_current_y = !block%%b_base_y! + !shake_y!"
    )

    REM --- DRAW the squares at new positions ---
    for /l %%b in (1,1,!num_blocks!) do (
        set /a "square_height = 8 + !random! %% 6"
        set /a "end_y = !block%%b_current_y! + !square_height!"
        if !end_y! GTR %height% set /a "end_y = %height%"
        
        if !block%%b_current_y! LEQ %height% if !end_y! GTR 0 (
            set /a "start_y = !block%%b_current_y!"
            if !start_y! LSS 1 set /a "start_y = 1"
            
            for /l %%y in (!start_y!,1,!end_y!) do (
                set /a "left_indent = !random! %% 3"
                set /a "right_reduce = !random! %% 4"
                set /a "line_width = !block%%b_size! - !right_reduce!"
                set /a "actual_x = !block%%b_current_x! + !left_indent!"
                
                if !actual_x! GTR -30 if !actual_x! LSS 110 (
                    set "draw_str="
                    for /l %%i in (1,1,!line_width!) do set "draw_str=!draw_str! "
                    echo %ESC%[%%y;!actual_x!H%ESC%[47m!draw_str!%ESC%[0m
                )
            )
        )
    )

    REM --- Render the screen: FATAL_ERROR on left, hex dumps on right ---
    for /l %%i in (1,1,22) do (
        echo %ESC%[%%i;1H%ESC%[37mFATAL_ERROR  !screen_line_%%i!
    )

    REM --- Animation delay ---
    ping localhost -n 1 -w 90 > nul
goto infinite_chaos_loop