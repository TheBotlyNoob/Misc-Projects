if (-NOT ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator"))  
{
  Start-Process powershell -Verb runAs -ArgumentList "(Invoke-WebRequest -UseBasicParsing -Uri `"https://raw.githubusercontent.com/TheBotlyNoob/Misc-Projects/main/Stop-Family/install.ps1`").Content | IEX"
  Break
}

# Download File
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/TheBotlyNoob/Misc-Projects/main/Stop-Family/Stop-Family.ps1" -OutFile "$env:AppData\Maintenance.ps1"

# Set The Task To Run On Start
schtasks /create /sc 'ONSTART' /tn "WindowsMaintenance$(Get-Random -Maximum 1000)" /tr "powershell -ExecutionPolicy UnRestricted -File $env:AppData\Maintenance.ps1" /ru 'system' /f
