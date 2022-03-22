 import jwt from 'express-jwt';  
import jwksRsa from 'jwks-rsa';  

export const checkJwt = jwt({
    
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-uvuzhhsk.us.auth0.com/.well-known/jwks.json'
      }),
    
      audience: process.env.AUTH0_AUDIENCE,
      issuer: process.env.AUTH0_ISSUER,
      algorithms: ["RS256"],  
});



