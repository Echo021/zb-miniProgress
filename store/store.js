import Vue from 'vue'
import Vuex from 'vuex'
import tabModule from '@/store/tab';
import pageModule from '@/store/page';

Vue.use(Vuex)

const store = new Vuex.Store({
	modules:{
		'm_tab': tabModule,
		'm_page': pageModule,
	}
})

export default store