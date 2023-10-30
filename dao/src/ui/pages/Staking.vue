<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useClientStore } from '~/stores/client'
import { Proposal, StakeData, ThresholdQuorum, TotalWeight, UnstakeClaim, Vote } from '~/types/components.interface'

const client = useClientStore()
const { userWallet } = storeToRefs(client)
const unstakeClaims = ref<UnstakeClaim[]>({})
const totalStaked = ref<TotalWeight>({})
const myStake = ref<StakeData>({})
const stakeModalActive = ref(false)
const unstakeModalActive = ref(false)

function toggleStakeModal() {
  stakeModalActive.value = !stakeModalActive.value
}

function toggleUnstakeModal() {
  unstakeModalActive.value = !unstakeModalActive.value
}

function formatNumberWithThousand(number: number) {
  return (number / 1000).toFixed(2)
}

function fetchStaking() {
  nextTick(async() => {
    if (typeof userWallet.value.address === 'string' && userWallet.value.address.length > 1)  {
      unstakeClaims.value = await client.fetchUnstakeClaims(userWallet.value.address);
      myStake.value = await client.fetchStakedByAddress(userWallet.value.address);
    }
    totalStaked.value = await client.fetchTotalStaked()
    console.log('Total Staked', totalStaked.value)
    console.log('My Stake', myStake.value)
    console.log('Unstake Claims', unstakeClaims.value)
  })
}

onBeforeMount(() => {
  fetchStaking();
})

function onRefresh() {
  fetchStaking();
}

watch(userWallet, () => {
  nextTick(fetchStaking)
})
</script>

<template>
  <div class="staking-detail page">
    <h2>Staking</h2>
    <!-- Proposal Info -->
    <div class="row">
      <div class="card">
        <h3>Total Staked</h3>
        <h2>{{ formatNumberWithThousand(totalStaked.weight) }}K LOCAL</h2>
      </div>
      <div class="card">
        <h3>My Stake</h3>
        <h2>{{ Number(myStake.stake)/1000000 }} LOCAL</h2>
        <div class="row stake-btns">
          <button class="stake" @click="toggleStakeModal">Stake</button>
          <button class="unstake" @click="toggleUnstakeModal">Unstake</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="card">
        <h3>Pending Unstake Claims</h3>
        <UnstakeClaims :unstakeClaims="unstakeClaims" />
      </div>
    </div>
    <div>
      <Modal :modalActive="stakeModalActive" @close="toggleStakeModal()">
        <Stake @cancel="toggleStakeModal()" :onRefresh="onRefresh" />
      </Modal>
    </div>
    <div>
      <Modal :modalActive="unstakeModalActive" @close="toggleUnstakeModal()">
        <Unstake @cancel="toggleUnstakeModal()" :on-refresh="onRefresh" :staked-amount="Number(myStake.stake)/1000000" />
      </Modal>
    </div>
  </div>
  
</template>
<style lang="scss" scoped>
@import '../style/pages.scss';

main {
  margin-bottom: 48px;
}
.wrap-title {
  display: flex;
}
button {
  margin: 8px;
}
h3 {
  margin: 32px 0;
  font-size: 18px;
  font-weight: $semi-bold;
}

.card {
  margin: 8px;
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: center;
}
.row {
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
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
.staking-detail {
  padding: 20px;
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

h3 {
  font-size: 20px;
  margin-top: 10px;
}

p {
  margin: 5px 0;
}

strong {
  font-weight: bold;
}

.vote-summary {
  margin-top: 20px;
}

.vote-buttons {
  display: flex;
  padding: 16px;
  button {
    margin-right: 16px;
  }
  button.yes {
    background-color: #07bc0c;
  }
  button.no {
    background-color: #e7e429
  }
  .veto {
    background-color: #757575;
  }
  .abstain {
    background-color: #e74c3c;
  }
}

.stake-amount {
  margin-bottom: 16px;
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
