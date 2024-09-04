const wholeAddressVC = {
  "id": "vp_whole_address",
  "submission_requirements": [
    {
      "rule": "pick",
      "min": 1,
      "from": "A"
    }
  ],
  "input_descriptors": [
    {
      "id": "email_vc",
      "name": "Email VC",
      "purpose": "Check if data contains necessary fields",
      "group": [
        "A"
      ],
      "constraints": {
        "fields": [
          {
            "path": [
              "$.type"
            ],
            "purpose": "Check if VC type is correct",
            "filter": {
              "type": "array",
              "contains": {
                "type": "string",
                "pattern": "Email"
              }
            }
          },
          {
            "path": [
              "$.credentialSubject.email"
            ],
            "purpose": "Check if VC contains email field",
            "filter": {
              "type": "string"
            }
          }
        ]
      }
    },
    {
      "id": "country_vc",
      "name": "Country VC",
      "purpose": "Check if data contains necessary fields",
      "group": [
        "A"
      ],
      "constraints": {
        "fields": [
          {
            "path": [
              "$.type"
            ],
            "purpose": "Check if VC type is correct",
            "filter": {
              "type": "array",
              "contains": {
                "type": "string",
                "pattern": "HITCountry"
              }
            }
          },
          {
            "path": [
              "$.credentialSubject.country"
            ]
          }
        ]
      }
    },
    {
      "id": "postal_vc",
      "name": "Postal VC",
      "purpose": "Check if data contains necessary fields",
      "group": [
        "A"
      ],
      "constraints": {
        "fields": [
          {
            "path": [
              "$.type"
            ],
            "purpose": "Check if VC type is correct",
            "filter": {
              "type": "array",
              "contains": {
                "type": "string",
                "pattern": "HITPostalCode"
              }
            }
          },
          {
            "path": [
              "$.credentialSubject.postalCode"
            ]
          }
        ]
      }
    },
    {
      "id": "locality_vc",
      "name": "Locality VC",
      "purpose": "Check if data contains necessary fields",
      "group": [
        "A"
      ],
      "constraints": {
        "fields": [
          {
            "path": [
              "$.type"
            ],
            "purpose": "Check if VC type is correct",
            "filter": {
              "type": "array",
              "contains": {
                "type": "string",
                "pattern": "HITLocality"
              }
            }
          },
          {
            "path": [
              "$.credentialSubject.locality"
            ]
          }
        ]
      }
    },
    {
      "id": "address_vc",
      "name": "Address VC",
      "purpose": "Check if data contains necessary fields",
      "group": [
        "A"
      ],
      "constraints": {
        "fields": [
          {
            "path": [
              "$.type"
            ],
            "purpose": "Check if VC type is correct",
            "filter": {
              "type": "array",
              "contains": {
                "type": "string",
                "pattern": "HITStreetAddress"
              }
            }
          },
          {
            "path": [
              "$.credentialSubject.streetAddress"
            ]
          }
        ]
      }
    }
  ]
}

const livelinessCheck = {
  "id": "vp_livelinessCheck",
  "submission_requirements": [
    {
      "rule": "pick",
      "min": 1,
      "from": "A"
    }
  ],
  "input_descriptors": [
    {
      "id": "livenessCheckPassed_vc",
      "name": "LivenessCheckPassed VC",
      "purpose": "Check if data contains necessary fields",
      "group": [
        "A"
      ],
      "constraints": {
        "fields": [
          {
            "path": [
              "$.type"
            ],
            "purpose": "Check if VC type is correct",
            "filter": {
              "type": "array",
              "contains": {
                "type": "string",
                "pattern": "HITLivenessCheck"
              }
            }
          },
          {
            "path": [
              "$.credentialSubject.livenessCheckPassed"
            ]
          }
        ]
      }
    }
  ]
}

const personalDataVC = {
  "id": "vp_personal_data",
  "submission_requirements": [
    {
      "rule": "pick",
      "min": 1,
      "from": "A"
    }
  ],
  "input_descriptors": [
    {
      "id": "birthdate_vc",
      "name": "Birthdate VC",
      "purpose": "Check if data contains necessary fields",
      "group": [
        "A"
      ],
      "constraints": {
        "fields": [
          {
            "path": [
              "$.type"
            ],
            "purpose": "Check if VC type is correct",
            "filter": {
              "type": "array",
              "contains": {
                "type": "string",
                "pattern": "HITBirthdate"
              }
            }
          },
          {
            "path": [
              "$.credentialSubject.birthdate"
            ]
          }
        ]
      }
    },
    {
      "id": "gender_vc",
      "name": "Gender VC",
      "purpose": "Check if data contains necessary fields",
      "group": [
        "A"
      ],
      "constraints": {
        "fields": [
          {
            "path": [
              "$.type"
            ],
            "purpose": "Check if VC type is correct",
            "filter": {
              "type": "array",
              "contains": {
                "type": "string",
                "pattern": "HITGender"
              }
            }
          },
          {
            "path": [
              "$.credentialSubject.gender"
            ]
          }
        ]
      }
    }
  ]
}

//PEX for requesting email type VC
const emailVc = {
  id: 'vp_token_with_email_vc',
  input_descriptors: [
    {
      id: 'email_vc',
      name: 'Email VC',
      purpose: 'Check if VC data contains necessary fields',
      group: ['A'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Check if VC type is correct',
            filter: {
              type: 'array',
              contains: {
                type: 'string',
                pattern: 'Email',
              },
            },
          },
          {
            path: ['$.credentialSubject.email'],
            purpose: 'Check if VC contains email field',
            filter: {
              type: 'string',
            },
          },
          {
            path: ['$.issuer'],
            purpose: 'Check if VC Issuer is Trusted',
            filter: {
              type: 'string',
              pattern:
                '^did:key:zQ3shtMGCU89kb2RMknNZcYGUcHW8P6Cq3CoQyvoDs7Qqh33N|^did:elem:EiBb5gyC1mu3t31oYwMsYWg1U2HyNtaVQ0NKn5UkAzB8BQ',
            },
          },
        ],
      },
    },
  ],
}
const birthdateVC = {
  "id": "vp_birthdate",
  "submission_requirements": [
    {
      "rule": "pick",
      "min": 1,
      "from": "A"
    }
  ],
  "input_descriptors": [
    {
      "id": "birthdate_vc",
      "name": "Birthdate VC",
      "purpose": "Check if data contains necessary fields",
      "group": [
        "A"
      ],
      "constraints": {
        "fields": [
          {
            "path": [
              "$.type"
            ],
            "purpose": "Check if VC type is correct",
            "filter": {
              "type": "array",
              "contains": {
                "type": "string",
                "pattern": "HITBirthdate"
              }
            }
          },
          {
            "path": [
              "$.credentialSubject.birthdate"
            ]
          }
        ]
      }
    }
  ]
}

const shoppingOrdersVC = {
  id: 'vp_orderNumber',
  submission_requirements: [
    {
      rule: 'pick',
      min: 1,
      from: 'A',
    },
  ],
  input_descriptors: [
    {
      id: 'email_vc',
      name: 'Email VC',
      purpose: 'Check if VC data contains necessary fields',
      group: ['A'],
      constraints: {
        fields: [
          {
            path: ['$.type'],
            purpose: 'Check if VC type is correct',
            filter: {
              type: 'array',
              contains: {
                type: 'string',
                pattern: 'AnyOnlineOrder',
              },
            },
          },
          {
            path: ['$.credentialSubject.orderNumber'],
            purpose: 'Check if VC contains field',
            filter: {
              type: 'string',
            },
          }
        ],
      },
    }
  ],
}

export const presentationDefinitions = {
  emailVc,
  wholeAddressVC,
  livelinessCheck,
  personalDataVC,
  birthdateVC,
  shoppingOrdersVC
} as const
