Write-Host "Starting EcoCart AI Microservices..." -ForegroundColor Green

Write-Host "Starting ML Service (Port 8000)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\nkv22\OneDrive\Desktop\Amazon\Amazon Green\ml-service'; .\venv\Scripts\activate; uvicorn api.app:app --reload"

Write-Host "Starting Node Backend (Port 5000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\nkv22\OneDrive\Desktop\Amazon\Amazon Green\backend'; npm run dev"

Write-Host "Starting React Frontend (Port 5173)..." -ForegroundColor Magenta
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\nkv22\OneDrive\Desktop\Amazon\Amazon Green\frontend'; npm run dev"

Write-Host "All services launching in separate windows! Give them a few seconds to start up." -ForegroundColor Green
