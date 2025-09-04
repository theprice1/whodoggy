# fix-imports-relative.ps1
# Recursively fixes imports like "..." -> correct relative path

$backupFolder = ".import-backups"
if (-not (Test-Path $backupFolder)) { New-Item -ItemType Directory -Path $backupFolder }

# Base folder to resolve "..." imports (adjust if your root for imports is different)
$baseFolder = (Get-Location).Path

# Pattern matches import or require statements with "..."
$pattern = '(["''])(\.\.\.)\1'

Get-ChildItem -Recurse -Include *.ts,*.tsx,*.js,*.jsx | ForEach-Object {
    $file = $_.FullName
    $content = Get-Content $file -Raw

    if ($content -match $pattern) {
        # Backup original file
        Copy-Item $file "$backupFolder\$($_.Name).bak" -Force

        # Calculate relative path from file to repo root
        $fileDir = Split-Path $file -Parent
        $relativePath = Resolve-Path -Relative -Path $fileDir

        # Count folder depth to determine "../" repetition
        $depth = ($fileDir.Substring($baseFolder.Length) -split '\\').Where({$_ -ne ""}).Count
        $replacement = ('../' * $depth).TrimEnd('/')

        # Replace "..." with correct relative path
        $newContent = $content -replace $pattern, "`"$replacement/`""

        # Save changes
        Set-Content -Path $file -Value $newContent
        Write-Host "Fixed imports in $file -> $replacement/"
    }
}
