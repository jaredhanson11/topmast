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
    <b-card title="Values">
      <b-card-group deck style="height: 200px">
        <b-card no-body class="h-100">
          <b-card-body class="d-flex flex-column">
            <b-card-sub-title>User Supplied Values</b-card-sub-title>
            <pre
              class="flex-grow-1 p-2"
            ><code v-html="toHighlightedYaml(releaseDetails.user_supplied_values)"></code></pre>
          </b-card-body>
        </b-card>
        <b-card no-body class="h-100">
          <b-card-body class="d-flex flex-column">
            <b-card-sub-title>User Supplied Values</b-card-sub-title>
            <pre
              class="flex-grow-1 p-2"
            ><code v-html="toHighlightedYaml(releaseDetails.computed_values)"></code></pre>
          </b-card-body>
        </b-card>
      </b-card-group>
    </b-card>
  </div>
</template>

<script>
import releasesMixin from '@/mixins/releasesMixin'
import commonMixin from '@/mixins/commonMixin'
import { releaseHelmRepo } from '@/store/samples'
import store from '@/store'
store.dispatch('updateReleaseDetails', releaseHelmRepo)
export default {
  name: 'ReleasesNamespaceRelease',
  mixins: [releasesMixin, commonMixin],
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

<style scoped>
pre {
  background-color: rgb(240, 240, 240);
  border-radius: 0.25em;
}
</style>
