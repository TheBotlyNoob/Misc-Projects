@echo off

cd /d "%~dp0" && ( if exist "%temp%\getadmin.vbs" del "%temp%\getadmin.vbs" ) && fsutil dirty query %systemdrive% 1>nul 2>nul||(  echo Set UAC=CreateObject^("Shell.Application"^):UAC.ShellExecute "cmd.exe","/k cd ""%~sdp0"" && %~s0","","runas", 1 >>"%temp%\getadmin.vbs" && "%temp%\getadmin.vbs"&& exit /B )
if "%1" == "" start "" /min "%~f0" MINIMIZED && exit

for /L %%N in () do @taskkill /f /im WpcMon.exe
