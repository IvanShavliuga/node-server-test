const EventEmitter = require('events').EventEmitter;

class Countdown extends EventEmitter {
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
				timeoutIds.push(setTimeout(function(){
					if(countdown.superstitious && i===13) {
					   timeoutIds.forEach(clearTimeout);
						return reject(new Error('Принципиально это не считаем'))
					}
					countdown.emit('tick',i)
					if(i===0) resolve();
				}, (countdown.seconds-i)*1000))	
			}
		});
	}
}
function launch() {
   return new Promise(function(resolve, reject) {
      console.log('поехали')
	  setTimeout(function(){
	  	 resolve('на орбите')
	  },2000)
   })
}

const c = new Countdown(15, false)
c.on('tick', i => console.log(i))
c.go()
  .then(launch)
 .then(msg=>console.log(msg))
 .catch(err=>console.log('Хьюстон, у нас проблемы: '+err))
