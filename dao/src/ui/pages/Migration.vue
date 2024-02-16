<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useClientStore } from '~/stores/client'

const client = useClientStore()
const { userWallet } = storeToRefs(client)

const fmtTokenAmount = (balance: string) => {
  return (parseInt(balance) / 1e6).toFixed(6)
}

onMounted(() => {
  console.log('userWallet', userWallet.value)
})
const whLocal2Balance = computed(() => {
  if (!client.whLocalTerra2Balance || client.whLocalTerra2Balance.balance.length == 0) return '0.00'
  return fmtTokenAmount(client.whLocalTerra2Balance.balance)
})
</script>

<template>
  <div class="migration-container page">
    <h2>Migration</h2>
    <div class="row">
      <div class="card">
        <h3>whLOCAL on Terra2</h3>
        <p>{{(parseInt(client.whLocalTerra2Balance.balance)/1e6).toFixed(6)}}</p>
        <button @click="client.migrateWhLocalTerra2ToKujira"
          :disabled="whLocal2Balance === '0.00'">IBC to KUJIRA</button>
      </div>
      <div class="card">
        <h3>whLOCAL on KUJIRA</h3>
        <p> {{ fmtTokenAmount(client.whLocalKujiBalance.amount) }} </p>
        <button @click="client.swapWhLocalKujiToLocal">Swap to $LOCAL</button>
      </div>
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
.migration-container {
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
