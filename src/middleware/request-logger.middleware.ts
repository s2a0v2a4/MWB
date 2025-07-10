import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('User-Agent') || '';
    const referer = req.get('Referer') || '';
    const xForwardedFor = req.get('X-Forwarded-For') || '';
    const host = req.get('Host') || '';

    // Vite Proxy erkennen
    const isFromViteProxy = 
      host === 'localhost:5000' && 
      (referer.includes('localhost:3000') || userAgent.includes('node'));

    const proxyInfo = isFromViteProxy ? ' 🔄 [VITE-PROXY]' : ' 🌐 [DIRECT]';

    this.logger.log(
      `${method} ${originalUrl}${proxyInfo} - IP: ${ip || xForwardedFor} - UA: ${userAgent.substring(0, 50)}...`
    );

    // Optional: Zusätzliche Headers für Debugging
    if (process.env.NODE_ENV === 'development') {
      this.logger.debug(`Headers: ${JSON.stringify({
        'user-agent': userAgent,
        'referer': referer,
        'x-forwarded-for': xForwardedFor,
        'host': host,
        'origin': req.get('Origin')
      }, null, 2)}`);
    }

    next();
  }
}
