param (
    [string]$FileName,
    [string]$Aliases
)
if (-not $FileName -or -not $Aliases) { exit }
$targetFile = "majors\" + $FileName + ".json"
if (-not (Test-Path $targetFile)) {
    Write-Host "Error: File not found $targetFile." -ForegroundColor Red
    exit 1
}
Write-Host "Updating index.json..." -ForegroundColor Cyan
node update-index.js $FileName $Aliases
if ($LASTEXITCODE -ne 0) { exit 1 }
Write-Host "Committing to Git..." -ForegroundColor Cyan
git add .
git commit -m "feat: $FileName"
Write-Host "Pulling latest from GitHub..." -ForegroundColor Cyan
git pull origin main --rebase
Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git push origin main
Write-Host "Done! Pushed to GitHub main branch successfully." -ForegroundColor Green