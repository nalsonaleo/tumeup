<template>
	<view class="page_box">
		<view class="head_box"></view>
		<view class="content_box"><shopro-parse :content="richText"></shopro-parse></view>
		<view class="foot_box"></view>
	</view>
</template>

<script>
import shoproParse from '@/components/parse/parse.vue';
export default {
	components: {
		shoproParse
	},
	data() {
		return {
			richText: `<h3>一、${this.$t('public.richtext.zz')}</h3><h5>1.1 ${this.$t('public.richtext.zz.one')}。<h5>`
		};
	},
	computed: {},
	onLoad() {
		
	},
	methods: {
		
		
	}
};
</script>

<style lang="scss">
.content_box {
	background: #fff;
	padding: 30rpx;
}
</style>
