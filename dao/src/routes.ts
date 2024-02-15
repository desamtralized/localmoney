import Proposals from '~/ui/pages/Proposals.vue'
import Proposal from '~/ui/pages/Proposal.vue'
import Staking from '~/ui/pages/Staking.vue'
import Migration from '~/ui/pages/Migration.vue'

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
  },
  {
    path: '/migration',
    name: 'Migration',
    component: Migration
  }
]

export default routes
