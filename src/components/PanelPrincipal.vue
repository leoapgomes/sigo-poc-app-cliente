<template>
    <div id="main-panel-principal">
        <h2>{{ titulo }}</h2>
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'PanelPrincipal',
  props: {
    titulo: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #main-panel-principal{        
        padding: 10px 20px; 
        overflow: auto;
    }
</style>
