<template>
	<view class="question-desc">
		<view class="title">问题描述</view>
		<van-cell-group class="rowTextArea">
		  <van-field
		    :value="questionDesc.cate"
		    label="问题分类:"
		    placeholder="输入问题分类"
				@change="e=>changeValue(e,'cate')"
				input-class="my_input"
				label-class="my_label"
		  />
		
		  <van-field
		    :value="questionDesc.location"
		    label="位置:"
				@change="e=>changeValue(e,'location')"
		    placeholder="输入位置"
				input-class="my_input"
				label-class="my_label"
		  >
				<van-button slot="button" size="mini" type="primary" @click="getLocation">获取位置</van-button>
			</van-field>
		</van-cell-group>
		<progress-photo text="现场照片(相关图纸)"></progress-photo>
		<view class="desc_container">
			<text class="desc_title">详细描述：</text>
			<view class="desc_item">
				<view class="ques_desc">问题描述</view>
				<textarea class="text-area" cols="20" rows="10" placeholder="请输入进度详情" :value="questionDesc.desc" @input="e=>changIptValue(e,'desc')"></textarea>
			</view>
			<view class="desc_item">
				<view class="ques_desc">原因分析</view>
				<textarea class="text-area" cols="20" rows="10" placeholder="请输入原因分析" :value="questionDesc.analy" @input="e=>changIptValue(e,'analy')"></textarea>
			</view>
		</view>
		<slot></slot>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex';
	import QQMapWX from "../../common/qqmap-wx-jssdk.js";
	
	export default {
		name:"question-desc",
		computed:{
			...mapState('m_tab',["questionDesc",])
		},
		data() {
			return {

			};
		},

		methods:{
			...mapMutations('m_tab', ['updateInfo','getPageKey']),
			
			changeValue(e,key){
				this.questionDesc[key] = e.detail;
				this.updateInfo({date:this.questionDesc,key:'questionDesc'})
			},
			changIptValue(e,key){
				this.questionDesc[key] = e.detail.value;
				this.updateInfo({date:this.questionDesc,key:'questionDesc'})
			},
			async getLocation(){
				const location = await this.getLocationInfo();
				this.questionDesc.location = location.address
				this.updateInfo({date:this.questionDesc,key:'questionDesc'})
				// this.location = location && location.address
			},
			//获取位置信息
			  async getLocationInfo() {
			    return new Promise((resolve) => {
			      //位置信息默认数据
			      let location = {
			        longitude: 0,
			        latitude: 0,
			        province: "",
			        city: "",
			        area: "",
			        street: "",
			        address: "",
			      };
			      uni.getLocation({
			        type: "gcj02",
			        success(res) {
			          location.longitude = res.longitude;
			          location.latitude = res.latitude;
			          // 腾讯地图Api
			          const qqmapsdk = new QQMapWX({
			            key: 'LO6BZ-XV5KZ-3ZDX3-ZRM27-FDOTF-OSB7X'  //这里填写自己申请的key
			          });
			          qqmapsdk.reverseGeocoder({
			            location,
			            success(response) {
			              let info = response.result;
			              location.province = info.address_component.province;
			              location.city = info.address_component.city;
			              location.area = info.address_component.district;
			              location.street = info.address_component.street;
			              location.address = info.address;
			              resolve(location);
			            },
			          });
			        },
			        fail(err) {
								console.log(err)
			          resolve(location);
			        },
			      });
			    });
			  }
		}
	}
</script>

<style lang="scss">
.question-desc{
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
	
	.desc_container{
		padding: 10px 0;
		.desc_title{
			font-weight: 700;
			font-size: 14px;
		}
		.desc_item{
			margin-bottom: 5px;
			.ques_desc{
				font-size: 14px;
				margin-bottom: 10px;
				
				&::after{
					content: '(最多100字)';
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
	}
}
</style>