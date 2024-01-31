import type { CosmosConfig, HubInfo } from '~/network/cosmos/config'

export const NEUTRON_CONFIG: CosmosConfig = {
  chainId: 'neutron-1',
  chainName: 'Neutron',
  lcdUrl: 'https://neutron-lcd.publicnode.com/',
  rpcUrl: 'https://neutron-rpc.publicnode.com/',
  addressPrefix: 'neutron',
  coinDenom: '',
  coinMinimalDenom: '',
  coinDecimals: 6,
}

export const NEUTRON_HUB_INFO: HubInfo = {
  hubAddress: 'neutron1he3xsn0nakjrp9r6zpvmrt5t3f28arhwanpdlqfe2ua2yykz809swmtzc6',
  hubConfig: {
    offer_addr: 'neutron1ak9khwzjwqaenqk6edxm8ms3smk0f747zms7un3wrq7qrkkfunvs663sc7',
    trade_addr: 'neutron1pdm0n7ac09drjaxz7nkt4mfle3sdagmuyany4ny7ywxegue2ysdshrakkq',
    profile_addr: 'neutron1pe2r943m30pl7qdn600klpnn32y72rlafyjjs6qly345wnazphmqgvcjpp',
    price_addr: 'neutron1vqnt6mwypq5e793pndsw0as7whxga6zu7gwu9ufwggc70fvwxavsj547lx',
    price_provider_addr: 'neutron1gkec5sqldd822qxjn5wxvxwef7pw3v0y0wnw8s',
    local_market_addr: 'neutron1e22zh5p8meddxjclevuhjmfj69jxfsa8uu3jvht72rv9d8lkhves6t8veq',
    local_denom: {
      native: 'untrn',
    },
    chain_fee_collector_addr: 'neutron1d2tuv3mxt0mcjg3avwjvseqgakfzlkdx4hgrwn2ht5cw7l4wnltsq8vlms',
    warchest_addr: 'neutron1d2tuv3mxt0mcjg3avwjvseqgakfzlkdx4hgrwn2ht5cw7l4wnltsq8vlms',
    active_offers_limit: 4,
    active_trades_limit: 20,
    trade_expiration_timer: 86400,
  },
}
