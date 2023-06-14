<template>
	<view class="detail">
		<van-toast id="van-toast" />
		<view class="detail_content">
			<basic-informations v-show="curPage==1"><my-page @getPage="getPagenum" :curPage="1"></my-page></basic-informations>
			<progress-details v-show="curPage==2"><my-page @getPage="getPagenum" :curPage="2"></my-page></progress-details>
			<question-desc v-show="curPage==3"><my-page @getPage="getPagenum" :curPage="3"></my-page></question-desc>
		</view>
		<my-tab :curPage="curPage"></my-tab>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				curPage: 1
			};
		},
		methods:{
			getPagenum(page){
				this.curPage=page
			}
		}
	}
</script>

<style lang="scss">
.detail{
	padding-bottom: 60px;
	
	.detail_content{
		margin-left: 14px
	}
}
</style>
