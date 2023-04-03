export const disposeTime = (time) => {
	//当前时间
	const nowDate = new Date()
	const nowTime = nowDate.getTime()
	const nowYear = nowDate.getFullYear()
	const nowMonth = nowDate.getMonth() + 1
	const nowDay = nowDate.getDate()
	
	// 聊天时间
	const timeDate = new Date(time)
	const timeYear = timeDate.getFullYear()
	const timeMonth = timeDate.getMonth() + 1
	const timeDay = timeDate.getDate()
	const timeWeekDay = timeDate.getDay()
	const timeHours = timeDate.getHours()
	const timeMinutes = timeDate.getMinutes()
	const timeSeconds = timeDate.getSeconds()
	
	const dateList = ['日','一','二','三','四','五','六'] 
	const cha = nowDay - timeDay

	let returnDate = ''
	
	if(nowYear !== timeYear){
		returnDate = `${repairZero(timeYear)}-${repairZero(timeMonth)}-${repairZero(timeDay)} ${repairZero(timeHours)}:${repairZero(timeMinutes)}:${repairZero(timeSeconds)}`
	}else if(nowMonth !== timeMonth){
		returnDate = `${repairZero(timeMonth)}-${repairZero(timeDay)} ${repairZero(timeHours)}:${repairZero(timeMinutes)}:${repairZero(timeSeconds)}`
	}else if(nowDay !== timeDay){
		if(cha <= 7 && cha > 2){
			returnDate = `星期${dateList[timeWeekDay]} ${repairZero(timeHours)}:${repairZero(timeMinutes)}:${repairZero(timeSeconds)}`
		}else if(cha == 2){
		console.log(nowDay - timeDay)
			returnDate = `前天 ${repairZero(timeHours)}:${repairZero(timeMinutes)}:${repairZero(timeSeconds)}`
		}else if(cha == 1){
			returnDate = `昨天 ${repairZero(timeHours)}:${repairZero(timeMinutes)}:${repairZero(timeSeconds)}`
		}
	}else if(nowDay === timeDay){
		returnDate = `${repairZero(timeHours)}:${repairZero(timeMinutes)}:${repairZero(timeSeconds)}`
	}
	return returnDate
}

export const repairZero = (num) => {
	if(num >= 0 && num < 10){
		return '0' + num
	}else{
		return num
	}
}


export const deepClone = (data) => {
	let cloneData = Array.isArray(data) ? [] : {}
	if(data && typeof data === 'object'){
		for(let key in data){
			if(data.hasOwnProperty(key)){
				if(data[key] && typeof data[key] === 'object'){
					cloneData[key] = deepClone(data[key])
				}else{
					cloneData[key] = data[key]
				}
			}
		}
	}
	return cloneData
}

export const isEmpty = (data) => {
	if(data == null) return true
	
	if(typeof data == 'boolean') return false
	
	if(typeof data == 'number') return !data
	
	switch(Object.prototype.toString.call(data)){
		case '[object String]':
		case '[object Array]': {
			return !data.length
		}
		case '[object Set]':
		case '[object Map]':
		case '[object File]': {
			return !data.size
		}
		case '[object Object]': {
			return !Object.keys(data).length
		}
	}
}