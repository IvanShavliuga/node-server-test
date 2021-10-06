// const EventEmitter = require('events').EventEmitter
function Countdown(seconds, superstitious) {
	this.timeoutIds = [];
	return new Promise((resolve, reject) => {
		for(let i=seconds; i>=0; i--) {
			this.timeoutIds.push(setTimeout(() => {
				console.log('ind: '+i)
				if(i===13) {
						this.timeoutIds.forEach(clearTimeout);
						return reject(new Error('Принципиально это не считаем'))
				}
				if(i===0) resolve();
			}, (seconds-i)*1000))
		}
	})
}
function launch() {
	return new Promise(function(resolve,reject) {
		console.log('Поехали');
		setTimeout(function(){
			resolve('на орбите');
		}, 2*1000);
	})
}
const c = new Countdown(20)
	.then(launch)
	.then(msg => console.log('msg: '+msg))
	.catch(err => console.log('err: '+err))
