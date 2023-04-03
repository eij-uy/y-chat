<template>
	<view class="y-wrap" :style="'--bottom-height:' + bottomHeight">
		<scroll-view
			class="y-wrap_message_content"
			id="scrollBox"
			scroll-y
			:scroll-into-view="scrollToId"
			:refresher-enabled="useRefresh"
			:refresher-threshold="100"
			:refresher-triggered="triggered"
			scroll-with-animation
			refresher-default-style="white"
			refresher-background="#F2F2F2"
			@refresherrefresh="onRefresh"
			@refresherrestore="onReset"
			@tap="closeFooter"
		>
			<view
				v-for="(item, index) in list"
				:key="index"
				:id="'y-chat-' + item[defaultOptions['msgId']]"
				:class="['y-wrap_message_content_box', { 'y-wrap_message_content_my' : item[defaultOptions['userId']] == userId }]"
			>
				<view style="text-align: center; padding: 10rpx 0 20rpx;" v-if="item.showTime">
					{{ item.timeLabel }}
				</view>
				<view>
					<u-image
						width="100rpx"
						height="100rpx"
						:src="item[defaultOptions['avator']] || defaultAvator"
						@click="tapAvator(item)"
						radius="10rpx"
						bgColor="red"
					></u-image>
					<view :class="['y-wrap_message_content_box_msg', { 'y-wrap_message_content_box_my' : item[defaultOptions['userId']] == userId }]">
						<view :class="['y-wrap_message_content_box_msg__name', { 'y-wrap_message_content_box_msg__me' : item[defaultOptions['userId']] == userId }]">
							<u-tag
								v-if="tagOptions[item[defaultOptions['tagLabel']]]"
								:bgColor="tagOptions[item[defaultOptions['tagLabel']]] ? tagOptions[item[defaultOptions['tagLabel']]].bgColor : ''"
								:borderColor="tagOptions[item[defaultOptions['tagLabel']]] ? tagOptions[item[defaultOptions['tagLabel']]].bgColor : ''"
								:color="tagOptions[item[defaultOptions['tagLabel']]] ? tagOptions[item[defaultOptions['tagLabel']]].color : ''"
								:text="tagOptions[item[defaultOptions['tagLabel']]] ? tagOptions[item[defaultOptions['tagLabel']]].text : ''"
								size="mini"
							></u-tag>
			
							<!-- <text>{{ item[defaultOptions['name']] }}</text> -->
							<text>{{ item[defaultOptions['name']] }}</text>
						</view>
						<view
							:class="[
								{ 'y-wrap_message_content_box_msg__val': item[defaultOptions['userId']] !== userId }, 
								{ 'y-wrap_message_content_box_msg__my' : item[defaultOptions['userId']] === userId }
							]"
						>
							<view 
								v-if="item[defaultOptions['message']]"
							>{{ item[defaultOptions['message']] }}</view>
							<u-image
								@tap="lookImg(item[defaultOptions['img']], index)"
								v-if="item[defaultOptions['img']]"
								:src="item[defaultOptions['img']]"
								width="calc(60vw - 15rpx)"
								height="auto"
								mode="widthFix"
							></u-image>
						</view>
					</view>
					<!-- <view class="y_message_content_box_read">
						{{item[defaultOptions['read']]?'已读':'未读'}}
					</view> -->
				</view>
			</view>
		</scroll-view>
		<view class="y-wrap_footer">
			<view class="y-wrap_footer_show_box" id="show_box">
				<!-- @click="textShowFlag = false" -->	
				<u-icon custom-style="padding: 0 10rpx" :size="iconSize" name="mic" v-if="textShowFlag" ></u-icon>
				<u-icon custom-style="padding: 0 10rpx" :size="iconSize" name="mic" v-else @click="showText"></u-icon>
				<view class="y-wrap_footer_show_box__ipt">
					<!-- <input v-if="textShowFlag" v-model="sendVal" :focus="focus" @blur="blur"></input> -->
					<u-input 
						v-if="textShowFlag" 
						v-model="sendVal" 
						:placeholder="bannedToPost ? '禁言中' : ''" 
						placeholderStyle="text-align:center"
						:disabled="bannedToPost" 
						:focus="focus" 
						@blur="blur"
					></u-input>
					<!-- <u-button v-else @touchstart="startAudio" @touchend="endAudio">按住说话</u-button> -->
					<button v-else style="font-size: 32rpx; overflow: inherit;" @touchstart="startAudio" @touchmove="moveAudio" @touchend="endAudio">按住说话</button>
				</view>
				<view>
					<!-- <u-icon custom-style="padding: 0 10rpx" :size="iconSize" name="star"></u-icon> -->
					<!-- #ifndef MP-WEIXIN -->
						<u-icon
							customStyle="padding: 0 10rpx;"
							:size="iconSize"
							name="plus"
							@click="showHideBox"
							:class="!sendVal ? 'width_to_mini' : 'fade_show'"
							v-if="!sendVal"
						></u-icon>
						<button
							style="width:116rpx; padding: 0; text-align: center; margin-left: 10rpx;"
							type="primary"
							size="mini"
							:class="sendVal ? 'width_to_large' : 'fade_show'"
							@touchend.prevent="send"
							ref="send"
							v-else
						>发送</button>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
						<u-transition :show="!sendVal">
							<u-icon
								customStyle="padding: 0 10rpx;"
								:size="iconSize"
								name="plus"
								@click="showHideBox"
								v-if="!sendVal"
							></u-icon>
						</u-transition>
						<u-transition :show="sendVal">
						  <button
							style="width:116rpx; 60rpx; padding: 0; text-align: center; margin-left: 10rpx;"
							type="primary"
							size="mini"
							v-if="sendVal"
							@touchend.prevent="send"
						  >发送</button>
					   </u-transition>
					<!-- #endif -->
				</view>
			</view>
			<view class="y-wrap_footer_hide_box" id="hide_box">
				<view class="y-wrap_footer_hide_box_item" v-for="(item, index) in sheet" :key="index" @click="moreFun(item)">
					<view class="y-wrap_footer_hide_box_item__btn">
						<u-image v-if="item.img" :src="item.img" width="60rpx" height="60rpx" mode="aspectFill" />
						<u-icon v-else :size="iconSize" :name="item.icon"></u-icon>
						<text>{{ item.name }}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- readyCloseAudio -->
		<u-popup 
			:show="audioFlag" 
			:bgColor="readyCloseAudio ? 'rgba(255, 0, 0, 0.4)' : ''" 
			mode="center" 
			:zoom="false" 
			round="20"
		>
			<view class="y-wrap_audio">
				<view class="y-wrap_audio__large" :style="'border-color:' + borderColor">
					<view class="y-wrap_audio__small" :style="'border-color:' + borderColor">
						<view class="y-wrap_audio__mini" :style="'border-color:' + borderColor"></view>
					</view>
				</view>
			</view>
		</u-popup>
		
		<view 
			v-if="audioFlag" 
			:style="'position: fixed; bottom: 200rpx; left: 50%; transform: translateX(-50%); z-index: 10080; color: #fff;'">
			上划取消发送
		</view>
	</view>
</template>
<script>
	import { disposeTime, repairZero, deepClone, isEmpty } from './common.js'
	import props from './props.js'
	import data from './data.js'
	export default {
		props,
		watch: {
			sheetList: {
				handler: function(){
					setTimeout(() => {
						const query = uni.createSelectorQuery().in(this);
						let showBox = query.select('#show_box')
						let hideBox = query.select('#hide_box')
						hideBox.boundingClientRect((res) => {
							this.hideBoxHeight = res.height
						}).exec()
						showBox.boundingClientRect((res) => {
							this.showBoxHeight = res.height
						}).exec()
					})
				},
				immediate: true,
				deep: true
			},
			newMessageList: {
				handler(newVal, oldVal){
					const timeOptions = this.defaultOptions.time
					if(newVal.length > 0 && newVal.length != oldVal.length){
						newVal.forEach((item, index) => {
							item.showTime = index == 0 ? true : item.time - newVal[index - 1][timeOptions] >= this.intervalTime
							item.timeLabel = disposeTime(item.time)
						})
						this.list = newVal
						// 判断视口和容器高度判断要不要滚动
						setTimeout(async () => {
							if(oldVal.length == 0){
								const query = uni.createSelectorQuery().in(this);
								const scrollBox = query.select('#scrollBox')
								const containerBox = query.selectAll('.y-wrap_message_content_box')
								
								const scroll = new Promise(resolve => {
									scrollBox.boundingClientRect((res) => {
										resolve(res.height)
									}).exec()
								})
								const content = new Promise(resolve => {
									containerBox.boundingClientRect((res) => {
										let height = res.reduce((pre, next) => {
											return pre + next.height
										},0)
										resolve(height)
									}).exec()
								})
								
								const [window, container] = await Promise.all([scroll, content])
								if(window < container){
									this.scrollBottom()
								}
								return
							}
							this.scrollBottom()
						}, 100)
					}
				},
				deep: true
			},
			updateList: {
				handler: function(newVal, oldVal){
					if(isEmpty(newVal)) return
					const timeOptions = this.defaultOptions.time
					const idOptions = this.defaultOptions.msgId
					if(Object.prototype.toString.call(newVal).includes('Array')){
						//历史消息
						newVal.forEach((item, index) => {
							item.showTime = index == 0 ? true : item[timeOptions] - newVal[index - 1][timeOptions] >= this.intervalTime
							item.timeLabel = disposeTime(item[timeOptions])
						})
						this.list = newVal.concat(this.list)
					}else{
						//发送消息
						let empty = isEmpty(this.list)
						newVal.showTime = empty || newVal[timeOptions] - this.list[this.list.length - 1][timeOptions] >= this.intervalTime
						newVal.timeLabel = disposeTime(newVal[timeOptions])
						this.list.push(newVal)
						setTimeout(() => {
							this.scrollBottom()
						})
					}
				},
				immediate: true,
				deep: true
			},
			value: {
				handler: function(newVal, oldVal){
					this.sendVal = newVal
				},
				immediate: true
			}
		},
		data,
		created(){
			this.list = []
		},
		computed: {
			bottomHeight(){
				return this.footerFlag ? (this.hideBoxHeight + this.showBoxHeight + 'px') : this.showBoxHeight + 'px'
			},
			sheet(){
				let sheet = this.sheetList
				if(sheet && sheet.length > 0){
					return this.retainSheet ? this.defaultSheet.concat(sheet) : sheet
				}else{
					return this.defaultSheet
				}
			},
			borderColor(){
				return this.readyCloseAudio ? '#fff' : '#000;'
			},
			//解决watch新老数据一样问题
			newMessageList(){
				return deepClone(this.messageList)
			}
		},
		methods: {
			// 下拉刷新被触发
			onRefresh(){
				if (this.freshing) return;
				const stop = () => {
					this.triggered = false
					this.freshing = false
				}
				this.freshing = true;
				this.$emit('onRefresh', stop.bind(this))
			},
			// 下拉刷新被复位
			onReset(){
				this.triggered = 'restore'; // 需要重置
				// this.$emit('onReset')
			},
			tapAvator(item){
				this.$emit('tapAvator', item)
			},
			scrollBottom(){
				if(this.list.length == 0) return
				let duration = 100
				//'y-chat-' + this.list[this.list.length - 2][this.defaultOptions.msgId]
					this.scrollToId = 'y'
					// duration = 0
				setTimeout(() => {
					this.scrollToId = 'y-chat-' + this.list[this.list.length - 1][this.defaultOptions.msgId]
				},duration)
			},
			showHideBox(){
				this.footerFlag = !this.footerFlag
				if(this.footerFlag && this.useScrollBottom){
					setTimeout(() => {
						this.scrollBottom()
					},500)
				}
			},
			closeFooter(){
				this.footerFlag = false
			},
			lookImg(img, index){
				const urls = this.list.map(item => item.img).filter(item => item)
				const current = urls.findIndex(item => item == img)
				uni.previewImage({
					current,
					urls,
					// #ifndef MP-WEIXIN
					indicator: 'number',
					loop: true,
					// #endif
					longPressActions: {
						itemList: ['发送给朋友','保存图片'],
						success(res) {
							console.log(res,'res')
							console.log(this,'this')
						}
					}
				})
			},
			moreFun(item){
				item.default ? this[item.default]() : this.$emit(item.funLabel,item)
			},
			playCamera(){
				if(this.bannedToPost){
					uni.showToast({
						title: '当前正在禁言中, 不能拍摄',
						icon: 'none'
					})
					return
				}
				uni.chooseImage({
					sourceType: ['camera'],
					success(res){
						// console.log(res)
						this.$emit('playCamera', res)
					},
					fail(err) {
						console.error(err,'err')
					}
				})
			},
			playPhoto(){
				if(this.bannedToPost){
					uni.showToast({
						title: '当前正在禁言中, 不能发送照片',
						icon: 'none'
					})
					return
				}
				uni.chooseImage({
					sourceType: ['album'],
					success:(res) => {
						// console.log(res,'imgRes')
						this.$emit('playPhoto', res)
					},
					fail:(err) => {
						console.error(err,'imgErr')
					}
				})
			},
			send(){
				this.$emit('send', this.sendVal)
				this.sendVal = ''
				this.focus = true
			},
			blur(){
				this.focus = false
			},
			
			showText(){
				this.textShowFlag = true
			},
			startAudio(e){
				if(!this.textShowFlag){
					this.audioFlag = true
					this.y = e.changedTouches[0].pageY
				}
			},
			moveAudio(e){
				const y = e.changedTouches[0].pageY
				if(this.y - y > 70){
					this.readyCloseAudio = true
				}else{
					this.readyCloseAudio = false
				}
			},
			endAudio(){
				this.audioFlag = false
				this.readyCloseAudio = false
			}
		}
	}
</script>

<style lang="scss">
// import ''
@mixin msgBox ($diretion, $position, $symbol) {
	content: '';
	display: block;
	position: absolute;
	#{$diretion}: auto;
	#{$position}: 0;
	top: 10rpx;
	width: 0;
	height: 0;
	// transform: translate(100%);
	transform: translateX(#{$symbol}90%);
	border: 15rpx solid transparent;
	border-#{$diretion}-color: #fff
}

@mixin audioAnimate ($color){
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border: 8rpx solid $color;
	border-radius: 50%;
	// border-top-color: transparent !important;
	border-left-color: transparent !important;
	border-right-color: transparent !important;
	border-bottom-color: transparent !important;
}

@keyframes fade_show {
	0% {
		opacity: 0;
		display: none;
	}
	10% {
		opacity: 0.1;
		display: block;
	}
	100% {
		opacity: 1;
		display: block;
	}
}

@keyframes width_animate_mini {
	0% {
		width: 116rpx;
	}
	50% {
		width: 98rpx;
	}
	100% {
		width: 80rpx;
	}
}

@keyframes width_animate_large {
	0% {
		width: 80rpx;
	}
	50% {
		width: 98rpx;
	}
	100% {
		width: 116rpx;
	}
}

.y-wrap {
	overflow: hidden;
	height: 100%;
	width: 100%;
	position: absolute;
	top: 0px;
	bottom: 0px;
	&_message_content {
		background-color: #f5f5f5;
		height: calc(100% - var(--bottom-height));
		transition: height 0.5s;
		&_box{
			padding: 20rpx 30rpx;
			height: auto;
			& > view:last-child{
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
			}
			&_msg {
				max-width: 60vw;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				padding: 0 20rpx;
				&__name {
					// padding: 0 10px 5px;
					padding-bottom: 10rpx;
					height: 56rpx;
					font-size: 24rpx;
					display: flex;
					align-items: center;
					& > text {
						padding: 0 10px;
					}
				}
				
				&__me {
					flex-direction: row-reverse;
				}
				
				&__val {
					background-color: #fff;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					flex-wrap: wrap;
					word-break: break-all;
					padding: 15rpx;
					border-radius: 10rpx;
					position: relative;
				}
				
				&__val::before {
					@include msgBox(right, left, '-')
				}
				
				&__my {
					background-color: #3a9af6;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					flex-wrap: wrap;
					word-break: break-all;
					padding: 15rpx;
					border-radius: 10rpx;
					position: relative;
					color: #fff;
				}
				&__my::before {
					@include msgBox(left, right, '+')
					border-left-color: #3a9af6;
				}
			}
				
			&_my {
				align-items: flex-end;
			}
		}

		&_my {
			& > view:last-child {
				flex-direction: row-reverse;
			}
		}
	}

	&_footer {
		width: 100%;
		background-color: #fff;
		position: relative;
		z-index: 10078;
		&_show_box {
			padding: 20rpx;
			box-sizing: border-box;
			height: 140rpx;
			display: flex;
			align-items: center;

			&__ipt {
				flex: 1;
			}
			.fade_show {
				animation: fade_show .3s linear;
			}

			.width_to_mini {
				animation: width_animate_mini .3s linear;
			}

			.width_to_large {
				animation: width_animate_large .3s linear;
			}

			view:last-child{
				display: flex;
			}
		}
		&_hide_box {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			&_item {
				width: 25%;
				display: flex;
				justify-content: center;
				padding-bottom: 20rpx;
				&__btn {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
				}
			}
		}
	}
	
	&_audio {
		// background-color: #fff;
		position: relative;
		width: 210rpx;
		height: 210rpx;
		border-radius: 20rpx;
		padding: 0 20rpx;
		transform: translateY(25%);
		&__large {
			transition: border-color 0.6s;
			width: 200rpx;
			height: 200rpx;
			@include audioAnimate(#000);
		}
		&__small {
			transition: border-color 0.4s;
			width: 125rpx;
			height: 125rpx;
			@include audioAnimate(#000);
		}
		&__mini {
			transition: border-color 0.2s;
			width: 50rpx;
			height: 50rpx;
			@include audioAnimate(#000);
		}
	}
	
	// $_audio_popup {
		
	// }
	
}


</style>
