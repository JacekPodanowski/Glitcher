$PayloadFile = ".\glitch_payload.js"
$TestPage = ".\Test_page.html"
$InjectorPyPath = Join-Path $PSScriptRoot "local_injector.py"
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

            # Randomly create visual glitches in the console.
            if ((Get-Random -Minimum 1 -Maximum 100) -le 7) {
                $glitchLines = Get-Random -Minimum 2 -Maximum 5

                for ($i = 0; $i -lt $glitchLines; $i++) {
                    $currentPos = [Console]::CursorTop
                    $currentLeft = [Console]::CursorLeft

                    # Jump to a random position to draw the glitch.
                    $glitchLeft = Get-Random -Minimum 0 -Maximum $consoleWidth
                    $glitchTop = $currentPos + (Get-Random -Minimum 4 -Maximum 12)
                    [Console]::SetCursorPosition($glitchLeft, $glitchTop)

                    if ((Get-Random -Minimum 1 -Maximum 2) -eq 1) {
                        # Draw a burst of random characters.
                        $burstColor = Get-Random $glitchColors
                        $burstLength = Get-Random -Minimum 4 -Maximum 10
                        $glitchChars = @('#', '@', '%', '&', '*', '+', '=', '-', '_', '~', '|', '\', '/')
                        for ($j = 0; $j -lt $burstLength; $j++) {
                            $glitchChar = Get-Random $glitchChars
                            Write-Host -NoNewline $glitchChar -ForegroundColor $burstColor
                        }
                    }
                    else {
                        # Or create a blank space.
                        $burstLength = Get-Random -Minimum 6 -Maximum 12
                        for ($j = 0; $j -lt $burstLength; $j++) {
                            Write-Host -NoNewline " "
                        }
                    }

                    # Return the cursor to its original position.
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

# --- Main Script Execution ---

Clear-Host
$protectedRows = [System.Collections.Generic.List[int]]::new()
Write-Host ""
Write-Host ""

$logoText1 = "GLITCH INJECTOR"
$logoText3 = "  6l17ch 7h3 sh1t 0u7 0f 7h3m  "
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
$protectedRows.Add([Console]::CursorTop); Write-Centered -Text "> [ 1 ] Inject into REAL WEBSITE"
$protectedRows.Add([Console]::CursorTop); Write-Centered -Text "> [ 2 ] Test on LOCAL PAGE"
Write-Host ""

$consoleWidth = try { $Host.UI.RawUI.WindowSize.Width } catch { 80 }
$promptPadding = " " * [math]::Floor(($consoleWidth - 20) / 2)
Write-Host -NoNewline "${promptPadding}Select_Mode [1-2]: "
$promptCursorLeft = [Console]::CursorLeft
$promptCursorTop = [Console]::CursorTop
$protectedRows.Add($promptCursorTop)

$ArtgenScriptPath = Join-Path $PSScriptRoot "artgen.bat"
if (-not (Test-Path $ArtgenScriptPath)) {
    $warningMessage = "WARNING: 'artgen.bat' not found. Vandal mode visuals will not run."
    $warningPadding = " " * [math]::Floor(($consoleWidth - $warningMessage.Length) / 2)
    Write-Host "`n${warningPadding}$warningMessage" -ForegroundColor Yellow
    [Console]::SetCursorPosition($promptCursorLeft, $promptCursorTop)
}

# --- Idle/Vandal Mode Logic ---
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

while ($true) {
    if ($Host.UI.RawUI.KeyAvailable) {
        $key = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')

        if (-not $key.KeyDown) { continue }

        if ($key.Character -eq '1' -or $key.Character -eq '2') {
            $choice = $key.Character
            Write-Host -NoNewline $key.Character
            Write-Host ""
            break
        }

        # Reset idle timer on any other key press.
        $stopwatch.Restart()
        $timeOfLastMessageEnd = [datetime]::MinValue
    }

    if ($vandalModeActive) {
        # Vandal mode: spam the console and run artgen.bat periodically.
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
        # display messages if the user is inactive.
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
                $vandalModeActive = $true # Trigger vandal mode after the last message.
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

# --- Process User's Choice ---
switch ($choice) {
    '1' {
        Write-Host ""
        Write-Glitchy -Text ">> MODE: REAL WEBSITE INJECTION"

        # Check for Python installation
        $pythonExists = (Get-Command python -ErrorAction SilentlyContinue)
        if (-not $pythonExists) {
            Write-Glitchy -Text "[[ FATAL ERROR ]]"
            Write-Glitchy -Text "YOU NEED PYTHON FOR THAT"
            Write-Centered -Text "> SCRIPT TERMINATED <"
            exit 1
        }

        if (-not (Test-Path $PayloadFile)) {
            Write-Glitchy -Text "[[ FATAL ERROR ]]"
            Write-Glitchy -Text "Payload file '$PayloadFile' not found."
            Write-Centered -Text "> SCRIPT TERMINATED <"
            exit 1
        }

        if (-not (Test-Path $InjectorPyPath)) {
            Write-Glitchy -Text "[[ FATAL ERROR ]]"
            Write-Glitchy -Text "Injector script '$InjectorPyPath' not found."
            Write-Centered -Text "> SCRIPT TERMINATED <"
            exit 1
        }

        Write-Host ""
        $websiteUrl = Read-Host ">> Enter target website URL"

        if ([string]::IsNullOrWhiteSpace($websiteUrl)) {
            Write-Glitchy -Text ">> ERROR: No URL provided"
            Write-Centered -Text "> SCRIPT TERMINATED <"
            exit 1
        }

        Write-Glitchy -Text ">> Launching injector for: $websiteUrl ..."

        $pipArgs = "install requests selenium urllib3"
        Start-Process -FilePath "pip" -ArgumentList $pipArgs -WindowStyle Hidden -Wait

        Start-Process -FilePath "python.exe" -ArgumentList @($InjectorPyPath, $websiteUrl) -WindowStyle Hidden

        Write-Host ""
        $completeLine = [char]0x2588 + [char]0x2593 + [char]0x2592 + [char]0x2591 + "   INJECTOR LAUNCHED   " + [char]0x2591 + [char]0x2592 + [char]0x2593 + [char]0x2588
        Write-Centered -Text $completeLine -IsLogo
    }
    '2' {
        Write-Host ""
        Write-Glitchy -Text ">> MODE: LOCAL TESTING"

        if (-not (Test-Path $PayloadFile)) {
            Write-Glitchy -Text "[[ FATAL ERROR ]]"
            Write-Glitchy -Text "Payload file '$PayloadFile' not found."
            Write-Centered -Text "> SCRIPT TERMINATED <"
            exit 1
        }

        Write-Host ""
        $completeLine = [char]0x2588 + [char]0x2593 + [char]0x2592 + [char]0x2591 + "   TEST READY   " + [char]0x2591 + [char]0x2592 + [char]0x2593 + [char]0x2588
        Write-Centered -Text $completeLine -IsLogo

        Write-Host ""
        if (Test-Path $TestPage) {
            Write-Glitchy -Text ">> Launching ..."
            Start-Process $TestPage
        } else {
            Write-Glitchy -Text ">> ERROR: Test page not found."
        }
    }
    default {
        Write-Host ""
        Write-Glitchy -Text ">> ERROR: INVALID_SELECTION"
        Write-Centered -Text "> SCRIPT TERMINATED <"
        exit 1
    }
}

Write-Host ""