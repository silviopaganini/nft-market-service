import { APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'
import fetch from 'node-fetch'
import IpfsClient from 'ipfs-http-client'

const mint: APIGatewayProxyHandler = async (event, _context) => {
  try {
    const { objectsToBeMinted } = JSON.parse(event.body)
    if (!objectsToBeMinted) {
      throw new Error('No objects to be minted')
    }

    const {
      IPFS_HOST,
      IPFS_PROTOCOL,
      IPFS_PORT,
      IPFS_INFURA_PROJECT_ID,
      IPFS_INFURA_SECRET,
    } = process.env

    const client = IpfsClient({
      host: IPFS_HOST,
      port: Number(IPFS_PORT),
      protocol: IPFS_PROTOCOL,
      headers: {
        authorization: `Basic ${Buffer.from(
          IPFS_INFURA_PROJECT_ID + ':' + IPFS_INFURA_SECRET
        ).toString('base64')}`,
      },
    })

    const objectsIPFS: string[] = await Promise.all(
      objectsToBeMinted.map(async name => {
        try {
          const buffer = Buffer.from(
            await (await fetch(`https://robohash.org/${name}.png`)).arrayBuffer(),
            'base64'
          )

          const { path } = await client.add({
            content: buffer,
          })

          return { path, name }
        } catch (e) {
          throw new Error(e)
        }
      })
    )

    return {
      statusCode: 200,
      body: JSON.stringify(objectsIPFS),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  } catch (e) {
    console.log(e)

    return {
      statusCode: 500,
      body: JSON.stringify(e),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  }
}

export default mint
