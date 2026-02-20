param(
  [Parameter(Mandatory = $true)]
  [string]$Repo,

  [Parameter(Mandatory = $true)]
  [string]$SkillName,

  [Parameter(Mandatory = $false)]
  [string]$Ref = "main"
)

$targetDir = Join-Path ".github/skills" $SkillName
$targetFile = Join-Path $targetDir "SKILL.md"
$sourceUrl = "https://raw.githubusercontent.com/$Repo/$Ref/skills/$SkillName/SKILL.md"

New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
Invoke-WebRequest -Uri $sourceUrl -OutFile $targetFile

Write-Host "Installed $SkillName -> $targetFile"
