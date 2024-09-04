import { z } from 'zod'
import { use } from 'next-api-middleware'
import type { NextApiRequest, NextApiResponse } from 'next'

import { allowedHttpMethods } from '../middlewares/allowed-http-methods'
import { errorHandler } from '../middlewares/error-handler'
import { verifierClient } from '../clients/verifier-client'
import { ApiError } from '../api-error'
import { logger } from '../logger'
import { apiKeyHash, verifierApiUrl, projectScopeToken } from 'src/utils/env'

type HandlerResponse = {
  isCompliant: boolean
}

const requestSchema = z
  .object({
    presentationDefinition: z.any(),
    presentationSubmission: z.any(),
    verifiablePresentation: z.any(),
  })
  .strict()

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerResponse>
) {
  const {
    verifiablePresentation,
    presentationDefinition,
    presentationSubmission,
  } = requestSchema.parse(req.body)

  // TODO: add proper check for fitness data
  
  if (verifierApiUrl && (apiKeyHash || projectScopeToken)) {
    try {
      const verificationResult = await verifierClient.verifyPresentation({
        verifiablePresentation,
        presentationDefinition,
        presentationSubmission,
      })

      console.log('verificationResult', verificationResult)

      if (!verificationResult.isValid) {
        throw new ApiError({
          code: 'INVALID_VP_TOKEN',
          context: { errors: verificationResult.errors },
        })
      }
    } catch (error: any) {
      logger.debug(
        { response: error.response?.data ?? error },
        'Verification failed'
      )
      throw error
    }
  } else {
    // you might want to add your custom checks of VP token here
    logger.warn('VP token is not being verified due to missing env variables, so skipping verification')
  }

  res.status(200).json({ isCompliant: true })
}

export default use(allowedHttpMethods('POST'), errorHandler)(handler)
