param(
  [Parameter(Mandatory=$true)]
  [string]$InputFile
)

psql $env:DATABASE_URL -f $InputFile
Write-Host "Restore aplicado de $InputFile"
