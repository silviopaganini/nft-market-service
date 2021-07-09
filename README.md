# NFT Market AWS Serverless Lambda Service 

![GitHub](https://img.shields.io/github/license/silviopaganini/nft-market-service?style=round)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=round)](https://github.com/prettier/prettier)
![](https://img.shields.io/badge/Typescript-💪-blue)

To use together with [NFT Marketplace](https://github.com/silviopaganini/nft-market)

## Installation

Make sure you have serverless installed 

```
npm install serverless -g
npm install
```

## Setup

env file required

```yml
IPFS_HOST: ipfs.infura.io
IPFS_PROTOCOL: https
IPFS_PORT: 5001
APIETHERSCAN: 
DOMAIN_NAME: your.domain.for.your.api.com
CERTIFICATE_ARN: 
ZONE_ID: 
IPFS_INFURA_PROJECT_ID: 
IPFS_INFURA_SECRET:
```

## Running locally sls offline 

```
npm start
```
