# Stop Family

Stops `Microsoft Family Features` from working.

Sadly, it doesn't bypass any restrictions for apps.

## Install

To Run On Startup, Run This In An Administrator PowerShell Prompt

```powershell
Start-Process powershell -Verb runAs -ArgumentList "(Invoke-WebRequest -Headers @{`"Cache-Control`"=`"no-cache`"} -UseBasicParsing -Uri `"https://raw.githubusercontent.com/TheBotlyNoob/Misc-Projects/main/Stop-Family/install.ps1`").Content"
```

## Uninstallation

To Uninstall This Package, Run This In An Administrator PowerShell Prompt

```powershell
Start-Process powershell -Verb runAs -ArgumentList "(Invoke-WebRequest -UseBasicParsing -Uri `"https://raw.githubusercontent.com/TheBotlyNoob/Misc-Projects/main/Stop-Family/uninstall.ps1`").Content"
```
