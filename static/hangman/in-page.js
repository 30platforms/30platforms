window.onload = function () {

  new Vue({
    el: "#vfor",
    data: {
      possibleLetters: ["A", "B", "C", "D", "E", "F", "G"]
    }
  })

  new Vue({
    el: '#eventlistener',
    data: {
      displayLetters: ['','','',''],
      wordLetters: ['C','O','O','L'],
      possibleLetters: ['A', 'B', 'C', 'L', 'O'],
      console: 'Click a letter above to see the result'
    },
    methods: {
      tryLetter(letter) {
        for (let i = 0; i < this.displayLetters.length; i++) {
          if (letter === this.wordLetters[i]) {
            this.displayLetters.splice(i, 1, letter)
          }
        }
        this.console = 'I tried letter ' + letter
      }
    }
  })

  new Vue({
    el: '#conditionalrendering',
    data: {
      strikes: 0
    },
    methods: {
      addStrike() {
        this.strikes++
      }
    }
  })

}