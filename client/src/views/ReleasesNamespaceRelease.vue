<template>
  <div id="releases">
    <b-jumbotron :header="name" header-level="5">
      <h3>
        <b-badge
          v-b-tooltip.hover
          :to="`/release/${namespace}`"
          title="Namespace"
          variant="info"
        >
          {{ namespace }}
        </b-badge>
        <b-badge
          v-b-tooltip.hover
          title="Status"
          :variant="
            releaseDetails && getVariantForStatus(releaseDetails.status)
              ? getVariantForStatus(releaseDetails.status)
              : ''
          "
        >
          {{
            releaseDetails && releaseDetails.status
              ? releaseDetails.status
              : 'Unknown'
          }}
        </b-badge>
        <b-badge v-b-tooltip.hover title="Chart" variant="info">
          {{
            releaseDetails && releaseDetails.chart
              ? releaseDetails.chart
              : 'Unknown'
          }}
        </b-badge>
      </h3>
    </b-jumbotron>
  </div>
</template>

<script>
import releasesMixin from '@/mixins/releasesMixin'
import { releaseHelmRepo } from '@/store/samples'
import store from '@/store'
store.dispatch('updateReleaseDetails', releaseHelmRepo)
export default {
  name: 'ReleasesNamespaceRelease',
  mixins: [releasesMixin],
  computed: {
    releaseDetails() {
      const releaseId = this.getReleaseId(this.namespace, this.name)
      return this.$store.getters.getReleaseDetails(releaseId)
    },
    namespace() {
      return this.$route.params.namespace
    },
    name() {
      return this.$route.params.release
    }
  }
}
</script>
