$EffectLibrary = ".\glitch_effects.js"
$OutputFile = "final_glitch_payload.js"
$TestPage = ".\Test_page.html"

$ArtgenScriptPath = Join-Path $PSScriptRoot "artgen.bat"
$username = $env:USERNAME

function Write-Glitchy {
    param(
        [string]$Text,
        [int]$LineDelay = 20,
        [switch]$IsLogo
    )
    
    $consoleWidth = try { $Host.UI.RawUI.WindowSize.Width } catch { 80 }

    if ($IsLogo) {
        $glitchColors = @('DarkGray')
        
        $Text.ToCharArray() | ForEach-Object {
            $char = $_
            
            if ((Get-Random -Minimum 1 -Maximum 100) -le 7) {
                $glitchLines = Get-Random -Minimum 2 -Maximum 5

                for ($i = 0; $i -lt $glitchLines; $i++) {
                    $currentPos = [Console]::CursorTop
                    $currentLeft = [Console]::CursorLeft
                    
                    $glitchLeft = Get-Random -Minimum 0 -Maximum $consoleWidth
                    $glitchTop = $currentPos + (Get-Random -Minimum 4 -Maximum 12)
                    [Console]::SetCursorPosition($glitchLeft, $glitchTop)
                                        
                    if ((Get-Random -Minimum 1 -Maximum 2) -eq 1) {
                        $burstColor = Get-Random $glitchColors
                        $burstLength = Get-Random -Minimum 4 -Maximum 10
                        $glitchChars = @('#', '@', '%', '&', '*', '+', '=', '-', '_', '~', '|', '\', '/')
                        for ($j = 0; $j -lt $burstLength; $j++) {
                            $glitchChar = Get-Random $glitchChars
                            Write-Host -NoNewline $glitchChar -ForegroundColor $burstColor
                        }
                    }
                    else {
                        $burstLength = Get-Random -Minimum 6 -Maximum 12
                        for ($j = 0; $j -lt $burstLength; $j++) {
                            Write-Host -NoNewline " "
                        }
                    }
                    
                    [Console]::SetCursorPosition($currentLeft, $currentPos)
                }
                
                Start-Sleep -Milliseconds (Get-Random -Minimum 40 -Maximum 80)
            }
            
            if ($char -eq ' ') {
                Write-Host -NoNewline $char
            }
            else {
                Write-Host -NoNewline $char
                Start-Sleep -Milliseconds (Get-Random -Minimum 5 -Maximum 15)
            }
        }
    }
    else {
        $Text.ToCharArray() | ForEach-Object {
            Write-Host -NoNewline $_
            Start-Sleep -Milliseconds (Get-Random -Minimum 2 -Maximum 8)
        }
    }
    
    Write-Host ""
    Start-Sleep -Milliseconds $LineDelay
}

function Write-Centered {
    param(
        [string]$Text,
        [switch]$IsLogo
    )
    
    $consoleWidth = try { $Host.UI.RawUI.WindowSize.Width } catch { 80 }
    $padding = [math]::Max(0, ($consoleWidth - $Text.Length) / 2)
    $centeredText = (" " * [math]::Floor($padding)) + $Text
    
    if ($IsLogo) {
        Write-Glitchy -Text $centeredText -IsLogo
    }
    else {
        Write-Glitchy -Text $centeredText
    }
}

Clear-Host
$protectedRows = [System.Collections.Generic.List[int]]::new()
Write-Host ""
Write-Host ""

$logoText1 = "GLITCH INJECTOR"
$logoText3 = "  6l17ch 7h3 fuck 0u7 0f 7h3m  "
$maxLength = $logoText3.Length
$padding1 = [math]::Max(0, ($maxLength - $logoText1.Length)) / 2
$leftPadding1 = " " * [math]::Floor($padding1)
$rightPadding1 = " " * [math]::Ceiling($padding1)
$centeredText1 = $leftPadding1 + $logoText1 + $rightPadding1
$line2Content = [string]([char]0x2591) * $maxLength
$border = [char]0x2588 + [char]0x2593 + [char]0x2592 + [char]0x2591
$reverseBorder = [char]0x2591 + [char]0x2592 + [char]0x2593 + [char]0x2588
$logoLine1 = $border + $centeredText1 + $reverseBorder
$logoLine2 = $border + $line2Content + $reverseBorder
$logoLine3 = $border + $logoText3 + $reverseBorder
$protectedRows.Add([Console]::CursorTop); Write-Centered -Text $logoLine1 -IsLogo
$protectedRows.Add([Console]::CursorTop); Write-Centered -Text $logoLine2 -IsLogo
$protectedRows.Add([Console]::CursorTop); Write-Centered -Text $logoLine3 -IsLogo

Write-Host ""
Write-Host ""
$protectedRows.Add([Console]::CursorTop); Write-Centered -Text "> [ 1 ] Generate Payload for REAL WEBSITE"
$protectedRows.Add([Console]::CursorTop); Write-Centered -Text "> [ 2 ] Generate Payload for LOCAL TESTING"
Write-Host ""

$consoleWidth = try { $Host.UI.RawUI.WindowSize.Width } catch { 80 }
$promptPadding = " " * [math]::Floor(($consoleWidth - 20) / 2)
Write-Host -NoNewline "${promptPadding}Select_Mode [1-2]: "
$promptCursorLeft = [Console]::CursorLeft
$promptCursorTop = [Console]::CursorTop
$protectedRows.Add($promptCursorTop)

# --- Check for artgen.bat before starting the loop
if (-not (Test-Path $ArtgenScriptPath)) {
    $warningMessage = "WARNING: '$ArtgenScriptPath' not found. Vandal mode visuals will not run."
    $warningPadding = " " * [math]::Floor(($consoleWidth - $warningMessage.Length) / 2)
    Write-Host "`n${warningPadding}$warningMessage" -ForegroundColor Yellow
    [Console]::SetCursorPosition($promptCursorLeft, $promptCursorTop)
}

$idleMessages = @(
    "Yo, $username, d0 s0meth_ing",
    "-_- -_- -_- -_- -_- -_-",
    "hot stuff here: ", 
    "im gett1ng sooo borr333d",
    "i will just d0 s0me rand0m shit, ok?",
    "w3o w3o w3o w3o w3o w3o w3o"
)
$idleMessageIndex = 0 
$vandalModeActive = $false 
$timeOfLastArtgenLaunch = [datetime]::MinValue
$stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
$choice = ""
$idleTriggerSeconds = 5
$postMessageDelaySeconds = 5
$timeOfLastMessageEnd = [datetime]::MinValue

# --- SIMPLIFIED AND CORRECTED INPUT LOOP ---
while ($true) {
    if ($Host.UI.RawUI.KeyAvailable) {
        $key = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
        
        # Only process the "key down" event to prevent double-reads
        if (-not $key.KeyDown) { continue }

        # If user presses 1 or 2, set the choice, display it, and immediately break.
        if ($key.Character -eq '1' -or $key.Character -eq '2') {
            $choice = $key.Character
            Write-Host -NoNewline $key.Character
            Write-Host "" # Move to the next line cleanly
            break 
        }
        
        # Reset the idle timer for any other key press
        $stopwatch.Restart()
        $timeOfLastMessageEnd = [datetime]::MinValue
    }

    # This idle/vandal logic only runs if no valid key has been pressed yet
    if ($vandalModeActive) {
        $inputCursorLeft = [Console]::CursorLeft; $inputCursorTop = [Console]::CursorTop
        do { $randTop = Get-Random -Minimum 0 -Maximum ($Host.UI.RawUI.WindowSize.Height - 1) } while ($protectedRows -contains $randTop)
        [Console]::SetCursorPosition((Get-Random -Minimum 0 -Maximum ($consoleWidth - 4)), $randTop)
        Write-Host -NoNewline "w3o " -ForegroundColor DarkGray
        if (((Get-Date) - $timeOfLastArtgenLaunch).TotalSeconds -ge 3) {
            try {
                if (Test-Path $ArtgenScriptPath) {
                    Start-Process -FilePath $ArtgenScriptPath -ErrorAction SilentlyContinue
                    $timeOfLastArtgenLaunch = Get-Date
                }
            } catch {}
        }
        [Console]::SetCursorPosition($inputCursorLeft, $inputCursorTop)
    }
    else {
        $isIdle = $stopwatch.Elapsed.TotalSeconds -gt $idleTriggerSeconds
        $canWriteNewMessage = (Get-Date) - $timeOfLastMessageEnd | ForEach-Object { $_.TotalSeconds -gt $postMessageDelaySeconds }
        if ($isIdle -and $canWriteNewMessage) {
            $inputCursorLeft = [Console]::CursorLeft; $inputCursorTop = [Console]::CursorTop
            $message = $idleMessages[$idleMessageIndex]
            if ($idleMessageIndex -eq 2) {
                try {
                    $desktopPath = [Environment]::GetFolderPath('Desktop'); $randomFolder = Get-ChildItem -Path $desktopPath -Directory -ErrorAction SilentlyContinue | Get-Random
                    $message += if ($null -ne $randomFolder) { "'$($randomFolder.FullName)'" } else { " your Desktop.. so clean.." }
                } catch { $message = "i can't.. see.. anything.." }
            }
            do { $randTop = Get-Random -Minimum 0 -Maximum ($Host.UI.RawUI.WindowSize.Height - 1) } while ($protectedRows -contains $randTop)
            [Console]::SetCursorPosition((Get-Random -Minimum 0 -Maximum ($consoleWidth - $message.Length)), $randTop)
            $message.ToCharArray() | ForEach-Object { Write-Host -NoNewline $_ -ForegroundColor DarkGray; Start-Sleep -Milliseconds (Get-Random -Minimum 40 -Maximum 120) }
            if ($idleMessageIndex -ge ($idleMessages.Count - 1)) {
                $vandalModeActive = $true
                $timeOfLastArtgenLaunch = Get-Date
            }
            else {
                $idleMessageIndex++
            }
            [Console]::SetCursorPosition($inputCursorLeft, $inputCursorTop); $timeOfLastMessageEnd = Get-Date
        }
    }
    
    Start-Sleep -Milliseconds 50
}

# (The rest of the script remains unchanged)
switch ($choice) {
    '1' { Write-Host ""; Write-Glitchy -Text ">> MODE: REAL SITE PAYLOAD" }
    '2' { Write-Host ""; Write-Glitchy -Text ">> MODE: LOCAL TESTING" }
    default { Write-Host ""; Write-Glitchy -Text ">> ERROR: INVALID_SELECTION"; Write-Centered -Text "> SCRIPT TERMINATED <"; exit 1 }
}

if (-not (Test-Path $EffectLibrary)) {
    Write-Glitchy -Text "[[ FATAL ERROR ]]"; Write-Glitchy -Text "Core library '$EffectLibrary' not found."; Write-Centered -Text "> SCRIPT TERMINATED <"; exit 1
}
Write-Glitchy -Text ">> Core library found. Assembling payload..."

$initializerCode = @"
// --- Activator for the 'Dynamic Chaos' sequence ---
window.GlitchArt.run([
    { func: window.GlitchArt.vibrate, delay: 4000 },
    { func: window.GlitchArt.imageStack, delay: 8000 },
    { func: window.GlitchArt.ghostCursor, delay: 7000 }
]);
document.body.addEventListener('click', function() { if (Math.random() < 0.20) window.GlitchArt.datamosh(); });
setInterval(function() { if (Math.random() < 0.05) window.GlitchArt.datamosh(); }, 5000);
"@
$libraryContent = Get-Content -Path $EffectLibrary -Raw
$finalPayload = $libraryContent + "`r`n`r`n" + $initializerCode
$finalPayload | Out-File -FilePath $OutputFile -Encoding UTF8

Write-Glitchy -Text ">> Payload written to '$OutputFile'."
Write-Host ""

$completeLine = [char]0x2588 + [char]0x2593 + [char]0x2592 + [char]0x2591 + "   PROCESS COMPLETE   " + [char]0x2591 + [char]0x2592 + [char]0x2593 + [char]0x2588
Write-Centered -Text $completeLine -IsLogo

Write-Host ""
if ($choice -eq '1') {
    Write-Glitchy -Text "[[ HOW TO USE ON A REAL WEBSITE ]]"
    Write-Centered -Text "> 1. Open '$OutputFile' and copy its entire content."
    Write-Centered -Text "> 2. Navigate to your target website in your browser."
    Write-Centered -Text "> 3. Open Developer Tools (F12 or Ctrl+Shift+I)."
    Write-Centered -Text "> 4. Go to the 'Console' tab."
    Write-Centered -Text "> 5. Paste the code into the console and press Enter."
}
if ($choice -eq '2') {
    if (Test-path $TestPage) {
        $openChoice = Read-Host "> Open '$TestPage' to view the result? (y/n)"
        if ($openChoice -eq 'y') { Write-Glitchy -Text ">> Launching ..."; Start-Process $TestPage }
    } else {
        Write-Glitchy -Text ">> NOTICE: Your test page '$TestPage' was not found."
        Write-Centered -Text "> The payload '$OutputFile' was still created successfully."
    }
}
Write-Host ""