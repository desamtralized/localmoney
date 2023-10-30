<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useClientStore } from '~/stores/client'
import { Proposal, StakeData } from '~/types/components.interface'

const client = useClientStore()
const { userWallet } = storeToRefs(client)
const createProposalModalActive = ref(false)
const proposalsResult = computed(() => client.proposals)
const myStake = ref<StakeData>({})
const proposals = computed(() => {
  if (proposalsResult.value.isSuccess()) {
    return proposalsResult.value.data
  } else {
    return []
  }
})

function onRefresh() {
  nextTick(async () => await client.fetchProposals())
}
// const paginationLastItem = ref<number>(0)

function toggleCreateProposalModal() {
  createProposalModalActive.value = !createProposalModalActive.value
}

onBeforeMount(async () => {
  fetchStaked()
})

function fetchStaked() {
  nextTick(async() => {
    await client.fetchProposals()
    if (typeof userWallet.value.address === 'string' && userWallet.value.address.length > 1)  {
      myStake.value = await client.fetchStakedByAddress(userWallet.value.address);
      console.log('myStake', myStake.value)
    }
  })
}

const minStakeToCreate = computed(() => {
  return 5000 * 1000000
})

watch(userWallet, () => {
  nextTick(fetchStaked)
})

async function loadMore() {
  // const lastIndex = trades.value.length
  // paginationLastItem.value = lastIndex > 0 ? trades.value[lastIndex - 1].trade.id : 0
  // await client.fetchMoreTrades(paginationLastItem.value)
}
</script>

<template>
  <main class="page">
    <div class="wrap-title">
      <h2>Proposals</h2>
      <div class="btn-add" @click="toggleCreateProposalModal()" v-if="Number(myStake.stake) >= minStakeToCreate">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 5V19" stroke="inherit" stroke-width="2" stroke-linecap="round" />
          <path d="M5 12L19 12" stroke="inherit" stroke-width="2" stroke-linecap="round" />
        </svg>
      </div>
    </div>
    <!-- Open Proposals section -->
    <ListContentResult :result="proposalsResult" emptyStateMsg="There are no proposals here yet" @loadMore="loadMore()">
      <section>
        <div v-for="proposal in proposals" :key="proposal.id">
          <ProposalItem :proposal="proposal" />
        </div>
      </section>
    </ListContentResult>
    <!-- End Trades History section -->
    <Modal :modalActive="createProposalModalActive">
      <CreateProposal @cancel="toggleCreateProposalModal()" :on-refresh="onRefresh" />
    </Modal>
  </main>
</template>

<style lang="scss" scoped>
@import '../style/pages.scss';

main {
  margin-bottom: 48px;
}
.wrap-title {
  display: flex;
}

h3 {
  margin: 32px 0;
  font-size: 18px;
  font-weight: $semi-bold;
}

.trade-history-table {
  overflow: auto;
  .table-header {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid $border;
    padding: 16px;
    margin-bottom: 16px;

    p {
      font-size: 14px;
      font-weight: $semi-bold;
      color: $gray700;
    }

    @media only screen and (max-width: $mobile) {
      min-width: 1000px;
      padding: 0 0 16px 0;
    }
  }
}

.col-1,
:deep(.col-1) {
  width: 10%;
}

.col-2,
:deep(.col-2) {
  width: 20%;
}

.col-3,
:deep(.col-3) {
  width: 7.5%;
}

.col-4,
:deep(.col-4) {
  width: 17%;
}

.col-5,
:deep(.col-5) {
  width: 17%;
}

.col-6,
:deep(.col-6) {
  width: 20%;
}

.col-7,
:deep(.col-7) {
  width: 10%;
}
.btn-add {
  width: 40px;
  height: 40px;
  background-color: $surface;
  border-radius: 8px;
  margin-left: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    stroke: $primary;
    vertical-align: middle;
  }
}

.modal {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: $z-modal-overlay;
  backdrop-filter: blur(10px);

  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
    background: $gray100;
  }
  &::-webkit-scrollbar-thumb {
    background: $gray300;
    border-radius: 56px;
  }
}
</style>
