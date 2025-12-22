@echo off
echo.
echo ===== Film Roll Metadata Stamper =====
echo.
echo (Leave any field blank and press Enter to skip it)
echo.
set /p camera="Camera (e.g., Canon AV-1): "
set /p filmstock="Film Stock (e.g., Kodak Portra 400): "
set /p iso="ISO Used (e.g., Kodak 400 +1 would be 800, -1 would be 200): "
set /p lens="Lens(es) Used (e.g., Canon 50mm f/1.8, Nikon 35mm f/2): "
set /p lab="Lab/Scanner (e.g., UnderDogFilmLab): "
set /p title="Roll Name/Title (e.g., Astro, ~Nov 2025): "
echo.
echo Processing files...
echo.
REM Strip tracking/privacy data from both file types
C:\exiftool\exiftool -overwrite_original -gps:all= -xmpMM:all= *.tif *.jpg
REM Add metadata to both file types
C:\exiftool\exiftool -overwrite_original -DateTimeOriginal^<FileCreateDate -Marked=True -Copyright="Copyright 2025 Peter Youngdale. All rights reserved." -Creator="Peter Youngdale" -Artist="Peter Youngdale" -Model="%camera%" -Make="%filmstock%" -ISO="%iso%" -LensModel="%lens%" -Software="%lab%" -Title="%title%" *.tif *.jpg
echo.
echo Done!
pause