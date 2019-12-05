const express = require('express');
const KeyVaultSecret = require('@azure/keyvault-secrets');
const identity = require('@azure/identity');
const KEY_VAULT_URL = null || process.env['KEY_VAULT_URL'];

let app = express();
let clientId = null || process.env['AZURE_CLIENT_ID']; // service principal
let tenantId = null || process.env['AZURE_TENANT_ID']; // tenant id
let clientSecret = null || process.env['AZURE_CLIENT_SECRET'];

function getKeyVaultCredentials() {
  return new identity.ClientSecretCredential(tenantId,clientId,clientSecret);
}

function getKeyVaultSecret(credentials) {
  let keyVaultClient = new KeyVaultSecret.SecretClient(KEY_VAULT_URL, credentials);
  return keyVaultClient.getSecret('secret');
}

app.get('/', function (req, res) {
  let credentials = getKeyVaultCredentials();
  getKeyVaultSecret(credentials)
    .then(function (secret) {
      res.send(`Your secret value is: ${secret.value}.`);
    }).catch(function (err) {
      res.send(err);
    });
});

app.get('/ping', function (req, res) {
  res.send('Hello World!!!');
});

let port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server running at http://localhost:${port}`);
});