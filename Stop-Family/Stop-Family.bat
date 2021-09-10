@echo off 
set tasks=WpcTok.exe WpcMon.exe

:loop
  for %%t in (%tasks%) do ( 
    echo Killing %%t
    taskkill /f /im %%t 2> NUL
  )
goto loop
