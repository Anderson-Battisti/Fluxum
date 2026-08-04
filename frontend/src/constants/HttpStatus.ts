/**
 * 
 * @author Anderson Battisti
 */
export const HttpStatus = 
{
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    GONE: 410,
    UNPROCESSABLE_CONTENT: 422,
    TOO_MANY_REQUESTS: 429
} as const;
