<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useClientStore } from '~/stores/client'
import { Proposal } from '~/types/components.interface'

const client = useClientStore()
const { userWallet } = storeToRefs(client)
const proposalsResult = computed(() => client.proposals)
const proposals = computed(() => {
  if (proposalsResult.value.isSuccess()) {
    return proposalsResult.value.data
  } else {
    return []
  }
})

// const paginationLastItem = ref<number>(0)

onMounted(() => {
  nextTick(async () => await client.fetchProposals())
  // trackPage(Page.my_trades)
})

onUnmounted(async () => {})

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
</style>
