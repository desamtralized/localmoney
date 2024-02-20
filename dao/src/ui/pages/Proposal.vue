<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useClientStore } from '~/stores/client'
import { Proposal, ThresholdQuorum, Vote, VoteType } from '~/types/components.interface'

const client = useClientStore()
const { userWallet } = storeToRefs(client)
const proposal = ref<Proposal>({})
const threshold = ref<ThresholdQuorum>({})
const votes = ref<Vote[]>([])
const route = useRoute()

function formatTimestamp(timestamp) {
  const date = new Date(timestamp / 1000000); // Convert microseconds to milliseconds
  return date.toLocaleString();
}

function calculateVotePercentage(voteType) {
  console.log('Votes', votes.value)
  const totalVotes = votes.value.reduce((sum, vote) => sum + vote.weight, 0);
  const votesOfType = votes.value.filter(vote => vote.vote === voteType);
  const totalWeightOfType = votesOfType.reduce((sum, vote) => sum + vote.weight, 0);
  return ((totalWeightOfType / totalVotes) * 100).toFixed(2);
}

function calculateQuorumPercentage() {
  const totalVotes = votes.value.reduce((sum, vote) => sum + vote.weight, 0);
  return ((totalVotes / threshold.value.total_weight) * 100).toFixed(2);
}

function formatQuorumPercentage() {
  return parseFloat(threshold.value.quorum) * 100 + '%';
}

function fetchProposal() {
  nextTick(async() => {
    votes.value = await client.fetchProposalVotes(route.params.id)
    proposal.value = await client.fetchProposal(route.params.id)
    threshold.value = proposal.value.threshold.threshold_quorum
  })
}

function castVote(vote: VoteType) {
  nextTick(async() => {
    await client.castVote(vote, proposal.value.id)
    fetchProposal()
  })
}

onBeforeMount(() => {
  fetchProposal();
})
</script>

<template>
  <div class="proposal-detail page" v-if="proposal && proposal.id">
    <h2>Proposal Details</h2>
    <!-- Proposal Info -->
    <div class="proposal-info card">
      <h3>{{ proposal.title }}</h3>
      <p>{{ proposal.description }}</p>
      <p><strong>Status:</strong> {{ proposal.status }}</p>
      <p><strong>Proposer:</strong> {{ proposal.proposer }}</p>
      <p><strong>Expires:</strong> {{ formatTimestamp(proposal.expires.at_time) }}</p>
      <p><strong>Messages:</strong> {{ JSON.stringify(proposal.msgs)}} </p>
    </div>
    <!-- Vote Summary -->
    <div class="vote-summary card">
      <h3>Vote Summary</h3>
      <p><strong>Total Votes:</strong> {{ votes.length }}</p>
      <p><strong>Min Quorum:</strong> {{ formatQuorumPercentage() }}</p>
      <p><strong>Quorum Reached:</strong> {{ calculateQuorumPercentage() }}%</p>
      <br/>
      <p><strong>% of "Yes" Votes:</strong> {{ calculateVotePercentage('yes') }}%</p>
      <p><strong>% of "No" Votes:</strong> {{ calculateVotePercentage('no') }}%</p>
      <p><strong>% of "Abstain" Votes:</strong> {{ calculateVotePercentage('abstain') }}%</p>
      <p><strong>% of "Veto" Votes:</strong> {{ calculateVotePercentage('veto') }}%</p>
    </div>
    <!-- Buttons -->
    <div class="vote-summary card">
      <h4>Cast your vote</h4>
      <div class="vote-buttons">
        <button class="yes" @click="castVote('yes')">Yes</button>
        <button class="no" @click="castVote('no')">No</button>
        <button class="abstain" @click="castVote('abstain')">Abstain</button>
        <button class="veto" @click="castVote('veto')">Veto</button>
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
.proposal-detail {
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
</style>
