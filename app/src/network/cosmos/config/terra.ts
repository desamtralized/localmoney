import type { CosmosConfig, HubInfo } from '~/network/cosmos/config'

export const TERRA_CONFIG: CosmosConfig = {
  chainId: 'phoenix-1',
  chainName: 'Terra Mainnet',
  lcdUrl: 'https://phoenix-lcd.terra.dev/',
  rpcUrl: 'https://rpc-terra2.whispernode.com/',
  addressPrefix: 'terra',
  coinDenom: 'LUNA',
  coinMinimalDenom: 'uluna',
  coinDecimals: 6,
}

export const TERRA_HUB_INFO: HubInfo = {
  hubAddress: 'terra14cp24g4w2kf4d2ue4a72crlhtlwkppuq6tgjzhlm7hcv5kxxk3yslg5h3e',
  hubConfig: {
    offer_addr: 'terra1zkx9a2gark930artques4lsrvn4l2yvcqls0t7scpswrdscsuvvqqs2szp',
    trade_addr: 'terra1mlrcxtf8umlkcm0dm4pd390xajr689222xnreqe849thqlc7k2wsha3ljh',
    profile_addr: 'terra15xj39x0j348wj6vgjprzxep9z4a0462ttxtj8d3n29v9rmtzvngqyvylts',
    local_market_addr: 'terra17aavvyyj6t6t66ce75d3j24vxzv688z2vhscsx4ypgtlq0kf0n4q68ay00',
    local_denom: { native: 'ibc/7C5F3D31658C890C44A9FC2FDD5EB68242C33D851BA169DBEC37587A8F50B3D3' },
  },
}
