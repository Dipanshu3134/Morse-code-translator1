const MorseCode = {

    encode: (data) => {
      return MorseCode.morse.call(this, data);
    },
  
    decode: (data) => {
      return MorseCode.morse.call(this, data, true);
    },
  
    morse: (data, decode=false) => {
  
      this.map = {
          a: '.-',      b: '-...',    c: '-.-.',    d: '-..',
          e: '.',       f: '..-.',    g: '--.',     h: '....',
          i: '..',      j: '.---',    k: '-.-',     l: '.-..',
          m: '--',      n: '-.',      o: '---',     p: '.--.',
          q: '--.-',    r: '.-.',     s: '...',     t: '-',
          u: '..-',     v: '...-',    w: '.--',     x: '-..-',
          y: '-.--',    z: '--..',    1: '.----',   2: '..---',
          3: '...--',   4: '....-',   5: '.....',   6: '-....',
          7: '--...',   8: '---..',   9: '----.',   0: '-----',
  
          '.': '.-.-.-',    ',': '--..--',    '?': '..--..',
          "'": '.----.',    '/': '-..-.',     '(': '-.--.',
          ')': '-.--.-',    '&': '.-...',     ':': '---...',
          ';': '-.-.-.',    '=': '-...-',     '+': '.-.-.',
          '-': '-....-',    '_': '..--.-',    '"': '.-..-.',
          '$': '...-..-',   '!': '-.-.--',    '@': '.--.-.',
          ' ': '/',
      };
  
      if(decode) {
        this.map = (
          () => {
            var tmp = {};
            var k;
            for(k in this.map) {
              if(!this.map.hasOwnProperty(k)) continue;
              tmp[this.map[k]] = k;
            }
            return tmp;
          }
        )();
  
        return data.split(' ').filter( (v) => {
          return this.map.hasOwnProperty(v.toLowerCase());
        }).map( (v) => {
          return this.map[v.toLowerCase()].toUpperCase();
        }).join('');
  
      } else {
        return data.split('').filter( (v) => {
          return this.map.hasOwnProperty(v.toLowerCase());
        }).map( (v) => {
          return this.map[v.toLowerCase()].toUpperCase();
        }).join(' ').replace(/,\/,/g, '/');
      }
    },
  
    test: () => {
      console.log('Testing the encoding function with string:');
      console.log('just a test');
      mc = MorseCode.encode.call(this, 'just a test');
      console.log('Encoding returned: ' + mc);
      console.log('Testing the decoding function with morse code string:');
      console.log(mc);
      pt = MorseCode.decode.call(this, mc);
      console.log('Decoding returned: ' + pt)
    }
};

let text = document.getElementById("text");
let morse = document.getElementById("morse");
let m = Object.create(MorseCode);

text.addEventListener("input", function(){
    morse.value = m.encode(text.value);
});

morse.addEventListener("input", function(){
    text.value = m.decode(morse.value);
});