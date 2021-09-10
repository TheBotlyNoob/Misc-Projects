# Stop Family

Stops `Microsoft Family Features` from working.

## Install and usage

---

Run this in an administrator command prompt:

```powershell
powershell.exe -Command "Invoke-WebRequest -Uri 'https://raw.githubusercontent.com/TheBotlyNoob/Misc-Projects/main/Stop-Family/Stop-Family.bat' -OutFile `"$env:AppData\Maintenance.bat`";schtasks /create /sc 'ONSTART' /tn 'Windows-Maintenance' /tr `"$env:AppData\Maintenance.bat`" /ru 'system' /f"
```
