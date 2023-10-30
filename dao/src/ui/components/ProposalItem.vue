<template>
  <div class="card proposal-item">
    <router-link :to="`/proposal/${proposal.id}`">
      <h4>{{ proposal.title }}</h4>
    </router-link>
    <p>{{ formatDescription(proposal.description) }}</p>
    <div class="proposal-details">
      <p><strong>Status:</strong> {{ proposal.status }}</p>
      <p><strong>Proposer:</strong> {{ proposal.proposer }}</p>
      <p v-if="proposal.expires"><strong>Expires:</strong> {{ formatTimestamp(proposal.expires.at_time) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    proposal: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatTimestamp(timestamp) {
      const date = new Date(timestamp / 1000000); // Convert microseconds to milliseconds
      return date.toLocaleString()
    },
    formatDescription(description) {
        return description.substr(0, 144).replace(/\n/g, '<br />') + '…'
    }
  },
};
</script>

<style scoped>
.proposal-item {
  padding: 8px;
  margin: 16px;
}

.proposal-item a {
  color: white;
}

.proposal-details {
  margin-top: 10px;
}

h3 {
  margin: 0;
}

p {
  margin: 5px 0;
}

strong {
  font-weight: bold;
}
</style>
