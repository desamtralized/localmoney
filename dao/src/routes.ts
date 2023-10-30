import Proposals from '~/ui/pages/Proposals.vue'
import Proposal from '~/ui/pages/Proposal.vue'
import Staking from '~/ui/pages/Staking.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Proposals,
    alias: '/proposals'
  },
  {
    path: '/staking',
    name: 'Staking',
    component: [],
  },
  {
    path: '/proposal/:id',
    name: 'Proposal',
    component: Proposal, 
  },
  {
    path: '/staking',
    name: 'Staking',
    component: Staking,
  }
]

export default routes
