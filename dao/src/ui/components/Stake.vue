<script setup lang="ts">
import CurrencyInput from './CurrencyInput.vue'
import {
  formatAmount,
} from '~/shared'
import { useClientStore } from '~/stores/client'

const localBalance = computed(() => {
  return {
    amount: formatAmount(client.localBalance.amount),
    denom: 'LOCAL',
  }
})

const emit = defineEmits<{
  (e: 'cancel'): void
}>()

const props = defineProps<{
  onRefresh: () => void
}>()

const client = useClientStore()

const stakeAmount = ref(localBalance.value.amount)
// TODO - Make isMobile global
const width = ref(window.innerWidth)
const listener = () => {
  width.value = window.innerWidth
}
onMounted(() => {
  window.addEventListener('resize', listener)
  nextTick(async () => {
  })
})
onBeforeMount(async () => {
})
onUnmounted(() => {
  window.removeEventListener('resize', listener)
})
const isMobile = computed(() => width.value <= 550)

// Get the viewport height and store in a variable
const vh = window.innerHeight * 0.01
document.documentElement.style.setProperty('--vh', `${vh}px`)

function bond() {
  nextTick(async () => {
    await client.bond(stakeAmount.value)
    await props.onRefresh()
    emit('cancel')
  })
}

</script>

<template>
  <div class="main-wrap card">
    <div class="header-wrap">
      <p>Stake</p>
      <div v-if="isMobile" class="close" @click="$emit('cancel')">
        <svg class="icon-24" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M6 6L18 18" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </div>
    <div class="inner-content">
      <div class="stake-amount">
        <div class="wrap">
          <label></label>
          <CurrencyInput
            v-model="stakeAmount"
            :placeholder="0"
            :prefix="'LOCAL'"
            :isCrypto="true"
            :decimals="6"
          />
        </div>
      </div>
    </div>

    <div class="wrap-footer">
      <div class="btns">
        <button class="secondary" @click="$emit('cancel')">Cancel</button>
        <button class="primary" @click="bond()">Stake</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../style/tokens.scss';
@import '../style/elements.scss';

.main-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0px;
  background-color: $gray150 !important;

  @media only screen and (max-width: $mobile) {
    width: 100%;
    height: 600vh;
    height: calc(var(--vh, 1vh) * 100);
    overflow-y: scroll;
  }
}
.header-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    stroke: $gray600;
  }
}

.buy-sell {
  display: flex;
  margin: 24px 0 24px;
}

.inner-content {
  .currency,
  .min-max,
  .stake-amount,
  .market-price,
  .description,
  .chat {
    display: flex;
    gap: 24px;
    margin-bottom: 24px;

    &:last-child {
      margin-bottom: 0;
    }

    .wrap {
      display: flex;
      flex-direction: column;
      width: 100%;

      .wrap-label {
        display: flex;
        gap: 8px;
      }

      label {
        font-size: 14px;
        font-weight: 400;
        color: $gray900;
        margin-bottom: 8px;

        @media only screen and (max-width: $mobile) {
          font-size: 12px;
        }
      }

      input {
        width: 100%;
        background-color: $background;
      }
      textarea {
        background-color: $background;
      }
    }
  }

  .currency {
    @media only screen and (max-width: $mobile) {
      flex-direction: column;
    }
  }
}

.divider {
  width: 100%;
  height: 1px;
  background-color: $border;
  margin: 32px 0;
}

.wrap-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  margin-top: 16px;

  @media only screen and (max-width: $mobile) {
    padding-bottom: 64px;
  }

  .fiat-price {
    @media only screen and (max-width: $mobile) {
      font-size: 12px;
    }
  }

  .btns {
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    margin-top: 0px;
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
