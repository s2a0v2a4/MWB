# 🚀 Produktions-Deployment Checklist

## Backend (NestJS)

### Environment Setup
- [ ] `.env.production` mit korrekten CORS URLs
- [ ] `NODE_ENV=production` gesetzt
- [ ] Port-Konfiguration (meist 5000 oder 8080)
- [ ] Logging Level auf `warn` oder `error`

### CORS Konfiguration
```typescript
// Für Produktion in main.ts
app.enableCors({
  origin: [
    'https://yourdomain.com',
    'https://www.yourdomain.com'
  ],
  credentials: true
});
```

### API Versioning & URL Schema
✅ **Einheitlicher Prefix**: `app.setGlobalPrefix('api')`
- Development: `/api/interests`
- Production: `/api/interests`
- Kein doppeltes 'api' in Controller-Dekoratoren!

```typescript
// ✅ Korrekt
@Controller('interests') // + globalPrefix = /api/interests

// ❌ Falsch  
@Controller('api/interests') // + globalPrefix = /api/api/interests
```

### Security Headers
- ✅ X-Content-Type-Options: nosniff
- ✅ X-Frame-Options: DENY  
- ✅ X-XSS-Protection: 1; mode=block

## Frontend (React/Vite)

### Produktion Build
```bash
npm run build
```

### API URLs anpassen
```javascript
// In production: absolute URLs
const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://api.yourdomain.com'
  : '/api';
```

### Vite Proxy (nur Development)
```javascript
// vite.config.js - Proxy nur für Development
export default defineConfig({
  server: {
    proxy: process.env.NODE_ENV === 'development' ? {
      '/api': 'http://localhost:5000'
    } : {}
  }
});
```

## Deployment Optionen

### Option 1: Separate Domains
- Frontend: `https://app.yourdomain.com`
- Backend: `https://api.yourdomain.com`
- CORS: Explizit konfiguriert

### Option 2: Reverse Proxy (Nginx)
```nginx
# nginx.conf
location /api/ {
    proxy_pass http://localhost:5000/;
}

location / {
    try_files $uri $uri/ /index.html;
}
```

### Option 3: Same Origin (empfohlen)
- Frontend und Backend unter derselben Domain
- `/api/*` → Backend
- `/*` → Frontend
- Kein CORS nötig

## Monitoring & Logging

### Request Logging
- ✅ User-Agent prüfen
- ✅ Referer Header analysieren
- ✅ IP-Adressen loggen
- ✅ Response Times messen

### Error Handling
```typescript
// Global Exception Filter
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    // Log errors in production
    // Return user-friendly messages
  }
}
```

## Performance

### Caching Headers
```typescript
// Für statische Daten
@Header('Cache-Control', 'public, max-age=3600')
@Get('interests/options')
getInterestOptions() {
  return this.staticInterestOptions;
}
```

### Rate Limiting
```typescript
// Install: npm install @nestjs/throttler
@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
})
```
