const express = require('express');
const KeyVaultSecret = require('@azure/keyvault-secrets');
const identity = require('@azure/identity');
const KEY_VAULT_URL = null || process.env['KEY_VAULT_URL'];

let app = express();

function getKeyVaultCredentials() {
  return new identity.DefaultAzureCredential();
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