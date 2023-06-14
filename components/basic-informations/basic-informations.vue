<template>
	<view class="basic-information">
		<view class="title">基本信息</view>
		<van-cell-group class="rowTextArea">
		  <van-field
		    :value="info.projectName"
		    label="项目名:"
		    placeholder="输入项目名"
				@change="e=>changeValue(e,'projectName')"
				input-class="my_input"
				label-class="my_label"
		  />
		
		  <van-field
		    :value="info.reportName"
		    label="报告名:"
				@change="e=>changeValue(e,'reportName')"
		    placeholder="输入报告名"
				input-class="my_input"
				label-class="my_label"
		  />
			
			<van-field
			  :value="info.periods"
			  label="期数:"
				@change="e=>changeValue(e,'periods')"
			  placeholder="输入期数"
				input-class="my_input"
				label-class="my_label"
			/>
			
			<van-field
			  :value="info.projectNum"
			  label="项目编号:"
				@change="e=>changeValue(e,'projectNum')"
			  placeholder="输入项目编号"
				input-class="my_input"
				label-class="my_label"
			/>
			
			<van-field
			  :value="info.preparedBy"
			  label="编制单位:"
				@change="e=>changeValue(e,'preparedBy')"
			  placeholder="输入编制单位"
				input-class="my_input"
				label-class="my_label"
			/>

			<van-field
			  :value="info.scope"
			  label="验收范围:"
				@change="e=>changeValue(e,'scope')"
			  placeholder="输入验收范围"
				input-class="my_input"
				label-class="my_label"
			/>
			
			<van-field
			  :value="info.date"
			  label="验收日期:"
				@change="e=>changeValue(e,'date')"
			  placeholder="输入验收日期"
				input-class="my_input"
				label-class="my_label"
			/>
			
			<van-field
			  :value="info.stuff"
				@change="e=>changeValue(e,'stuff')"
			  label="编制人员:"
			  placeholder="输入编制人员"
				input-class="my_input"
				label-class="my_label"
			/>
			
		</van-cell-group>
		<slot></slot>
		<hr/>
		<progress-photo flag="true"></progress-photo>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex';
	export default {
		name:"basic-informations",
		computed:{
			...mapState('m_tab',["info"])
		},
		data() {
			return {
				
			};
		},

		methods:{
			...mapMutations('m_tab', ['updateInfo',"getPageKey"]),
			
			changeValue(e,key){
				this.info[key] = e.detail;
				this.updateInfo({date:this.info,key:'info'})
			}
		}
	}
</script>

<style lang="scss">
	.basic-information{
		padding-bottom: 5px;
		
		.title{
			font-weight: 700;
			font-size: 20px;
			padding: 10px 10px 5px 0;
		}
		.rowTextArea{
			display: block;
			margin-left: -12px;
			margin-bottom: 10px;
			
			.my_input{
				border: 1px solid #333;
				border-radius: 5px;
				padding-left: 5px;
			}
			.my_label{
				text-align: justify;
				text-align-last: justify;
			}
		}
	}
</style>