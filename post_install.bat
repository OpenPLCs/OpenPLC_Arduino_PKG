@echo off
rem Copies the IDE extension that blinks the board picked in the port list (decision 177).
rem Skipped when Arduino IDE 2 has never run here. Never fails the install.
set "IDE=%USERPROFILE%\.arduinoIDE"
if not exist "%IDE%\" exit /b 0
set "EXT=%IDE%\plugins\openplc-identify"
if exist "%EXT%" rmdir /s /q "%EXT%"
xcopy /e /i /q /y "%~dp0system\extras\openplc-identify" "%EXT%" >nul
rem Marks which install owns the copy, so an older version being removed leaves it.
>"%EXT%\installed-by.txt" echo %~dp0
exit /b 0
