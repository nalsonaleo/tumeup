<template>
	<view class="root" :style="{width,height}">
		<image :style="{width,height}" class="posterImg" :src="posterUrl" mode="aspectFit"></image>
		<view :style="{width,height}" @click="state=!state" class="box">
			<image class="playIcon" src="../../static/play.png" mode="widthFix"></image>
		</view>
		<video :id="videoId" :style="{height,width:state?'750rpx':0}" v-if="isShow" autoplay="true" @pause="state=0"
		 @timeupdate="timeupdate" @fullscreenchange="fullscreenchange" class="video" :src="url"></video>
		<!-- <progress :style="{'top':height,width}" class="progress" :percent="currentTime?parseInt(currentTime/duration*100):0" show-info border-radius="5" active></progress> -->
	</view>
</template>

<script>
	export default {
		computed: {
			posterUrl() {
				if (this.poster) return this.poster
				return this.url + '?x-oss-process=video/snapshot,t_' + (parseInt(this.currentTime * 1000)) + ',f_jpg,w_800,m_fast'
			}
		},
		created() {
			this.videoId = Date.now() + Math.ceil(Math.random() * 10000000) + "";
		},
		mounted() {
			this.VideoContext = uni.createVideoContext(this.videoId)
		},
		methods: {
			fullscreenchange(e) {
				console.log(e.detail.fullScreen);
				this.state = e.detail.fullScreen
			},
			timeupdate(e) {
				//console.log(e.detail);
				this.duration = e.detail.duration
				this.currentTime = e.detail.currentTime
			}
		},
		watch: {
			state(state, oldValue) {
				console.log(state, 'state');
				if (!state) {
					this.VideoContext.pause();
					this.isShow = false;
				} else {
					this.isShow = true;
					this.$nextTick(() => {
						this.VideoContext.play()
						this.VideoContext.requestFullScreen({
							direction: this.direction
						})
					})
				}
			}
		},
		data() {
			return {
				VideoContext: {},
				state: false,
				isShow: false,
				currentTime: 0,
				duration: 0,
				videoId: ''
			};
		},
		props: {
			poster: {
				type: [String, Boolean],
				default () {
					return ''
				}
			},
			url: {
				type: String,
				default () {
					return ''
				}
			},
			direction: {
				type: Number,
				default () {
					return 0
				}
			},
			width: {
				type: String,
				default () {
					return "750rpx";
				}
			},
			height: {
				type: String,
				default () {
					return "450rpx";
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.root {
		position: relative;
		width: 750rpx;
		height: 300px;
		overflow: hidden;
	}

	.posterImg,
	.video,
	.box {
		display: flex;
		width: 750rpx;
		height: 300px;
		//border: solid 1px red;absolute
		position: absolute;
	}

	.posterImg {
		//border: solid red 1px;
	}

	.box {
		justify-content: center;
		align-items: center;
	}

	.playIcon {
		width: 100rpx;
	}
</style>
