const express = require('express');
const msRestAzure = require('ms-rest-azure');
const KeyVault = require('azure-keyvault');
const KEY_VAULT_URL = null || process.env['KEY_VAULT_URL'];
const SECRET_NAME = null || process.env['SECRET_NAME'];
const SECRET_VERSION = null || process.env['SECRET_VERSION'];

let app = express();
let clientId = null || process.env['AZURE_CLIENT_ID']; // service principal
let tenantId = null || process.env['AZURE_TENANT_ID']; // tenant id
let clientSecret = null || process.env['AZURE_CLIENT_SECRET'];

function getKeyVaultCredentials(){
  return new msRestAzure.ApplicationTokenCredentials(clientId, tenantId, clientSecret);
}

function getKeyVaultSecret(credentials) {
  let keyVaultClient = new KeyVault.KeyVaultClient(credentials);
  return keyVaultClient.getSecret(KEY_VAULT_URL, SECRET_NAME, SECRET_VERSION);
}

app.get('/', function (req, res) {
  getKeyVaultCredentials().then(
    getKeyVaultSecret
  ).then(function (secret){
    res.send(`Your secret value is: ${secret.value}.`);
  }).catch(function (err) {
    res.send(err);
  });
});

let port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server running at http://localhost:${port}`);
});