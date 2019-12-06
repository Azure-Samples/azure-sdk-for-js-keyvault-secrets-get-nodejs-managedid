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
* [Node.js]
* [Git]
* An Azure subscription to create a Key Vault and other services(such as App Service) used in this sample. 
* An App registration to Authenticate.

If you don't have an Azure subscription or App registration, create a [free account] or [App registration] before you begin.

### Step 1: Create an Azure Key Vault and add a secret
* Create an [Azure Key Vault] from Azure Portal.
* [Add a secret].

### Step 2: Grant yourself Secret Management access to the Key Vault
From the Azure Portal, go to the Key Vault's access policies, and grant yourself **Secret Management** access to the Key Vault. This will allow you to run the application on your local development machine. 

* On your Key Vault **Settings** pages, Select **Access policies**.
* Click on **Add Access Policy**.
* Set **Configure from template (optional)** to **Secret Management**.
* Click on **Select Principal**, add your App registration.
* Click on **Add**.
* Click on **Save** to save the Access Policies.

## Local dev installation
1.  Clone the repository.

    ``` bash
    git clone https://github.com/Azure-Samples/app-service-msi-keyvault-node.git
    ```

2.  Run the following command to install dependencies for "SDK version 3" and "SDK version 4":

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

3.  Set up the following environment variables or replace these variables in the index.js file.

    Linux
    ``` bash
    export KEY_VAULT_URL = "<YourKeyVaultUrl>"
    export SECRET_NAME = "<YourSecretName>"
    export AZURE_TENANT_ID = "<YourTenantId>"
    export AZURE_CLIENT_ID = "<YourClientId>"
    export AZURE_CLIENT_SECRET = "<YourClientSecret>"
    ```

    Windows
    ``` cmd
    setx KEY_VAULT_URL "<YourKeyVaultUrl>"
    setx SECRET_NAME "<YourSecretName>"
    setx AZURE_TENANT_ID "<YourTenantId>"
    setx AZURE_CLIENT_ID "<YourClientId>"
    setx AZURE_CLIENT_SECRET "<YourClientSecret>"
    ```

4. Run the sample.

    ``` cmd
    node index.js
    ```

5. This sample exposes two endpoints:
  
   - `/ping` : This just answers "Hello World!!!" and is a good way to test if your packages are installed correctly without testing Azure itself.
   - `/` : This sample itself

## Deploy this sample to Azure
1.  Create a [Node.js Web App] in Azure.

2.  Set environment variables in the **Settings** > **Configuration** > **Application Settings** of your Web App. You can also change the value of the variables from `null` in the index.js file.

3.  This repository is ready to be deployed using local git. Read this tutorial to get more information on [how to push using local git through portal].

## Summary
The Web App was successfully able to get a secret at runtime from Azure Key Vault using your developer account during development, and using Azure Managed Identities when deployed to Azure, without any code change between local development environment and Azure. 
As a result, you did not have to explicitly handle a service principal credential to authenticate to Azure AD to get a token to call Key Vault. You do not have to worry about renewing the service principal credential either, since Azure Managed Identities takes care of that.

## Troubleshooting
### Common issues across environments:
* Access denied

The principal used does not have access to the Key Vault. The principal used in show on the web page. Grant that user (in case of developer context) or application **Get secret** access to the Key Vault. 

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
[App registration]: https://azure.microsoft.com/documentation/articles/resource-group-create-service-principal-portal/
[Azure Key Vault]:https://docs.microsoft.com/en-us/azure/key-vault/quick-create-portal
[Add a secret]: https://docs.microsoft.com/en-us/azure/key-vault/quick-create-portal#add-a-secret-to-key-vault
[Node.js]: https://nodejs.org/en/download/
[Git]: https://www.git-scm.com/
[Node.js Web App]: https://docs.microsoft.com/en-us/azure/app-service/app-service-web-get-started-nodejs
[how to push using local git through portal]: https://docs.microsoft.com/en-us/azure/app-service/app-service-deploy-local-git
[Microsoft Open Source Code of Conduct]: https://opensource.microsoft.com/codeofconduct/
[Code of Conduct FAQ]: https://opensource.microsoft.com/codeofconduct/faq/
[opencode@microsoft.com]: mailto:opencode@microsoft.com

