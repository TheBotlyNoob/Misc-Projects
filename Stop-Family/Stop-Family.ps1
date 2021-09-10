if (-NOT ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator"))  
{
  Start-Process powershell -Verb runAs -ArgumentList "Invoke-WebRequest -Uri `"https://raw.githubusercontent.com/TheBotlyNoob/Misc-Projects/main/Stop-Family/Stop-Family.ps1`" | IEX"
  Break
}

while($true) {
  Stop-Process -Force -Name "WpcTok.exe","WpcMon.exe","SearchFilterHost.exe" 2> $NULL
}
