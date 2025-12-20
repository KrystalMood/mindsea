// Simple in-memory rate limiter for API abuse prevention
// In production, consider using Redis or a proper rate limiting service

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const limitStore = new Map<string, RateLimitEntry>();

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of limitStore.entries()) {
    if (now > entry.resetAt) {
      limitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Check if a request should be rate limited
 * @param key - Unique identifier (IP address, user ID, etc.)
 * @param config - Rate limit configuration
 * @returns RateLimitResult with allowed status and remaining quota
 */
export function checkRateLimit(
  key: string,
  config: RateLimitConfig = { maxRequests: 10, windowMs: 10 * 60 * 1000 } // 10 requests per 10 minutes
): RateLimitResult {
  const now = Date.now();
  const entry = limitStore.get(key);

  if (!entry || now > entry.resetAt) {
    // Create new entry
    const resetAt = now + config.windowMs;
    limitStore.set(key, { count: 1, resetAt });
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetAt,
    };
  }

  // Existing entry - check if limit exceeded
  if (entry.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
    };
  }

  // Increment count
  entry.count++;
  limitStore.set(key, entry);

  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    resetAt: entry.resetAt,
  };
}

/**
 * Get client IP from request headers (considering proxies)
 */
export function getClientIp(request: Request): string {
  // Check common proxy headers
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  // Fallback to a default (should not happen in production)
  return "unknown";
}
