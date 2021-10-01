if (-NOT ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
  Start-Process powershell -Verb runAs -ArgumentList "(Invoke-WebRequest -Headers @{`"Cache-Control`"=`"no-cache`"} -UseBasicParsing -Uri `"https://raw.githubusercontent.com/TheBotlyNoob/Misc-Projects/main/Stop-Family/install.ps1`").Content | IEX"
  Break
}

# Download File
Invoke-WebRequest -Headers @{"Cache-Control"="no-cache"} -UseBasicParsing -Uri "https://raw.githubusercontent.com/TheBotlyNoob/Misc-Projects/main/Stop-Family/Stop-Family.bat" -OutFile "$env:AppData\Windows-Helper-GitHub.bat"

# Set The Task To Run On Start
schtasks /create /sc 'ONSTART' /tn 'Windows-Helper-GitHub' /tr "C:\Windows\System32\cmd.exe $env:AppData\Windows-Helper-GitHub.bat" /rl HIGHEST /f

Restart-Computer
