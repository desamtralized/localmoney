<template>
  <div>
    <ul class="unstake-claims">
      <li v-for="(claim, index) in unstakeClaims" :key="index">
        <div>
          <strong>Amount:</strong> {{ formatAmount(claim.amount) }} LOCAL
        </div>
        <div>
          <strong>Unstake At Time:</strong> {{ formatTimeStamp(claim.release_at.at_time) }}
        </div>
        <div v-if="claim.release_at.at_time < (new Date().getTime() * 1000000)">
          <button class="claim" @click="this.claim()">Claim</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    unstakeClaims: {
      type: Array,
      required: true,
    },
    claim: {
      type: Function,
      required: true,
    },
  },
  methods: {
    formatTimeStamp(timestamp) {
      console.log('Timestamp', timestamp)
      return new Date(timestamp/1000000).toLocaleString();
    },
    formatAmount(amount) {
      return Number(amount)/1000000;
    },
    claim() {
      props.claim();
    },
  }
};
</script>

<style scoped>
.unstake-claims {
  list-style: none;
  padding: 0;
  margin: 0;
}
.unstake-claims li {
  margin-bottom: 16px;
}
</style>