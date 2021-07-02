import { APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'
import { tokenProps } from '../db'

const token: APIGatewayProxyHandler = async (event, _context) => {
  try {
    if (
      event.pathParameters?.id &&
      event.pathParameters?.id.length > 0 &&
      !JSON.stringify(tokenProps[event.pathParameters.id])
    ) {
      throw new Error('Token not found')
    }

    return {
      statusCode: 200,
      body:
        event.pathParameters?.id && event.pathParameters?.id.length > 0
          ? JSON.stringify(tokenProps[event.pathParameters.id])
          : JSON.stringify(tokenProps),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  }
}

export default token
