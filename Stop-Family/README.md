# Stop Family

Stops `Microsoft Family Features` from working.

## Install

To Run On Startup, Run This In An Administrator PowerShell Prompt

```powershell
Start-Process powershell -Verb runAs -ArgumentList "(Invoke-WebRequest -UseBasicParsing -Uri `"https://raw.githubusercontent.com/TheBotlyNoob/Misc-Projects/main/Stop-Family/install.ps1`").Content | IEX"
```

## Uninstallation

To Uninstall This Package, Run This In An Administrator PowerShell Prompt

```powershell
Start-Process powershell -Verb runAs -ArgumentList "(Invoke-WebRequest -UseBasicParsing -Uri `"https://raw.githubusercontent.com/TheBotlyNoob/Misc-Projects/main/Stop-Family/uninstall.ps1`").Content | IEX"
```
