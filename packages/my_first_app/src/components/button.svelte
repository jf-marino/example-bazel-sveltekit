<button>Hello World!</button>

<style lang="sass">
  // Example using relative imports
  @use './variables'
  // Example using the alias '@src' defined in svelte.config.js
  @use '@src/components/others'
  button
    color: variables.$base-color
    background: others.$other-color
</style>
