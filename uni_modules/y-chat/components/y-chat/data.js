export default function (){
	return {
		sendVal: '',
		footerFlag: false,
		scrollToId: '',
		freshing: false,
		triggered: true,
		hideBoxHeight: 0,
		showBoxHeight: 0,
		
		defaultSheet: [
			{
				img: '',
				icon: 'camera',
				name: '拍摄',
				default: 'playCamera'
			},
			{
				img: '',
				icon: 'photo',
				name: '相册',
				default: 'playPhoto'
			}
		],
		focus: false,
		
		list: [],
		
		textShowFlag: true,
		audioFlag: false,
		y: 0,
		readyCloseAudio: false,
	}
}