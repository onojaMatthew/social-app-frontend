function random() {
  const char = "1234567890ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz";
  let stringLength = 6;
  let randWord = "";
  for (let i = 0; i < stringLength; i++) {
    const randomWord = Math.floor(Math.random() * char.length);
    randWord += char.substring(randomWord,randomWord+1);
  }
  console.log(randWord, " Hey! Happy you")
}

random();