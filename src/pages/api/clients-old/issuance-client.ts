import { z } from 'zod'
import { use } from 'next-api-middleware'
import type { NextApiRequest, NextApiResponse } from 'next'

import { allowedHttpMethods } from '../middlewares/allowed-http-methods'
import { errorHandler } from '../middlewares/error-handler'
import { credentialsClient } from '../clients/issuance-client'
import { ApiError } from '../api-error'
import { logger } from '../logger'
import { apiGatewayUrl } from 'src/utils/env'

type HandlerResponse = {
    credentialOfferUri: string
    issuanceId: string
    expiresIn: number
    txCode: string
}

const webinarRequestSchema = z
    .object({       
        tierLevel: z.string(),
        frequentFlyerNumber: z.string(),
        expiryDate: z.string(),
        airline: z.string(),
        holderDid: z.string(),
    })
    .strict()

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<HandlerResponse>
) {
    const {
        tierLevel,
        frequentFlyerNumber,
        expiryDate,
        airline,
        holderDid,
    } = webinarRequestSchema.parse(req.body)

    if (apiGatewayUrl) {
        try {
            const issuanceResult = await credentialsClient.startCredentialIssuance({
                tierLevel,
                frequentFlyerNumber,
                expiryDate,
                airline,
                holderDid,
            })

            console.log('issuanceResult post backend call', issuanceResult)

            res.status(200).json(issuanceResult)
        } catch (error: any) {
            logger.debug(
                { response: error.response?.data ?? error },
                'Issuance failed'
            )
            throw error
        }
    } else {
        // you might want to add your custom checks of VP token here
        throw new ApiError({
            code: 'INVALID_ISSUANCE_REQUEST',
            context: { message: 'Invalid request' },
        })
    }
}

export default use(allowedHttpMethods('POST'), errorHandler)(handler)