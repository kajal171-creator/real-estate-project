import {auth} from 'express-oauth2-jwt-bearer'

const jwtCheck = auth({
  audience: "http://localhost:8000",
  issuerBaseURL: "https://dev-sze4oy0k2spye4se.us.auth0.com",
  tokenSigningAlg: "RS256"
});

app.get('/protected', jwtCheck, (req, res) => {
  // This endpoint is only accessible with a valid JWT token
  res.json({ message: 'Hello, authenticated user!' });
});

export default jwtCheck;