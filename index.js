const express = require('express');
const async = require('async');
const msRestAzure = require('ms-rest-azure');
const KeyVault = require('azure-keyvault');
const KeyVaultManagementClient = require('azure-arm-keyvault')
const KEY_VAULT_URI = "https://wilxkv.vault.azure.net/";

let app = express();
let clientId = process.env['CLIENT_ID']; // service principal
let domain = process.env['DOMAIN']; // tenant id
let secret = process.env['APPLICATION_SECRET'];

function get_key_vault_credentials(){
  if (process.env.APPSETTING_WEBSITE_SITE_NAME){
    return msRestAzure.loginWithAppServiceMSI();
  } else {
    return msRestAzure.loginWithServicePrincipalSecret(clientId, secret, domain);
  }
} 

function get_key_vault_secret(credentials) {
  let keyVaultClient = new KeyVault.KeyVaultClient(credentials);
  return keyVaultClient.getSecret(KEY_VAULT_URI, 'secret', "");
}

app.get('/', function (req, res) {
  get_key_vault_credentials().then(
    get_key_vault_secret
  ).then(function (secret){
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