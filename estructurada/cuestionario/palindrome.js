const { ask, rl } = require('../../utils/readline');

async function palindromeCheck() {
  const phrase = await ask('Introduce una frase: ');

  let isPalindrome = false
  let phraseWithoutEmptySpaces = ''
  let backwardsPhrase = ''

  const ACCENT_VOWELS = ['á', 'é', 'í', 'ó', 'ú']
  const VOWELS = ['a', 'e', 'i', 'o', 'u']

  for (let i = 0; i < phrase.length; i++) {
    if(phrase[i] !== ' ') {
      let character = phrase[i]
      for (let i = 0; i < ACCENT_VOWELS.length; i++) {
        if (character === ACCENT_VOWELS[i]) {
          character = VOWELS[i]
        }
      }
      phraseWithoutEmptySpaces+=character
    }
  }

  for (let i = phraseWithoutEmptySpaces.length -1; i >= 0; i--) {
    backwardsPhrase+=phraseWithoutEmptySpaces[i]
  }

  isPalindrome = phraseWithoutEmptySpaces === backwardsPhrase
  
  console.log(`${isPalindrome ? 'si' : 'no'} es palíndromo`);

  rl.close();
}

palindromeCheck()