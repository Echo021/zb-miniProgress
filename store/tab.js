import Toast from '../wxcomponents/vant/dist/toast/toast';
const baseDate = {
	info:{
		projectName: '',
		reportName: '',
		periods: '',
		projectNum: '',
		preparedBy: '',
		scope: '',
		date: '',
		stuff: '',
	},
	questionDesc:{
		cate: '',
		location: '',
		desc:'123',
		analy: ''
	},
	key:{
		1: 'info',
		2: 'quseDetails',
		3: 'questionDesc'
	}
}
export default {
	namespaced: true,
	
	state:()=>({
		info: baseDate.info,
		recordLists:[],
		questionDesc: baseDate.questionDesc,
		key: baseDate.key[1]
	}),
	
	mutations:{
		getPageKey(state,index){
			state.key = baseDate.key[index]
		},
		updateInfo(state,info){
			const {date,key} = info
			state[key]=date;
		},
		saveInformation(state,key){
			console.log("提交成功",key)
			this.commit('m_tab/clearInfo')
			//提交后台
		},
		recordInfos(state){
			const value = Object.values(state.info)
			if(value.find(item=>item.length)){
				state.recordLists.unshift(state.info)
				Toast({
				  type: 'success',
				  message: '记录成功',
				  onClose: () => {
				    this.commit('m_tab/clearInfo')
				  },
				});
			}else{
				return Toast('内容为空')
			}
		},
		clearInfo(state){

			if(state.key=='info' ) state.info = {
				projectName: '',
				reportName: '',
				periods: '',
				projectNum: '',
				preparedBy: '',
				scope: '',
				date: '',
				stuff: '',
			}
			if(state.key=='questionDesc') {
				state.questionDesc = {
					cate: '',
					location: '',
					desc:'',
					analy: ''
				}
		}
		},
	},
	
	getters:{
		
	}
}