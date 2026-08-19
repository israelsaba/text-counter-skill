param(
  [ValidateSet('opencode', 'hermes', 'claude', 'codex', 'all')]
  [string]$Agent = 'all',
  [string]$Dest = ''
)

$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Source = Join-Path $Root 'skills\agent-counter'

if (!(Test-Path (Join-Path $Source 'SKILL.md') -PathType Leaf)) {
  throw "Skill source is missing: $(Join-Path $Source 'SKILL.md')"
}

function Install-One([string]$Name) {
  if ($Dest) {
    $Target = Join-Path $Dest $Name
  } else {
    switch ($Name) {
      'opencode' { $Target = Join-Path $env:USERPROFILE '.config\opencode\skills\agent-counter' }
      'hermes' { $Target = Join-Path $env:USERPROFILE '.hermes\skills\agent-counter' }
      'claude' { $Target = Join-Path $env:USERPROFILE '.claude\skills\agent-counter' }
      'codex' { $Target = Join-Path $env:USERPROFILE '.codex\skills\agent-counter' }
    }
  }
  New-Item -ItemType Directory -Force -Path $Target | Out-Null
  Copy-Item -Path (Join-Path $Source '*') -Destination $Target -Recurse -Force
  Write-Output "Installed agent-counter for $Name at $Target"
}

if ($Agent -eq 'all') {
  'opencode', 'hermes', 'claude', 'codex' | ForEach-Object { Install-One $_ }
} else {
  Install-One $Agent
}
