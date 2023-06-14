<template>
	<view class="my-page">
		<view :class="leftClassName" @click="clickPre">
			<van-icon name="arrow-left"/>
		</view>
		<view class="toPage">
			<text>{{page}}/{{total}}跳转至</text>
			<input type="text" @blur="gotoPage" > 
		</view>
		<view :class="rightClassName" @click="clickNext">
			<van-icon name="arrow" />
		</view>
	</view>
</template>

<script>
	import {mapState, mapMutations,mapGetters} from 'vuex'
	export default {
		name:"my-page",
		props:{
			curPage:{
				type: Number,
				default: 1,
			}
		},

		computed:{
			...mapState('m_page',['page','total']),
			
			leftClassName(){
				return this.page==1?'btn':'btn active'
			},
			rightClassName(){
				return this.page==3?'btn':'btn active'
			}
		},

		data() {
			return {

			};
		},
		methods:{
			...mapMutations('m_page', ['nextPage','prePage','updatePage']),
			
			clickPre(){
				this.prePage()
				this.$emit('getPage',this.page)
			},
			
			clickNext(){
				this.nextPage()
				this.$emit('getPage',this.page)
			},
			
			gotoPage(e){
				const {value} = e.detail;
				const page = value>=this.total ? this.total : value<=0 ? 1: value;
				this.updatePage(page)
				this.$emit('getPage',page)
			},
			changeVal(e){
				const {value} = e.detail;
				this.pageNum = value
			}
		}
	}
</script>

<style lang="scss">
.my-page {
	display: flex;
	justify-items: center;
	align-items: center;
	
	.btn{
		width: 20px;
		height: 20px;
		text-align: center;
		color: #fff;
		background-color: #ccc;
		
		&.active{
			background-color: limegreen;
		}
	}
	
	.toPage{
		display: flex;
		justify-content: center;
		margin: 0 10px;
		
		input{
			margin-left: 5px;
			width: 20px;
			height: 10px;
			border:1px solid #ccc;
			border-radius: 5px;
		}
	}
}
</style>