<template>
  <div class="package">
    <h3>Build v{{VERSION}}</h3>
    <ul>
      <li v-for="(version,name) in packages" :key="version">
        {{name}} <b>v{{cleanVersion(version)}}</b>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import pkg from '../../package.json';

@Options({
  props: {
    filter: String
  }
})
export default class PackageVersions extends Vue {
  versionFilter!: string;

  VERSION = pkg.version;

  get packages() {
   return pkg.dependencies;
  }

  cleanVersion(version: string) {
    return version.replace(/[^~]/,'');
  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
