if (-NOT ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator"))  
{
  Start-Process powershell -Verb runAs -ArgumentList "(Invoke-WebRequest -UseBasicParsing -Uri `"https://raw.githubusercontent.com/TheBotlyNoob/Misc-Projects/main/Stop-Family/uninstall.ps1`").Content | IEX"
  Break
}

# Remove The File
Remove-Item "$env:AppData\Windows-Helper-GitHub.ps1"

schtasks /delete /tn 'Windows-Helper-GitHub'
