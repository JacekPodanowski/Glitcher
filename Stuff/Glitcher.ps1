$EffectLibrary = ".\glitch_effects.js"
$OutputFile = "final_glitch_payload.js"
$TestPage = ".\Test_page.html"

function Write-Glitchy {
    param(
        [string]$Text,
        [int]$LineDelay = 20,
        [switch]$IsLogo
    )
    
    # Get the console width dynamically, with a fallback for safety
    $consoleWidth = try { $Host.UI.RawUI.WindowSize.Width } catch { 80 }

    if ($IsLogo) {
        # --- NEW: Updated color palette to include Black ---
        $glitchColors = @('Black', 'DarkGray', 'Gray')

        $Text.ToCharArray() | ForEach-Object {
            $char = $_
            
            # Randomly trigger a glitch effect for a character
            if ((Get-Random -Minimum 1 -Maximum 100) -le 25) {
                $glitchLines = Get-Random -Minimum 2 -Maximum 5
                $glitchPositions = @() # Store where glitches are drawn to ensure they are cleaned up

                # --- STAGE 1: DRAW GLITCH ARTIFACTS ---
                for ($i = 0; $i -lt $glitchLines; $i++) {
                    $currentPos = [Console]::CursorTop
                    $currentLeft = [Console]::CursorLeft
                    
                    $glitchLeft = Get-Random -Minimum 0 -Maximum $consoleWidth
                    $glitchTop = $currentPos + (Get-Random -Minimum 1 -Maximum 6)
                    [Console]::SetCursorPosition($glitchLeft, $glitchTop)
                    
                    $glitchPositions += $glitchTop
                    
                    # --- NEW: A single color is chosen for the entire burst ---
                    $burstColor = Get-Random $glitchColors
                    
                    # --- NEW: Burst length is now 4 to 10 characters ---
                    $burstLength = Get-Random -Minimum 4 -Maximum 10
                    $glitchChars = @('#', '@', '%', '&', '*', '+', '=', '-', '_', '~', '|', '\', '/')
                    for ($j = 0; $j -lt $burstLength; $j++) {
                        $glitchChar = Get-Random $glitchChars
                        # All characters in the burst use the same color
                        Write-Host -NoNewline $glitchChar -ForegroundColor $burstColor
                    }
                    
                    # Restore cursor to original position
                    [Console]::SetCursorPosition($currentLeft, $currentPos)
                }
                
                # Pause briefly to make the glitch visible
                Start-Sleep -Milliseconds (Get-Random -Minimum 40 -Maximum 80)
                
                # --- STAGE 2: CLEAR GLITCH ARTIFACTS ---
                $uniquePositions = $glitchPositions | Sort-Object -Unique
                foreach ($pos in $uniquePositions) {
                    $currentPos = [Console]::CursorTop
                    $currentLeft = [Console]::CursorLeft
                    
                    [Console]::SetCursorPosition(0, $pos)
                    Write-Host -NoNewline (" " * $consoleWidth)
                    
                    [Console]::SetCursorPosition($currentLeft, $currentPos)
                }
            }
            
            # Write the actual character of the text after the glitch effect
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
        # Standard, non-glitchy text writing
        $Text.ToCharArray() | ForEach-Object {
            if ($_ -eq ' ') {
                Write-Host -NoNewline $_
            }
            else {
                Write-Host -NoNewline $_
                Start-Sleep -Milliseconds (Get-Random -Minimum 2 -Maximum 8)
            }
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
Write-Host ""
Write-Host ""

# --- Centered and Aligned Logo Generation ---
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
# --- FIX: Removed the extra leading space to correct the alignment ---
$logoLine3 = $border + $logoText3 + $reverseBorder

Write-Centered -Text $logoLine1 -IsLogo
Write-Centered -Text $logoLine2 -IsLogo
Write-Centered -Text $logoLine3 -IsLogo
# --- End of Logo Generation ---


Write-Host ""
Write-Host ""
Write-Centered -Text "> [ 1 ] Generate Payload for REAL WEBSITE"
Write-Centered -Text "> [ 2 ] Generate Payload for LOCAL TESTING"
Write-Host ""

$consoleWidth = try { $Host.UI.RawUI.WindowSize.Width } catch { 80 }
$promptPadding = " " * [math]::Floor(($consoleWidth - 20) / 2)
$choice = Read-Host "${promptPadding}Select_Mode [1-2]"

switch ($choice) {
    '1' {
        Write-Host ""
        Write-Glitchy -Text ">> MODE: REAL SITE PAYLOAD"
    }
    '2' {
        Write-Host ""
        Write-Glitchy -Text ">> MODE: LOCAL TESTING"
    }
    default {
        Write-Host ""
        Write-Glitchy -Text ">> ERROR: INVALID_SELECTION"
        Write-Centered -Text "> SCRIPT TERMINATED <"
        exit 1
    }
}

if (-not (Test-Path $EffectLibrary)) {
    Write-Glitchy -Text "[[ FATAL ERROR ]]"
    Write-Glitchy -Text "Core library '$EffectLibrary' not found. Cannot proceed."
    Write-Centered -Text "> SCRIPT TERMINATED <"
    exit 1
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
    if (Test-Path $TestPage) {
        $openChoice = Read-Host "> Open '$TestPage' to view the result? (y/n)"
        if ($openChoice -eq 'y') {
            Write-Glitchy -Text ">> Launching ..."
            Start-Process $TestPage
        }
    }
    else {
        Write-Glitchy -Text ">> NOTICE: Your test page '$TestPage' was not found."
        Write-Centered -Text "> The payload '$OutputFile' was still created successfully."
    }
}

Write-Host ""