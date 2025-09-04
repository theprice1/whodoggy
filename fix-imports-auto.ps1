# fix-imports-auto.ps1
# Recursively fixes imports like "..." -> "../../" in your monorepo

$backupFolder = ".import-backups"
if (-not (Test-Path $backupFolder)) { New-Item -ItemType Directory -Path $backupFolder }

# Pattern matches import or require statements with "..."
$pattern = '(["''])(\.\.\.)\1'

Get-ChildItem -Recurse -Include *.ts,*.tsx,*.js,*.jsx | ForEach-Object {
    $file = $_.FullName
    $content = Get-Content $file -Raw

    if ($content -match $pattern) {
        # Backup original file
        Copy-Item $file "$backupFolder\$($_.Name).bak" -Force

        # Replace "..." with "../../" (adjust as needed)
        $newContent = $content -replace $pattern, '$1../../$1'

        # Save changes
        Set-Content -Path $file -Value $newContent
        Write-Host "Fixed imports in $file"
    }
}
