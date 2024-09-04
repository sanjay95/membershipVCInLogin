
# Generate Project Scope token(PST) from Personal Access Token(PAT)
This file helps you to creates Personal Access Token(machine user) and generates project scope token which will be used to call Affinidi API's

**If these steps are already completed and just want to generate new project scope token, then directly jump to [step 4 of section here](#generate-project-scope-token)**

Open the Git bash terminal to this current folder and follow the steps

## Generate RSA KeyPair
Generates RSA public and private key pair.

Note: Keep your private key file safe and don't share to anyone 

1. Generate Private Key pair using openssl
```
openssl genpkey -algorithm RSA -out private-key.pem
```
2. Generate Public key for the above private key
```
openssl rsa -in private-key.pem -out public-key.pem
```


## Affinidi Start
To make interaction with affinidi CLI tool, you need to login first
1. Below CLI command will take you login flow, provide your consent to share email in Affindi Vault
```
affinidi start
```
2. Below is sample response post login, keep note of `project id` for which you need to generate scoped token
```
$ affinidi start

Attempting to automatically open the SSO authorization page in your default browser.

If the browser doesn't open automatically, or if your default browser isn't Google Chrome, please open the following URL in the Chrome browser:

https://euw1.elements.auth.affinidi.io/oauth2/auth?response_type=code&client_id=....

Authenticating in browser... Authenticated successfully!

Setting your active project...

Your active project has been set to the project Default Project with ID d085c5a5-5765-4d8f-b00e-398f0916a161

If you want to change the active project, please follow these steps:

💡 To list all your projects run: affinidi project list-projects

💡 To change the active project run: affinidi project select-project -i <project-id>
```

## Create Personal Access Token (PAT)
Using affinidi CLI tool we create Personal Access Token, which stores your public key into Affinidi server which will be used for verifying API requests.
1. Create PAT by giving a key name, key id and public key file generated from previous step
```
affinidi token create-token --name="My PAT" --key-id="AppVerificationKey" --public-key-file="public-key.pem"
```
2. Above step creates token and gives you below sample response, keep note of `"id"` which is nothing but `machineUserId`
```
{
  "id": "4b14f758-d725-47bc-865a-6e176581edba",
  "ari": "ari:iam:::machine_user/4b14f758-d725-47bc-865a-6e176581edba",
  "ownerAri": "ari:iam:::user/7ab4d4d5-8139-4e76-9813-3a4fecae9b5f",
  "name": "My PAT",
  "scopes": [
    "openid",
    "offline_access"
  ],
  "authenticationMethod": {
    "type": "PRIVATE_KEY",
    "signingAlgorithm": "RS256",
    "publicKeyInfo": {
      "jwks": {
        "keys": [
          {
            "use": "sig",
            "kty": "RSA",
            "kid": "AppVerificationKey",
            "alg": "RS256",
            "n": "88pRznvsy_F8Zu5MoI....",
            "e": "AQAB"
          }
        ]
      }
    }
  }
}
```
3. In case if you want to get token id again, execute to below command
```
affinidi token list-tokens
```

## Create Policy for PAT to access the Project
We have created PAT, and there is already default project created. Now we have to provide access permission for PAT to generate project token
1. Create IAM policy for the PAT, replace `machineUserId` with actual machine user id
```
affinidi iam add-principal -i machineUserId -t machine_user

```
Sample command
```
affinidi iam add-principal -i 4b14f758-d725-47bc-865a-6e176581edba -t machine_user
``` 
2. Get the created policy for the PAT and save to file `policy.json`, replace `machineUserId` with actual machine user id
```
affinidi iam get-policies -i machineUserId > policy.json
```
3. Open the file `policy.json` and update the file with full access for all `actions` and `resource` by giving `*`
Sample policy post updating access
```
{
    "version": "2022-12-15",
    "statement": [
      {
        "principal": [
          "ari:iam::d085c5a5-5765-4d8f-b00e-398f0916a161:machine_user/4b14f758-d725-47bc-865a-6e176581edba"
        ],
        "action": [
          "*"
        ],
        "resource": [
          "*"
        ],
        "effect": "Allow"
      }
    ]
  }
```
4. Execute the below command to update the policy by giving the policy file created in previous step, replace `machineUserId` with actual machine user id
```
affinidi iam update-policies -i machineUserId -t machine_user -f policy.json
```
## Generate Project scope token
We have created a simple node script which generates project scope token for you.
1. Open the file `generate-project-scope-token.js` in vs-code 
2. Set `machineUserId` variable value with the value of "id" from affinidi create token command response in previous step
3. Set `projectId` variable value with the value got during affinidi start command from previous step
4. After updating the above values, run the program
```
node generate-project-scope-token.js
``` 
5. Above command generates project scope token and writes the token to a file `token.txt`
6. Copy the token and use it whereever needed
Note: Token will expire in 1hr