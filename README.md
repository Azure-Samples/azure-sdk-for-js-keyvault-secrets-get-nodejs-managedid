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

## Background
For Service-to-Azure-Service authentication, the approach so far involved creating an Azure AD application and associated credential, and using that credential to get a token. While this approach works well, there are two shortcomings:
1. The Azure AD application credentials are typically hard coded in source code. Developers tend to push the code to source repositories as-is, which leads to credentials in source.
2. The Azure AD application credentials expire, and so need to be renewed, else can lead to application downtime.

With [Managed Service Identity (MSI)], both these problems are solved. This sample shows how a Web App can authenticate to Azure Key Vault without the need to explicitly create an Azure AD application or manage its credentials. 

>Here's another sample that how to use MSI from inside an Azure VM with a Managed Service Identity (MSI) - https://github.com/Azure-Samples/resource-manager-node-manage-resources-with-msi

## Prerequisites
To run and deploy this sample, you need the following:
* An Azure subscription to create an App Service and a Key Vault. 

If you don't have an Azure subscription, create a [free account] before you begin.

### Step 1: Create an App Service with a Managed Service Identity (MSI)
<a href="https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2FAzure-Samples%2Fapp-service-msi-keyvault-node%2Fmaster%2Fazuredeploy.json" target="_blank">
    <img src="http://azuredeploy.net/deploybutton.png"/>
</a>

Use the "Deploy to Azure" button to deploy an ARM template to create the following resources:
* App Service with MSI.
* Key Vault with a secret, and an access policy that grants the App Service access to `Get Secrets`.

> Note: When filling out the template you will see a textbox labelled `Key Vault Secret`. Enter a secret value there. A secret with the name `secret` and value from what you entered will be created in the Key Vault.

Review the resources created using the Azure portal. You should see an App Service and a Key Vault. View the access policies of the Key Vault to see that the App Service has access to it. 

### Step 2: Grant yourself data plane access to the Key Vault
Using the Azure Portal, go to the Key Vault's access policies, and grant yourself **Secret Management** access to the Key Vault. This will allow you to run the application on your local development machine. 

* Search for your Key Vault in "Search Resources dialog box" in Azure Portal.
* Select `Settings` > `Access policies`.
* Click on `Add Access Policy`.
* Set `Configure from template (optional)` to **Secret Management**.
* Set `Secret permissions` to **Select all**.
* Click on `Select Principal`, add your Application.
* Click on `Add`.
* Click on `Save` to save the Access Policies.

You can also create an Azure service principal either through
[Azure CLI], [PowerShell] or [Azure Portal] and grant it the same access.

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
   - `/` : The MSI sample itself

## Installation on Azure
1. Set environment variables using the `Settings` > `Configuration` > `Application Settings` of your WebApp. You can also change the value of the variables from `null` in the index.js file.

2. This repository is ready to be deployed using local git. Read this tutorial to get more information on [how to push using local git through portal].

## Summary
The web app was successfully able to get a secret at runtime from Azure Key Vault using your developer account during development, and using MSI when deployed to Azure, without any code change between local development environment and Azure. 
As a result, you did not have to explicitly handle a service principal credential to authenticate to Azure AD to get a token to call Key Vault. You do not have to worry about renewing the service principal credential either, since MSI takes care of that.

## Azure Functions
Azure Functions being powered by Azure WebApp, MSI is also available. You can copy the relevant code from the example into your Azure Functions with the right import.

## Troubleshooting

### Common issues when deployed to Azure App Service:
* MSI is not setup on the App Service. 

Check the environment variables MSI_ENDPOINT and MSI_SECRET exist using [Kudu debug console]. If these environment variables do not exist, MSI is not enabled on the App Service. Note that after enabling MSI, you need to restart your WebApp.

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

This project has adopted the [Microsoft Open Source Code of Conduct].
For more information see the [Code of Conduct FAQ] or
contact [opencode@microsoft.com] with any additional questions or comments.

<!-- LINKS -->
[Managed Service Identity (MSI)]: https://docs.microsoft.com/en-us/azure/app-service/app-service-managed-service-identity
[free account]: https://azure.microsoft.com/free/?WT.mc_id=A261C142F
[Azure CLI]: https://azure.microsoft.com/documentation/articles/resource-group-authenticate-service-principal-cli/
[PowerShell]: https://azure.microsoft.com/documentation/articles/resource-group-authenticate-service-principal/
[Azure Portal]: https://azure.microsoft.com/documentation/articles/resource-group-create-service-principal-portal/
[get Node.js]: https://nodejs.org
[how to push using local git through portal]: https://docs.microsoft.com/en-us/azure/app-service/app-service-deploy-local-git
[Kudu debug console]: https://azure.microsoft.com/en-us/resources/videos/super-secret-kudu-debug-console-for-azure-web-sites/
[Microsoft Open Source Code of Conduct]: https://opensource.microsoft.com/codeofconduct/
[Code of Conduct FAQ]: https://opensource.microsoft.com/codeofconduct/faq/
[opencode@microsoft.com]: mailto:opencode@microsoft.com

