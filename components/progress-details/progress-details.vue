<template>
	<view class="prodress-detail">
		<progress-photo flag="true"></progress-photo>
		<view class="detial_container">
			<view class="detail_desc">进度详情</view>
			<textarea class="text-area" cols="20" rows="10" placeholder="请输入进度详情"></textarea>
		</view>
		<slot></slot>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	export default {
		name:"progress-details",
		
		data() {
			return {
				message:''
			};
		},
		
		methods:{
			...mapMutations('m_tab', ['updateInfo','getPageKey']),
			
			changeValue(e,key){
				this.proDetails[key] = e.detail;
				this.updateInfo({date:this.proDetails,key:'proDetails'})
			}
		}
	}
</script>

<style lang="scss">
.detial_container{
	padding: 10px 0;
	.detail_desc{
		font-size: 14px;
		margin-bottom: 10px;
		
		&::after{
			content: '(最多3张)';
			color: red;
			padding-left: 5px;
		}
	}
	textarea{
		border: 1px solid #ccc;
		width: 330px;
		height: 120px;
	}
}
</style>