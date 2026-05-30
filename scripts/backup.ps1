param(
  [string]$Output = "backups/imperar-$(Get-Date -Format 'yyyyMMdd-HHmmss').sql"
)

New-Item -ItemType Directory -Force -Path (Split-Path $Output) | Out-Null
pg_dump $env:DATABASE_URL -f $Output
Write-Host "Backup gerado em $Output"
