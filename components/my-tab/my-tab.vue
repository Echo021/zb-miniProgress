<template>
	<view class="my_tab">
		<view class="save" @click="save">
			<van-icon name="completed" size="20"/>
			<text>保存</text>
		</view>
		<view class="document" @click="recordInfos">
			<van-icon name="records" size="20"/>
			<text>记录</text>
		</view>
		<view class="clear" @click="clearInfo">
			<van-icon name="delete-o" size="20"/>
			<text>清空</text>
		</view>
		<van-button round type="primary" size="small" @click="downPdf">转成PDF</van-button>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	
	export default {
		name:"my-tab",
		
		props:{
			curPage:{
				type: Number,
				default: 1
			}
		},
		
		data() {
			return {
				
			};
		},
		watch:{
			curPage(){
				this.getPageKey(this.curPage)
			}
		},
		methods:{
			...mapMutations('m_tab',["saveInformation","clearInfo","recordInfos",'getPageKey']),
			
			save(){
				this.saveInformation(this.curPage)
			},
		}
	}
</script>

<style lang="scss">
.my_tab{
	background-color: #fff;
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 99;
	width: 100%;
	height: 54px;
	border-top: 1px solid #ccc;
	display: flex;
	justify-content: space-around;
	align-items: center;
	
	.save,
	.document,
	.clear{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		font-size: 12px;
		
		text{
			margin-top: 4px;
		}
	}
}
</style>