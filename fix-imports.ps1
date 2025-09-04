# fix-imports.ps1
# Recursively finds all imports with "..." and prints file + line for review.

Get-ChildItem -Recurse -Include *.ts,*.tsx,*.js,*.jsx | ForEach-Object {
    $file = $_.FullName
    $matches = Select-String -Path $file -Pattern '"\.\.\."'
    if ($matches) {
        Write-Host "Found in: $file"
        $matches | ForEach-Object { Write-Host "  Line $($_.LineNumber): $($_.Line.Trim())" }
    }
}
