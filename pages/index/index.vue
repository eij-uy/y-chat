<template>
	<view>
		<y-chat
			:userId="userId"
			:value="val"
			:messageList="messageList"
			:updateList="updateList"
			:defaultOptions="defaultOptions"
			:tagOptions="tagOptions"
			:sheetList="sheetList"
			@onRefresh="getNext"
			@playPhoto="playPhoto"
			@playCamera="playCamera"
			@send="send"
			@tapAvator="tapAvator"
			@redPacket="redPacket"
		></y-chat>
	</view>
</template>

<script>
	// 用来获取随机id的, 正式项目不需要
	function getRandomNum(){
		return Math.floor(Math.random() * 1000).toString() + Math.floor(Math.random() * 1000).toString()
	}
	export default {
		data() {
			return {
				val: '人生若只如初见，何事秋风悲画扇',
				userId: 1,
				tagOptions: {
					'lin':{
						text: '山园小梅·其一',
						bgColor: '#ff4100',
						color: '#fff'
					},
					'mao': {
						text: '菩萨蛮',
						bgColor: '#7d7dff',
						color: '#fff'
					},
					'li': {
						text: '渔歌子·荻花秋',
						bgColor: '#fddc71',
						color: '#fff'
					},
					'jiang': {
						text: '湘月·五湖旧约',
						bgColor: '#f86b2f',
						color: '#fff'
					},
					'jiang1':{
						text: '水龙吟·夜深客子移舟处',
						bgColor: '#f86b2f',
						color: '#fff'
					},
					'jiang2':{
						text: '八归·湘中送胡德华',
						bgColor: '#d4943b',
						color: '#fff'
					},
					'yuan': {
						text: '夜过借园见主人坐月下吹笛',
						bgColor: '#e06c75',
						color: '#fff'
					},
					'gu': {
						text: '浣溪沙',
						bgColor: '#42a5f5',
						color: '#fff'
					},
					'wen': {
						text: '初秋寄友人',
						bgColor: '#465e7d',
						color: '#fff'
					},
					'wu': {
						text: '暗香疏影·夹钟宫赋墨梅',
						bgColor: '#e9a5b4',
						color: '#fff'
					},
					'libai': {
						text: '行路难·其二',
						bgColor: '#e9a5b4',
						color: '#fff'
					},
					'wanghan': {
						text: '凉州词二首·其一',
						bgColor: '#465e7d',
						color: '#fff'
					},
					'lihe': {
						text: '雁门太守行',
						bgColor: '#f86b2f',
						color: '#fff'
					},
					'censhen': {
						text: '逢入京使',
						bgColor: '#42a5f5',
						color: '#fff'
					},
					'baijvyi': {
						text: '长恨歌',
						bgColor: '#ff4100',
						color: '#fff'
					},
					'zhangruoxu': {
						text: '春江花月夜',
						bgColor: '#7d7dff',
						color: '#fff'
					},
					'yanjidao': {
						text: '鹧鸪天·彩袖殷勤捧玉钟',
						bgColor: '#d4943b',
						color: '#fff'
					}
				},
				defaultOptions: {
					userId: 'userId',
					msgId: 'id',
					name: 'name',
					message: 'message',
					img: 'img',
					time: 'time',
					avator: 'avator',
					tagLabel: 'tagLabel'
				},
				messageList: [],
				updateList:[],
				sheetList: [
				  {
					img: '',
					icon: 'red-packet-fill',
					name: '红包',
					funLabel: 'redPacket'
				  }
				]
			}
		},
		onLoad(options) {
			
			setTimeout(() => {
				const list = [
					[
						{
							userId: 2,
							id: 2,
							name: '林逋',
							message: '疏影横斜水清浅，暗香浮动月黄昏',
							time: new Date().getTime(),
							avator: '',
							tagLabel: 'lin'
						},
						{
							userId: 3,
							id: 3,
							name: '毛熙震',
							message: '梨花满院飘香雪，高楼夜静风筝咽',
							time: new Date().getTime(),
							avator:'',
							tagLabel: 'mao'
						},
						{
							userId: 1,
							id: 1,
							name: '姜夔',
							message: '暗柳萧萧，飞星冉冉，夜久知秋信',
							time: new Date().getTime(),
							avator: '',
							tagLabel: 'jiang'
						},
						{
							userId: 4,
							id: 4,
							name: '李珣',
							message: '荻花秋，潇湘夜，橘洲佳景如屏画',
							time: new Date().getTime(),
							avator:'',
							tagLabel: 'li'
						},
						{
							userId: 5,
							id: 5,
							name: '顾敻',
							message: '云淡风高叶乱飞，小庭寒雨绿苔微，深闺人静掩屏帷',
							time: new Date().getTime(),
							avator:'',
							tagLabel: 'gu'
						},
						{
							userId: 2,
							id: 6,
							name: '袁枚',
							message: '半天凉月色，一笛酒人心',
							time: new Date().getTime(),
							avator:'',
							tagLabel: 'yuan'
							
						},
						{
							userId: 1,
							id: 7,
							name: '姜夔',
							message: '红衣入桨，青灯摇浪，微凉意思',
							time: new Date().getTime(),
							avator:'',
							tagLabel: 'jiang1'
						},
						{
							userId: 2,
							id: 8,
							name: '温庭筠',
							message: '闲梦正悠悠，凉风生竹楼',
							time: new Date().getTime(),
							avator:'',
							tagLabel: 'wen'
						},
						{
							userId: 2,
							id: 9,
							name: '吴文英',
							message: '记五湖、清夜推篷，临水一痕月',
							time: new Date().getTime(),
							avator:'',
							tagLabel: 'wu'
						},
						{
							userId: 1,
							id: 10,
							name: '姜夔',
							message: '芳莲坠粉，疏桐吹绿，庭院暗雨乍歇',
							time: new Date().getTime(),
							avator:'',
							tagLabel: 'jiang2'
						},
					],
					[
						{
							userId: 1,
							id: 1,
							name: '白',
							message: '',
							time: new Date().getTime(),
							avator: '',
							img: 'https://tva3.sinaimg.cn/large/9bd9b167gy1g4lhmt4zm5j21hc0xcnhs.jpg'
						},
						{
							userId: 2,
							id: 2,
							name: '黑',
							message: '',
							time: new Date().getTime(),
							avator: '',
							img: require('@/static/ces.png')
						},
					],
					[
						{
							userId: 1,
							id: 2,
							name: '白',
							message: '君不见昔时燕家重郭隗，拥篲折节无嫌猜',
							time: new Date().getTime(),
							avator: '',
							tagLabel: 'libai'
						},
						{
							userId: 2,
							id: 2,
							name: '黑',
							message: '醉卧沙场君莫笑，古来征战几人回',
							time: new Date().getTime(),
							avator: '',
							tagLabel: 'wanghan'
						},
						{
							userId: 1,
							id: 2,
							name: '白',
							message: '报君黄金台上意，提携玉龙为君死',
							time: new Date().getTime(),
							avator: '',
							tagLabel: 'lihe'
						},
						{
							userId: 2,
							id: 2,
							name: '黑',
							message: '马上相逢无纸笔，凭君传语报平安',
							time: new Date().getTime(),
							avator: '',
							tagLabel: 'censhen'
						},
						{
							userId: 1,
							id: 2,
							name: '白',
							message: '缓歌谩舞凝丝竹，尽日君王看不足',
							time: new Date().getTime(),
							avator: '',
							tagLabel: 'baijvyi'
						},
						{
							userId: 2,
							id: 2,
							name: '黑',
							message: '此时相望不相闻，愿逐月华流照君',
							time: new Date().getTime(),
							avator: '',
							tagLabel: 'zhangruoxu'
						},
						{
							userId: 1,
							id: 2,
							name: '白',
							message: '几回魂梦与君同 ',
							time: new Date().getTime(),
							avator: '',
							tagLabel: 'yanjidao'
						}
					]
				]
				let index = options.id - 1
				this.messageList = list[index] || []
			},1000)
		},
		methods: {
			tapAvator(e){
				console.log(e,'ee')
			},
			getNext(stop){
				// 请求接口 || ... 之后调用stop方法停止动画
				setTimeout(() => {
					this.getList()
					stop()
				}, 100)
			},
			getList(){
				// 假设list是获取到的历史消息
				setTimeout(() => {
					const list = [
						{
							userId: 2,
							id: getRandomNum(), //不重复id
							name: '黑',
							message: '人生若只如初见，何事秋风悲画扇',
							time: new Date().getTime(),
							avator:'',
						},
						{
							userId: 3,
							id: getRandomNum(),
							name: '黑',
							message: '落花人独立，微雨燕双飞',
							time: new Date().getTime(),
							avator:'',
						},
						{
							userId: 1,
							id: getRandomNum(),
							name: '白',
							message: '疏影横斜水清浅，暗香浮动月黄昏',
							avator:'',
							tagLabel: 'lin'
						},
					]
				},2000)
				this.updateList = list
			},
			get(e){
				console.log(e,'ee')
			},
			playPhoto(file){
				console.log(file,'file')
			},
			playCamera(file){
				console.log(file,'file')
			},
			send(val){
				//两种方式
				//方式一: 把数据以对象形式赋值给updateList即可自动发送(推荐)
				this.updateList = {
					userId: 1,
					id: getRandomNum(), // id必须是唯一值
					name: '姜夔',
					message: val,
					time: new Date().getTime(),
					avator: 'https://tva3.sinaimg.cn/large/9bd9b167gy1g4lhmt4zm5j21hc0xcnhs.jpg',
					tagLabel: 'jiang'
				}
				//方式二: 自己操作messageList => 可以通过push, 也可以messageList整个重新赋值
				// this.messageList.push({
				// 	userId: 1,
				// 	id: ++this.messageList[this.messageList.length - 1].id + 10, // id必须是唯一值
				// 	name: '白',
				// 	message: val,
				// 	time: new Date().getTime(),
				// 	avator: 'https://tva3.sinaimg.cn/large/9bd9b167gy1g4lhmt4zm5j21hc0xcnhs.jpg',
				// 	tagLabel: 1
				// })
			},
			redPacket(){
				
			}
		}
	}
</script>

<style>
</style>
