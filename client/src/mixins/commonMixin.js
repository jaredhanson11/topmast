import YAML from 'yamljs'
const hljs = require('highlight.js/lib/highlight.js') // doesn't include languages
hljs.registerLanguage('yaml', require('highlight.js/lib/languages/yaml')) //register yaml

/**
 * Mixin that contains common reusable function.
 */
export default {
  methods: {
    toHighlightedYaml(jsObject) {
      return hljs.highlight('yaml', YAML.stringify(jsObject, 10)).value
    }
  }
}
