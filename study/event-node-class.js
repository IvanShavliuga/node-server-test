const EventEmitter = require('events').EventEmitter
class Countdown extends EventEmmiter {
	constructor(seconds, superstitious) {
		super();
		this.seconds = seconds;
		this.superstitious = superstitious;
	}
	go() {
		const countdown = this;
		const timeoutIds = [];
		return new Promise(function(resolve, reject) {
			for(let i=countdown.seconds; i>=0; i--) {
				timeoutIds.push(setTimeout(function() {
					if(countdown.superstitious && i===13) {
						timeoutIds.forEach(clearTimeout);
						return reject(new Error('Принципиально это не считаем'))
					}
					countdown.emit('tick', i);
					if(i===0) resolve();
				}, (countdown.seconds-i)*1000))
			}
		})
	}
}
function Launch() {
	return new Promise(function(resolve,reject) {
		console.log('Поехали');
		setTimeout(function(){
			resolve('на орбите');
		}, 2*1000);
	})
}
const c = new Countdown(20).on('tick', i=>console.log('ind: '+i));

c.go()
	.then(launch)
	.then(msg => console.log('msg: '+msg))
	.catch(err => console.log('err: '+err))
