import { ChainName } from '~/network/Chain'
import type { Addr } from '~/types/components.interface'

export function isBetaMaker(addr: Addr, chainClient: ChainName, betaMakers: String[]): boolean {
  return chainClient === ChainName.kujiraMainnet ? betaMakers.includes(addr) : true
}
