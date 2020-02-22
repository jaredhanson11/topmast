<template>
  <b-container id="releases">
    <b-row>
      <b-form-group
        label="Filter"
        label-cols="3"
        label-size="sm"
        label-for="filterInput"
        class="mb-0"
      >
        <b-input-group size="sm">
          <b-form-input
            v-model="tableFilter"
            type="search"
            id="filterInput"
            placeholder="Type to Search"
          ></b-form-input>
        </b-input-group>
      </b-form-group>
    </b-row>
    <b-row>
      <b-table
        :filter="filter"
        responsive
        striped
        hover
        :items="releases"
        :fields="tableFields"
        selectable
        select-mode="single"
        @row-selected="clickRelease"
      >
        <template v-slot:cell(updated)="data">
          {{ getTime(data.item.updated) }}
        </template>
      </b-table>
    </b-row>
  </b-container>
</template>

<script>
import sampleReleases from '@/store/sampleReleases.js'
import store from '@/store'
store.dispatch('updateReleases', sampleReleases)
export default {
  name: 'Releases',
  data() {
    return {
      tableFilter: '',
      tableFields: [
        { key: 'name', sortable: true },
        { key: 'namespace', sortable: true },
        { key: 'revision', sortable: false },
        { key: 'status', sortable: false },
        { key: 'chart', sortable: false },
        { key: 'app_version', sortable: false },
        { key: 'updated', sortable: true }
      ]
    }
  },
  computed: {
    releases() {
      return this.$store.getters.getReleases
    },
    filter() {
      return this.tableFilter.trim()
    }
  },
  methods: {
    clickRelease(selectedItems) {
      const { namespace, name } = selectedItems[0]
      this.$router.push(`releases/${namespace}/${name}`)
    },
    getTime(timestamp) {
      return new Date(timestamp).toLocaleString()
    }
  }
}
</script>
