const jwt = require('jsonwebtoken')
const axios = require('axios')
const qs = require('qs')
const { readFileSync, writeFileSync } = require('fs')

const passphrase = 'This is passphrase used for sigining JWT payload'
const keyid = 'AppVerificationKey' // "AppVerificationKey" given at the time of executing affinidi create token command

const machineUserId = '4b14f758-d725-47bc-865a-6e176581edba' // "id" from affinidi create token command response
const projectId = "d085c5a5-5765-4d8f-b00e-398f0916a161" //Set project id

const tokenEndpoint = 'https://agitated-khorana-cu0jvycsug.projects.oryapis.com/oauth2/token'

const issueTimeS = Math.floor(new Date().getTime() / 1000)

async function getUserAccessToken() {
    const payload = {
        iss: machineUserId,
        sub: machineUserId,
        aud: tokenEndpoint,
        jti: new Date().toString(),
        exp: issueTimeS + 5 * 60,
        iat: issueTimeS,
    }
    const privateKey = readFileSync('private-key.pem')

    const token = jwt.sign(payload, {
        key: privateKey,
        passphrase
    }, {
        algorithm: 'RS256',
        keyid: keyid
    })

    const data = qs.stringify({
        'grant_type': 'client_credentials',
        'scope': 'openid',
        'client_assertion_type': 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
        'client_assertion': token,
        'client_id': machineUserId
    })
    const config = {
        method: 'post',
        url: tokenEndpoint,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: data
    }

    const a = await axios(config)
    return a.data.access_token
}

async function getProjectToken(userAccessToken) {
    const data = JSON.stringify({
        "projectId": projectId
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://apse1.api.affinidi.io/iam/v1/create-project-scoped-token',
        headers: {
            'Authorization': `Bearer ${userAccessToken}`,
            'Content-Type': 'application/json'
        },
        data: data
    };

    const a = await axios(config)
    return a.data.accessToken
}


async function main() {
    const userAccessToken = await getUserAccessToken()
    const projectAccessToken = await getProjectToken(userAccessToken)

    //console.log("userAccessToken", userAccessToken)
    //console.log("projectAccessToken: ", projectAccessToken)
    console.log("projectAccessToken is generated and written to token.txt file")

    writeFileSync('token.txt', projectAccessToken)

}

main()
    .catch(function (error) {
        console.log(error);
    });


