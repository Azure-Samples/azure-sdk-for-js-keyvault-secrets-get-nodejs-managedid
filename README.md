---
page_type: sample
languages:
- javascript
products:
- azure-app-service
- azure-key-vault
description: "How to set and get secrets from Azure Key Vault with Azure Managed Identities and JavaScript."
urlFragment: get-set-keyvault-secrets-managed-id-javascript
---

# How to set and get secrets from Azure Key Vault with Azure Managed Identities and JavaScript.

## SDK Versions
In this sample, you will find the following folders:
* **v3** - references Key Vault SDK v3
* **v4** - references Key Vault SDK v4

## Prerequisites
To run and deploy this sample, you need the following:
* An Azure subscription to create an App Service and a Key Vault. 
* An App registration to Authenticate.

If you don't have an Azure subscription or App registrations, create a [free account] or [App registrations] before you begin.

### Step 1: Create an Azure Key Vault and add a secret
* Create an [Azure Key Vault] using Azure Portal.
* [add a secret] named **"secret"**.

### Step 2: Grant yourself data plane access to the Key Vault
Using the Azure Portal, go to the Key Vault's access policies, and grant yourself **Secret Management** access to the Key Vault. This will allow you to run the application on your local development machine. 

* Search for your Key Vault in "Search Resources dialog box" in Azure Portal.
* Select `Settings` > `Access policies`.
* Click on `Add Access Policy`.
* Set `Configure from template (optional)` to **Secret Management**.
* Click on `Select Principal`, add your App registration.
* Click on `Add`.
* Click on `Save` to save the Access Policies.

### Step 3: Create an [Azure Web App]

## Local dev installation
1.  If you don't already have it, [get Node.js].

2.  Clone the repository.

    ``` bash
    git clone https://github.com/Azure-Samples/app-service-msi-keyvault-node.git
    ```

3.  Run the following command to install dependencies for "SDK version 3" and "SDK version 4":

    - SDK version 4

    ``` cmd
    cd v4
    npm install
    ```

    - SDK version 3

    ``` cmd
    cd v3
    npm install
    ```

4.  Set up the following environment variables or replace these variables in the index.js file.

    Linux
    ``` bash
    export KEY_VAULT_URL = "<YourKeyVaultUrl>"
    export AZURE_TENANT_ID = "<YourTenantId>"
    export AZURE_CLIENT_ID = "<YourClientId>"
    export AZURE_CLIENT_SECRET = "<YourClientSecret>"
    ```

    Windows
    ``` cmd
    setx KEY_VAULT_URL "<YourKeyVaultUrl>"
    setx AZURE_TENANT_ID "<YourTenantId>"
    setx AZURE_CLIENT_ID "<YourClientId>"
    setx AZURE_CLIENT_SECRET "<YourClientSecret>"
    ```

5. Run the sample.

    ``` cmd
    node index.js
    ```

6. This sample exposes two endpoints:
  
   - `/ping` : This just answers "Hello World!!!" and is a good way to test if your packages are installed correctly without testing Azure itself.
   - `/` : This sample itself

## Deploy this sample to Azure
1. Set environment variables using the `Settings` > `Configuration` > `Application Settings` of your WebApp. You can also change the value of the variables from `null` in the index.js file.

2. This repository is ready to be deployed using local git. Read this tutorial to get more information on [how to push using local git through portal].

## Summary
The web app was successfully able to get a secret at runtime from Azure Key Vault using your developer account during development, and using Azure Managed Identities when deployed to Azure, without any code change between local development environment and Azure. 
As a result, you did not have to explicitly handle a service principal credential to authenticate to Azure AD to get a token to call Key Vault. You do not have to worry about renewing the service principal credential either, since Azure Managed Identities takes care of that.

## Troubleshooting
### Common issues across environments:
* Access denied

The principal used does not have access to the Key Vault. The principal used in show on the web page. Grant that user (in case of developer context) or application "Get secret" access to the Key Vault. 

## Contributing
This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct]. For more information see the [Code of Conduct FAQ] or contact [opencode@microsoft.com] with any additional questions or comments.

<!-- LINKS -->
[free account]: https://azure.microsoft.com/free/?WT.mc_id=A261C142F
[App registrations]: https://azure.microsoft.com/documentation/articles/resource-group-create-service-principal-portal/
[Azure Key Vault]:https://docs.microsoft.com/en-us/azure/key-vault/quick-create-portal
[add a secret]: https://docs.microsoft.com/en-us/azure/key-vault/quick-create-portal#add-a-secret-to-key-vault
[Azure Web App]: https://docs.microsoft.com/en-us/azure/app-service/app-service-web-get-started-nodejs
[get Node.js]: https://nodejs.org
[how to push using local git through portal]: https://docs.microsoft.com/en-us/azure/app-service/app-service-deploy-local-git
[Microsoft Open Source Code of Conduct]: https://opensource.microsoft.com/codeofconduct/
[Code of Conduct FAQ]: https://opensource.microsoft.com/codeofconduct/faq/
[opencode@microsoft.com]: mailto:opencode@microsoft.com

