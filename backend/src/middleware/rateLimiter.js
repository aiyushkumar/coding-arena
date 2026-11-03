import rateLimit from 'express-rate-limit';

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again in 15 minutes.'
  }
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30, // 30 login/signup attempts per 15 min
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again in 15 minutes.'
  }
});

export const judgeLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // 20 code runs/submissions per minute per IP
  message: {
    success: false,
    message: 'Submission rate limit reached. Please wait a few seconds before testing or submitting again.'
  }
});

export const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 15, // 15 AI hint requests per minute
  message: {
    success: false,
    message: 'AI query rate limit reached. Please reflect on current hints and try again shortly.'
  }
});
