<template>
	<view class="progress_photo">
		<view class="title" v-if="flag">
			形象进度
		</view>
		<view class="photo_container">
			<view class="photo_desc">{{text}}</view>
			<view class="photo_item">
				<view class="photo_pre" v-for="(item,index) in fileList" :key="index">
					<image :src="item" @click="previewImage(item)"></image>
					<view class="delete_icon" @click="delete_img(index)">X</view>
				</view>
				<view class="uploader" @click="upload" v-if="fileList.length<3">
					<van-icon name="plus" size="40"/>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Toast from '../../wxcomponents/vant/dist/toast/toast';
	export default {
		name:"progress-photo",
		props:{
			flag:{
				type: Boolean,
				default: false
			},
			text:{
				type: String,
				default: '进度照片',
			}
		},
		data() {
			return {
				fileList: []
			};
		},
		methods:{
			async upload(file) {
				const res = await uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					crop:{
						height: 80,
						width: 80
					}
				});
				if(res.errMsg==="chooseImage:ok"){
					if(this.fileList.length<3){
						this.fileList.push(res.tempFilePaths[0]);
					}else{
						return Toast('最多选择三张图片！')
					}
				}
			},
			delete_img(index){
				this.fileList.splice(index,1)
			},
			previewImage(url){
				url && uni.previewImage({
					urls: [url]
				})
			},
		}
	}
</script>

<style lang="scss">
.progress_photo {
	
	.title{
		font-weight: 700;
		font-size: 20px;
		padding: 10px 0 5px ;
	}
	
	.photo_container{	
		.photo_desc{
			font-size: 14px;
			margin-bottom: 10px;
			
			&::after{
				content: '(最多3张)';
				color: red;
				padding-left: 5px;
			}
		}
		
		.photo_item{
			display: flex;
			.photo_pre{
				margin-right: 5px;
				position: relative;
				overflow: hidden;
				
				image {
					width: 80px;
					height: 80px;
				}
				.delete_icon{
						color: #fff;
						background-color: #333;
						font-size: 12px;
						position: absolute;
						top: -8px;
						right: -8px;
						width: 25px;
						height: 25px;
						line-height: 28px;
						border: 1px solid #333;
						border-radius: 50%;
						text-align: center;
				}
			}
			.uploader{
				border: 1px dotted #ccc;
				height: 80px;
				width: 80px;
				line-height: 100px;
				text-align: center;
			}
		}
	}
}
</style>