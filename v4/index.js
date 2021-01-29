const express = require('express');
const { SecretClient } = require('@azure/keyvault-secrets');
const { DefaultAzureCredential } = require('@azure/identity');
const KEY_VAULT_URL = null || process.env['KEY_VAULT_URL'];
const SECRET_NAME = null || process.env['SECRET_NAME'];

let app = express();

function getKeyVaultCredentials() {
  return new DefaultAzureCredential();
}

function getKeyVaultSecret(credentials) {
  let keyVaultClient = new SecretClient(KEY_VAULT_URL, credentials);
  return keyVaultClient.getSecret(SECRET_NAME);
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

let port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server running at http://localhost:${port}`);
});