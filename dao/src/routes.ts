import Proposals from '~/ui/pages/Proposals.vue'
import Proposal from '~/ui/pages/Proposal.vue'

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
  }
]

export default routes
