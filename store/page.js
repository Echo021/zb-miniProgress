export default {
	namespaced: true,
	
	state:()=>({
		page: 1,
		total: 3,
	}),
	
	mutations:{
		nextPage(state){
			if(state.page<state.total) state.page++
		},
		prePage(state){
			if(state.page>1) state.page--;
		},
		updatePage(state,page){
			state.page=page
		},
	},
	
	getters:{

	}
}