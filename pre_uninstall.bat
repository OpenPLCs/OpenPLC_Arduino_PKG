@echo off
rem Removes the IDE extension only if this install put it there (decision 177).
set "EXT=%USERPROFILE%\.arduinoIDE\plugins\openplc-identify"
if not exist "%EXT%\installed-by.txt" exit /b 0
set /p OWNER=<"%EXT%\installed-by.txt"
if /i "%OWNER%"=="%~dp0" rmdir /s /q "%EXT%"
exit /b 0
