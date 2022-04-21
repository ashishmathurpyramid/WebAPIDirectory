const msal = require('@azure/msal-node');
const jwt = require('jsonwebtoken')
const jwksClient = require('jwks-rsa');

const DISCOVERY_KEYS_ENDPOINT = "https://login.microsoftonline.com/f0f1297e-a2cb-4a35-b105-ec9f361a0ba6/discovery/v2.0/keys";

const config = {
  auth: {
      clientId: "db4a38c4-ee93-4a89-adf3-26ee15f33e3e",
      authority: "https://login.microsoftonline.com/f0f1297e-a2cb-4a35-b105-ec9f361a0ba6",
      clientSecret: "E7V8Q~9BVr4Rd5BbLp1ZT4bVhmaGN0oIrxF0vaaI",
  },
  system: {
      loggerOptions: {
          loggerCallback(loglevel, message, containsPii) {
              console.log(message);
          },
          piiLoggingEnabled: false,
          logLevel: msal.LogLevel.Verbose,
      }
  }
};

const getSigningKeys = (header, callback) => {
  var client = jwksClient({
      jwksUri: DISCOVERY_KEYS_ENDPOINT
  });

  client.getSigningKey(header.kid, function (err, key) {
      var signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
  });
}

module.exports.validateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        
        const validationOptions = {
            audience: config.auth.clientId, // v2.0 token
            issuer: config.auth.authority + "/v2.0" // v2.0 token
        }

        jwt.verify(token, getSigningKeys, validationOptions, (err, payload) => {
            if (err) {
                console.log(err);
                return res.sendStatus(403);
            }

            next(res);
        });
    } else {
        res.sendStatus(401);
    }
};