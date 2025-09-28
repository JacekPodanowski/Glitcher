# --- Glitchy Console Output Function ---
function Write-Glitchy {
    param(
        [string]$Text,
        [int]$LineDelay = 50,
        [switch]$IsLogo
    )
    
    if ($IsLogo) {
        # Special logo effect with random glitch bursts
        $indent = " " * (Get-Random -Minimum 0 -Maximum 3)
        Write-Host -NoNewline $indent
        
        $Text.ToCharArray() | ForEach-Object {
            $char = $_
            
            # Higher chance of glitch effects for logo
            if ((Get-Random -Minimum 1 -Maximum 100) -le 15) {
                # Create glitch burst at random position below
                $glitchLines = Get-Random -Minimum 1 -Maximum 4
                for ($i = 0; $i -lt $glitchLines; $i++) {
                    $currentPos = [Console]::CursorTop
                    $currentLeft = [Console]::CursorLeft
                    
                    # Move cursor down randomly
                    [Console]::SetCursorPosition((Get-Random -Minimum 0 -Maximum 60), ($currentPos + (Get-Random -Minimum 1 -Maximum 5)))
                    
                    # Burst of glitch characters
                    $burstLength = Get-Random -Minimum 3 -Maximum 12
                    $glitchChars = @('|', '/', '\', '-', '_', '*', '#', '@', '%')
                    for ($j = 0; $j -lt $burstLength; $j++) {
                        Write-Host -NoNewline (Get-Random $glitchChars)
                    }
                    
                    # Return to original position
                    [Console]::SetCursorPosition($currentLeft, $currentPos)
                }
                
                Start-Sleep -Milliseconds (Get-Random -Minimum 50 -Maximum 150)
                
                # Clear the glitch characters
                for ($i = 0; $i -lt $glitchLines; $i++) {
                    $currentPos = [Console]::CursorTop
                    $currentLeft = [Console]::CursorLeft
                    
                    [Console]::SetCursorPosition(0, ($currentPos + (Get-Random -Minimum 1 -Maximum 5)))
                    Write-Host -NoNewline (" " * 80)  # Clear line
                    [Console]::SetCursorPosition($currentLeft, $currentPos)
                }
            }
            
            # Write the actual character
            Write-Host -NoNewline $char
            Start-Sleep -Milliseconds (Get-Random -Minimum 15 -Maximum 60)
        }
    }
    else {
        # Regular glitch effect for other text
        $indent = " " * (Get-Random -Minimum 0 -Maximum 4)
        Write-Host -NoNewline $indent
        
        $Text.ToCharArray() | ForEach-Object {
            $char = $_
            
            if ((Get-Random -Minimum 1 -Maximum 100) -le 8) {
                $glitchChars = @('|', '-', '_', '~', '*', '#', '@', '%')
                $glitchChar = Get-Random $glitchChars
                Write-Host -NoNewline $glitchChar
                Start-Sleep -Milliseconds (Get-Random -Minimum 10 -Maximum 30)
                Write-Host -NoNewline "`b "
                Write-Host -NoNewline "`b"
            }
            
            Write-Host -NoNewline $char
            Start-Sleep -Milliseconds (Get-Random -Minimum 8 -Maximum 25)
        }
    }
    
    Write-Host ""
    Start-Sleep -Milliseconds $LineDelay
}

# --- Main Script ---

Clear-Host
Write-Glitchy -Text "### 6L17CH * 4R7 * 1NJ3C70R ###" -IsLogo
Write-Glitchy -Text "==============================================" -IsLogo
Write-Host ""
Write-Glitchy -Text "          [1] Generate Payload for a REAL WEBSITE"
Write-Glitchy -Text "          [2] Generate Payload for LOCAL TESTING"
Write-Host ""

# Rest of your script remains the same...
$choice = Read-Host "          Select_Mode [1-2]"

# --- Main Logic Switch ---
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
        Write-Glitchy -Text "                > SCRIPT TERMINATED <"
        exit 1
    }
}

if (-not (Test-Path $EffectLibrary)) {
    Write-Glitchy -Text "[[ FATAL ERROR ]]"
    Write-Glitchy -Text "Core library '$EffectLibrary' not found. Cannot proceed."
    Write-Glitchy -Text "                > SCRIPT TERMINATED <"
    exit 1
}
Write-Glitchy -Text ">> Core library found. Assembling payload..."

# --- Payload Generation (Common to both modes) ---
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
Write-Glitchy -Text "### PROCESS COMPLETE ###" -IsLogo
Write-Host ""

# --- Final Instructions based on mode ---
if ($choice -eq '1') {
    Write-Glitchy -Text "[[ HOW TO USE ON A REAL WEBSITE ]]"
    Write-Glitchy -Text "   1. Open '$OutputFile' and copy its entire content."
    Write-Glitchy -Text "   2. Navigate to your target website in your browser."
    Write-Glitchy -Text "   3. Open Developer Tools (F12 or Ctrl+Shift+I)."
    Write-Glitchy -Text "   4. Go to the 'Console' tab."
    Write-Glitchy -Text "   5. Paste the code into the console and press Enter."
}

if ($choice -eq '2') {
    if (Test-Path $TestPage) {
        $openChoice = Read-Host "? Open '$TestPage' to view the result? (y/n)"
        if ($openChoice -eq 'y') {
            Write-Glitchy -Text ">> Launching test environment..."
            Start-Process $TestPage
        }
    }
    else {
        Write-Glitchy -Text ">> NOTICE: Your test page '$TestPage' was not found."
        Write-Glitchy -Text "   The payload '$OutputFile' was still created successfully."
    }
}

Write-Host ""