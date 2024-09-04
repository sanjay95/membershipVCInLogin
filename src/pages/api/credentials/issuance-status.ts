import { z } from 'zod'
import { use } from 'next-api-middleware'
import type { NextApiRequest, NextApiResponse } from 'next'

import { allowedHttpMethods } from '../middlewares/allowed-http-methods'
import { errorHandler } from '../middlewares/error-handler'
import { ApiError } from '../api-error'
import { logger } from '../logger'
import { StartIssuanceInput, StartIssuanceInputClaimModeEnum, StartIssuanceResponse,IssuanceStateResponse } from '@affinidi-tdk/credential-issuance-client'
import { CredentialsClient } from '../clients/issuance-client'


const issuanceStatusSchema = z
    .object({
        issuanceId: z.string(),
    })
    .strict()

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IssuanceStateResponse>
) {
    const {
        issuanceId,
    } = issuanceStatusSchema.parse(req.body)

    try {
        const apiData: string = issuanceId;

      
        const issuanceStatus = await CredentialsClient.IssuanceStatus(apiData);

        console.log('issuanceStatus post backend call', issuanceStatus)

        res.status(200).json(issuanceStatus)
    } catch (error: any) {
        logger.debug(
            { response: error.response?.data ?? error },
            'Issuance failed'
        )
        throw error
    }
}

export default use(allowedHttpMethods('POST'), errorHandler)(handler)