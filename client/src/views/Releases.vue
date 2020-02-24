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
        :items="releasesList"
        :fields="tableFields"
        selectable
        select-mode="single"
        @row-selected="clickRelease"
      >
        <template v-slot:cell(status)="data">
          <div
            v-bind:class="
              getVariantForStatus(data.item.status)
                ? `text-${getVariantForStatus(data.item.status)}`
                : ''
            "
          >
            {{ data.item.status }}
          </div>
        </template>
        <template v-slot:cell(updated)="data">
          {{ getTime(data.item.updated) }}
        </template>
      </b-table>
    </b-row>
  </b-container>
</template>

<script>
import releasesMixin from '@/mixins/releasesMixin'
export default {
  name: 'Releases',
  mixins: [releasesMixin],
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
    releasesList() {
      const releases = this.$store.getters.getReleasesList.map(item => {
        var updatedItems = {}
        updatedItems['updated'] = new Date(item.updated).getTime()
        return { ...item, ...updatedItems }
      })
      return releases
    },
    filter() {
      return this.tableFilter.trim()
    }
  },
  methods: {
    clickRelease(selectedItems) {
      if (selectedItems && selectedItems.length) {
        console.log(selectedItems)
        const { namespace, name } = selectedItems[0]
        this.$router.push(`/release/${namespace}/${name}`)
      }
    },
    getTime(timestamp) {
      return new Date(timestamp).toLocaleString()
    }
  }
}
</script>
