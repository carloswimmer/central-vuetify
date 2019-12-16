import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#00615c',
        default: '#78909c',
        accent: '#468b35',
        success: '#419641',
        warning: '#ff9a03',
        error: '#8c1e26'
      }
    }
  }
});
