new Vue({
  el: '#game',
  data: {
    hours: '00',
    minutes: '00',
    seconds: '00',
    hh: '00',
    mm: '00',
    ss: '00',
    initialDate: '',
    currentDate: '',
    count_x: 4,
    count_y: 3,
    counters: 0,
    counter: 0,
    start_block: true,
    start: true,
    win: false,
    stop: false,
    res: [],
    tables: [],
    timerId: '',
    isActive: false,
    cells: Array.apply(null, { length: 6 }).map(function (_, index) {
      return {
        id: index + 1,
        number: index + 1
      }
    }).concat(
      Array.apply(null, { length: 6 }).map(function (_, index) {
        return {
          id: index + 19,
          number: index + 1
        }
      }))
  },
  methods: {
    count: function (x, y, event) {
      let el = event.target
      Array.prototype.forEach.call(document.querySelectorAll('.cell_count'), function (el, i) {
        el.classList.remove('count-items')
      })
      el.classList.add('count-items')
      this.count_x = x
      this.count_y = y
      this.cells = []
      this.cells = Array.apply(null, { length: (this.count_x * this.count_y) / 2 }).map(function (_, index) {
        return {
          id: index + 1,
          number: index + 1
        }
      }).concat(
        Array.apply(null, { length: (this.count_x * this.count_y) / 2 }).map(function (_, index) {
          return {
            id: index + 24,
            number: index + 1
          }
        }))
      if (this.count_x === 4 && this.count_y === 3) {
        document.querySelector('.square').style.cssText = 'width: 400px; height: 300px; overflow: hidden;'
        document.querySelector('.bg').style.cssText = 'width: 400px; height: 300px; overflow: hidden;'
      } else if (this.count_x === 4 && this.count_y === 4) {
        document.querySelector('.square').style.cssText = 'width: 400px; height: 400px; overflow: hidden;'
        document.querySelector('.bg').style.cssText = 'width: 400px; height: 400px; overflow: hidden;'
      } else if (this.count_x === 5 && this.count_y === 4) {
        document.querySelector('.square').style.cssText = 'width: 500px; height: 400px; overflow: hidden;'
        document.querySelector('.bg').style.cssText = 'width: 500px; height: 400px; overflow: hidden;'
      } else if (this.count_x === 6 && this.count_y === 5) {
        document.querySelector('.square').style.cssText = 'width: 600px; height: 500px; overflow: hidden;'
        document.querySelector('.bg').style.cssText = 'width: 600px; height: 500px; overflow: hidden;'
      } else if (this.count_x === 6 && this.count_y === 6) {
        document.querySelector('.square').style.cssText = 'width: 600px; height: 600px; overflow: hidden;'
        document.querySelector('.bg').style.cssText = 'width: 600px; height: 600px; overflow: hidden;'
      } else if (this.count_x === 7 && this.count_y === 6) {
        document.querySelector('.square').style.cssText = 'width: 700px; height: 600px; overflow: hidden;'
        document.querySelector('.bg').style.cssText = 'width: 700px; height: 600px; overflow: hidden;'
      }
      this.cells = _.shuffle(this.cells)
      this.start_block = false
      this.win = false
      this.start = false
      this.stop = true
      this.reset()
    },
    reset: function () {
      this.start = !this.start
      this.start_block = !this.start_block
      this.stop = !this.stop
      this.counters = 0
      this.counter = 0
      document.querySelector('.secs').innerHTML = '00'
      document.querySelector('.mins').innerHTML = '00'
      document.querySelector('.hours').innerHTML = '00'
      setTimeout(() =>
        Array.prototype.forEach.call(document.querySelectorAll('.cell'), function (el, i) {
          el.classList.remove('selected')
          el.classList.remove('actives')
          el.classList.add('active')
        }), 0)
      
      this.stopTimer()
    },
    item: function (event) {
      let el = event.target
      new Audio('sounds.mp3').play()
      if (el.classList.contains('active')) {
        this.res.push({ text: el.innerText, id: el.getAttribute('id') })
        if (this.res.length === 2 && this.res[0].text === this.res[1].text) {
          this.counter++
          this.counters++
          document.getElementById(`${this.res[0].id}`).classList.add('selected')
          document.getElementById(`${this.res[1].id}`).classList.add('selected')
          setTimeout(() => this.res = [], 0)
        } else if (this.res.length === 2 && this.res[0].text !== this.res[1].text) {
          this.counter++
          let els_1 = document.getElementById(`${this.res[0].id}`)
          let els_2 = document.getElementById(`${this.res[1].id}`)
          
          function check () {
            els_1.classList.remove('actives')
            els_1.classList.add('active')
            els_2.classList.remove('actives')
            els_2.classList.add('active')
          }
          
          setTimeout(check, 1000)
          setTimeout(() => this.res = [], 0)
        }
      } else {
        console.log('log')
      }
      el.classList.remove('active')
      el.classList.add('actives')
      if (document.querySelectorAll('.selected').length === this.count_x * this.count_y) {
        this.stop = !this.stop
        setTimeout(() => this.start_block = !this.start_block, 1000)
        setTimeout(() => this.win = !this.win, 1000)
        let secs = document.querySelector('.secs').innerHTML
        let mins = document.querySelector('.mins').innerHTML
        let hours = document.querySelector('.hours').innerHTML
        document.querySelector('.secs').innerHTML = secs
        document.querySelector('.mins').innerHTML = mins
        document.querySelector('.hours').innerHTML = hours
        this.stopTimer()
        this.tables.push({
          squere: document.querySelector('.cell_count.count-items').innerHTML,
          coincidence: this.counters,
          move: this.counter,
          time: hours + ' : ' + mins + ' : ' + secs
        })
        setTimeout(() => new Audio('tada.mp3').play(), 1000)
      }
    },
    restart: function () {
      setTimeout(() => this.win = !this.win, 500)
      setTimeout(() => this.start_block = !this.start_block, 500)
      setTimeout(() => this.reset(), 500)
      setTimeout(() => this.shuffle(), 500)
    },
    startStopwatch: function () {
      this.initialDate = new Date
      this.timerId = setInterval(this.start_counter, 1000)
    },
    getTime: function () {
      this.currentDate = new Date
      timer = new Date(this.currentDate - this.initialDate)
      this.seconds = timer.getSeconds()
      this.minutes = timer.getMinutes()
      this.hours = timer.getUTCHours()
      if (this.seconds < 10) {
        this.seconds = '0' + this.seconds
      }
      if (this.minutes < 10) {
        this.minutes = '0' + this.minutes
      }
      if (this.hours < 10) {
        this.hours = '0' + this.hours
      }
    },
    start_counter: function () {
      this.getTime()
      document.querySelector('.secs').innerHTML = this.seconds
      document.querySelector('.mins').innerHTML = this.minutes
      document.querySelector('.hours').innerHTML = this.hours
    },
    stopTimer: function () {
      clearInterval(this.timerId)
    },
    shuffle: function () {
      this.cells = _.shuffle(this.cells)
      this.start = !this.start
      this.start_block = !this.start_block
      this.stop = !this.stop
      setTimeout(() =>
        Array.prototype.forEach.call(document.querySelectorAll('.cell'), function (el, i) {
          el.classList.add('active')
        }), 0)
      this.startStopwatch()
    }
  },
  mounted: function () {
    Array.prototype.forEach.call(document.querySelectorAll('.cell'), function (el, i) {
      el.classList.add('active')
    })
  }
})
