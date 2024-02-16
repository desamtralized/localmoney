import type { Coin } from '@cosmjs/stargate'
import { JUNO_TESTNET_CONFIG, JUNO_TESTNET_HUB_INFO } from './cosmos/config/juno'
import {
  KUJIRA_MAINNET_CONFIG,
  KUJIRA_MAINNET_HUB_INFO,
  KUJIRA_TESTNET_CONFIG,
  KUJIRA_TESTNET_HUB_INFO,
} from './cosmos/config/kujira'
import { DEV_CONFIG, DEV_HUB_INFO } from './cosmos/config/dev'
import type {
  Addr,
  Arbitrator,
  Denom,
  DenomFiatPrice,
  FetchOffersArgs,
  FiatCurrency,
  HubConfig,
  NewProposal,
  NewTrade,
  OfferResponse,
  PatchOffer,
  PostOffer,
  Profile,
  Proposal,
  StakeData,
  ThresholdQuorum,
  ThresholdQuorumResponse,
  TotalWeight,
  TradeInfo,
  UnstakeClaim,
  UnstakeClaimResponse,
  Vote,
  VoteType,
} from '~/types/components.interface'
import { CosmosChain } from '~/network/cosmos/CosmosChain'
import { TERRA_CONFIG, TERRA_HUB_INFO } from './cosmos/config/terra'

export interface Chain {
  init(): void

  connectWallet(): Promise<void>

  disconnectWallet(): Promise<void>

  getHubConfig(): HubConfig

  getWalletAddress(): string

  fetchProfile(profile_addr?: Addr): Promise<Profile>

  fetchTokenBalance(denom: Denom): Promise<Coin>

  fetchOffer(offerId: string): Promise<OfferResponse>

  fetchOffers(args: FetchOffersArgs, limit: number, last?: number): Promise<OfferResponse[]>

  fetchMakerOffers(maker: Addr): Promise<OfferResponse[]>

  fetchMyOffers(limit: number, last?: number): Promise<OfferResponse[]>

  createOffer(postOffer: PostOffer): Promise<number>

  updateOffer(updateOffer: PatchOffer): Promise<void>

  openTrade(trade: NewTrade): Promise<number>

  fetchTrades(limit: number, last?: number): Promise<TradeInfo[]>

  fetchDisputedTrades(limit: number, last?: number): Promise<{ openDisputes: TradeInfo[]; closedDisputes: TradeInfo[] }>

  fetchTradeDetail(tradeId: number): Promise<TradeInfo>

  fetchArbitrators(): Promise<Arbitrator[]>

  updateFiatPrice(fiat: FiatCurrency, denom: Denom): Promise<DenomFiatPrice>

  acceptTradeRequest(tradeId: number, makerContact: string): Promise<void>

  cancelTradeRequest(tradeId: number): Promise<void>

  fundEscrow(tradeInfo: TradeInfo, maker_contact?: string): Promise<void>

  setFiatDeposited(tradeId: number): Promise<void>

  releaseEscrow(tradeId: number): Promise<void>

  refundEscrow(tradeId: number): Promise<void>

  openDispute(tradeId: number, buyerContact: string, sellerContact: string): Promise<void>

  settleDispute(tradeId: number, winner: string): Promise<void>

  newArbitrator(arbitrator: Arbitrator): Promise<void>

  // DAO endpoints
  fetchProposals(limit: number, start_before?: number): Promise<Proposal[]>

  fetchProposal(proposalId: number): Promise<Proposal>

  fetchProposalVotes(proposalId: number): Promise<Vote[]>

  fetchThreshold(): Promise<ThresholdQuorum>

  castVote(vote: VoteType, proposalId: number): Promise<void>

  fetchTotalStaked(): Promise<TotalWeight>

  fetchStakedByAddress(address: string): Promise<StakeData>

  fetchUnstakeClaims(address: string): Promise<UnstakeClaim[]>

  bond(amount: number): Promise<void>

  unbond(amount: number): Promise<void>

  claim(): Promise<void>

  propose(proposal: NewProposal): Promise<void>

  // Migration endpoints
  migrateWhLocalTerra2ToKujira(amount: string, recipient: string): Promise<void>

  swapWhLocalKujiToLocal(amount: string): Promise<void>
}

export enum ChainName {
  kujiraTestnet = 'KUJIRA_TESTNET',
  kujiraMainnet = 'KUJIRA_MAINNET',
  terra = 'TERRA',
  juno = 'JUNO',
  dev = 'DEV',
}

// Centralized place to instantiate chain client and inject dependencies if needed
export function chainFactory(chainName: ChainName): CosmosChain {
  switch (chainName) {
    case ChainName.kujiraTestnet:
      return new CosmosChain(KUJIRA_TESTNET_CONFIG, KUJIRA_TESTNET_HUB_INFO)
    case ChainName.kujiraMainnet:
      return new CosmosChain(KUJIRA_MAINNET_CONFIG, KUJIRA_MAINNET_HUB_INFO)
    case ChainName.terra:
      return new CosmosChain(TERRA_CONFIG, TERRA_HUB_INFO)
    case ChainName.juno:
      return new CosmosChain(JUNO_TESTNET_CONFIG, JUNO_TESTNET_HUB_INFO)
    case ChainName.dev:
      return new CosmosChain(DEV_CONFIG, DEV_HUB_INFO)
  }
}
