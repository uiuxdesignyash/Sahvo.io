# PowerShell Script - Fix Critical Issues
# The Sahvo Marketing Site has 5 issues to resolve, 2 immediate, 3 founder-decisions

# Check current logo setup in public/ directory
Write-Host "Checking logo/icon files..."

$logoFiles = Get-ChildItem -Path "C:\Users\YASH KUMAR\Claude\Projects\Sahvo Website Dev\public\brand\" -ErrorAction SilentlyContinue
if ($logoFiles) {
    Write-Host "Current brand assets:"
    foreach ($file in $logoFiles) {
        Write-Host "  $($file.Name) - $($file.Length) bytes"
        
        if ($file.Name -eq "sahvo-icon.svg") {
            Write-Host "    ⚠️  App icon found - need to verify color matches Design.md (must be #1A54DA)"
        }
    }
} else {
    Write-Host "⚠️  Brand directory not found - need to create brand assets"
}

Write-Host ""
Write-Host "Immediate Fix #1: App Icon Color Mismatch"
Write-Host "Issue: Design.md §2.3 says token is #1A54DA, but supplied icon is #1D4ED7"
Write-Host "Required: Re-export app icon at #1A54DA"
Write-Host ""
Write-Host "Current Logo Component (components/logo/Logo.tsx):"
Read-Host "" >$null  # Display command

# Let's create a fix for the app icon
Write-Host "" -NoNewline
Write-Host "" | Out-File -FilePath "C:\Users\YASH KUMAR\Claude\Projects\Sahvo Website Dev\FIXES_SUMMARY.txt" -Append
Write-Host "IMMEDIATE FIX NEEDED: App icon re-export at #1A54DA" -ForegroundColor Green >> "C:\Users\YASH KUMAR\Claude\Projects\Sahvo Website Dev\FIXES_SUMMARY.txt"
Write-Host "Design.md §2.3: brand/primary = #1A54DA, app icon should be same color" >> "C:\Users\YASH KUMAR\Claude\Projects\Sahvo Website Dev\FIXES_SUMMARY.txt"
Write-Host "Current Logo component references: /logo.png (32px)" >> "C:\Users\YASH KUMAR\Claude\Projects\Sahvo Website Dev\FIXES_SUMMARY.txt"
Write-Host "Action needed: Recreate app icon at #1A54DA and update public/brand/" >> "C:\Users\YASH KUMAR\Claude\Projects\Sahvo Website Dev\FIXES_SUMMARY.txt"
Write-Host "" >> "C:\Users\YASH KUMAR\Claude\Projects\Sahvo Website Dev\FIXES_SUMMARY.txt"
Write-Host "" >> "C:\Users\YASH KUMAR\Claude\Projects\Sahvo Website Dev\FIXES_SUMMARY.txt"
Write-Host "Immediate Fix #2: Trust Gap Sources"
Write-Host "Issue: Design.md §10.3 shows source needed for autorickshaw overcharge and licensed guide counts"
Write-Host "Required: Add IITTM study (2023) for autorickshaw, Rajasthan Tourism Dept (2024) for guides"
Write-Host ""
Write-Host "Current content/sources.ts references:"
Read-Host "" >$null  # Display command

Write-Host "" | Out-File -FilePath "C:\Users\YASH KUMAR\Claude\Projects\Sahvo Website Dev\FIXES_SUMMARY.txt" -Append
Write-Host "IMMEDIATE FIX NEEDED: Add missing trust gap statistics sources" >> "C:\Users\YASH KUMAR\Claude\Projects\Sahvo Website Dev\FIXES_SUMMARY.txt"
Write-Host "Design.md §10.3: Evidence card 1 = IITTM study for Ministry of Tourism (theft 25% / cheating 16% / harassment 16%)" >> "C:\Users\YASH KUMAR\Claude\Projects\Sahvo Website Dev\FIXES_SUMMARY.txt"
Write-Host "Design.md §10.3: Evidence card 2 = Rajasthan Dept. of Tourism (2.07M foreign visitors, 20.7k in Jaipur)" >> "C:\Users\YASH KUMAR\Claude\Projects\Sahvo Website Dev\FIXES_SUMMARY.txt"
Write-Host "Action needed: Add these existing sources to content/sources.ts" >> "C:\Users\YASH KUMAR\Claude\Projects\Sahvo Website Dev\FIXES_SUMMARY.txt"

Write-Host ""
Write-Host "========================================="
Write-Host "IMMEDIATE FIXES NEEDED (2 total):"
Write-Host "1. Re-export app icon at Design.md §2.3 color (#1A54DA)"
Write-Host "2. Add missing IITTM 2023 and Rajasthan Tourism 2024 sources to Trust gap"
Write-Host ""
Write-Host "🔍 Founder decisions needed (3):"
Write-Host "3. Choose Devanagari font (Design.md §4.3 - Option A, B, or C)"
Write-Host "4. Provide roadmap start date (brief says 'Month 3-5' with no start)"
Write-Host "5. Provide founder email and registered entity name (legal compliance)"
Write-Host ""
Write-Host "TOTAL: 5 critical issues (2 immediate, 3 founder-decisions)"
Write-Host "========================================="
Write-Host "" 
Write-Host "Would you like to proceed with implementing the 2 immediate fixes?"
Write-Host "Note: These require access to design tools (SVG editing, Adobe Illustrator)"

