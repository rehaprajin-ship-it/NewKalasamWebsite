Add-Type -AssemblyName System.Drawing

$srcPath = "d:\MY PROJECTS\New Kalasam\kalasam-temp\public\jaikrishna-logo.png"
$dstWhite = "d:\MY PROJECTS\New Kalasam\kalasam-temp\public\jaikrishna-logo-white-bg.png"
$dstWhiteImg = "d:\MY PROJECTS\New Kalasam\kalasam-temp\public\images\jaikrishna-logo-white-bg.png"
$dstFavicon192 = "d:\MY PROJECTS\New Kalasam\kalasam-temp\public\favicon-192.png"
$dstFavicon32 = "d:\MY PROJECTS\New Kalasam\kalasam-temp\public\favicon-32.png"
$dstFaviconIco = "d:\MY PROJECTS\New Kalasam\kalasam-temp\public\favicon.ico"
$dstAppIcon = "d:\MY PROJECTS\New Kalasam\kalasam-temp\src\app\icon.png"
$dstAppAppleIcon = "d:\MY PROJECTS\New Kalasam\kalasam-temp\src\app\apple-icon.png"

$src = [System.Drawing.Image]::FromFile($srcPath)

# 1. Full-size logo with white background
$bmpWhite = New-Object System.Drawing.Bitmap($src.Width, $src.Height)
$gWhite = [System.Drawing.Graphics]::FromImage($bmpWhite)
$gWhite.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gWhite.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gWhite.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$gWhite.Clear([System.Drawing.Color]::White)
$gWhite.DrawImage($src, 0, 0, $src.Width, $src.Height)

$bmpWhite.Save($dstWhite, [System.Drawing.Imaging.ImageFormat]::Png)
$bmpWhite.Save($dstWhiteImg, [System.Drawing.Imaging.ImageFormat]::Png)
$bmpWhite.Save("d:\MY PROJECTS\New Kalasam\jaikrishna-logo-white-bg.png", [System.Drawing.Imaging.ImageFormat]::Png)

# 2. Square favicon with white background (e.g. 512x512 with proper padding so logo looks centered and crisp)
$favSize = 512
$bmpFav = New-Object System.Drawing.Bitmap($favSize, $favSize)
$gFav = [System.Drawing.Graphics]::FromImage($bmpFav)
$gFav.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gFav.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gFav.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$gFav.Clear([System.Drawing.Color]::White)

# Calculate aspect fit
$scale = [Math]::Min(($favSize * 0.82) / $src.Width, ($favSize * 0.82) / $src.Height)
$drawW = [int]($src.Width * $scale)
$drawH = [int]($src.Height * $scale)
$drawX = [int](($favSize - $drawW) / 2)
$drawY = [int](($favSize - $drawH) / 2)

$gFav.DrawImage($src, $drawX, $drawY, $drawW, $drawH)

$bmpFav.Save($dstFavicon192, [System.Drawing.Imaging.ImageFormat]::Png)
$bmpFav.Save($dstAppIcon, [System.Drawing.Imaging.ImageFormat]::Png)
$bmpFav.Save($dstAppAppleIcon, [System.Drawing.Imaging.ImageFormat]::Png)
$bmpFav.Save("d:\MY PROJECTS\New Kalasam\favicon-512.png", [System.Drawing.Imaging.ImageFormat]::Png)

# 3. Small 32x32 favicon
$bmp32 = New-Object System.Drawing.Bitmap(32, 32)
$g32 = [System.Drawing.Graphics]::FromImage($bmp32)
$g32.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g32.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g32.Clear([System.Drawing.Color]::White)
$scale32 = [Math]::Min((32 * 0.88) / $src.Width, (32 * 0.88) / $src.Height)
$drawW32 = [int]($src.Width * $scale32)
$drawH32 = [int]($src.Height * $scale32)
$drawX32 = [int]((32 - $drawW32) / 2)
$drawY32 = [int]((32 - $drawH32) / 2)
$g32.DrawImage($src, $drawX32, $drawY32, $drawW32, $drawH32)
$bmp32.Save($dstFavicon32, [System.Drawing.Imaging.ImageFormat]::Png)

# Save ICO
$hIcon = $bmp32.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($hIcon)
$fs = New-Object System.IO.FileStream($dstFaviconIco, [System.IO.FileMode]::Create)
$icon.Save($fs)
$fs.Close()
Copy-Item $dstFaviconIco -Destination "d:\MY PROJECTS\New Kalasam\favicon.ico" -Force
Copy-Item $dstFaviconIco -Destination "d:\MY PROJECTS\New Kalasam\kalasam-temp\src\app\favicon.ico" -Force

$gWhite.Dispose()
$bmpWhite.Dispose()
$gFav.Dispose()
$bmpFav.Dispose()
$g32.Dispose()
$bmp32.Dispose()
$src.Dispose()

Write-Host "All logo and favicon variations generated successfully!"
