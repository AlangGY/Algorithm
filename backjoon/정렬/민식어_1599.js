/*
백준 1599 민식어
https://www.acmicpc.net/problem/1599
*/

const [_, ...words] = require("fs")
  .readFileSync("example.txt")
  .toString()
  .trim()
  .split("\n");

const solution = (words) => {
  const minsikLanguageOrderMap = Object.fromEntries(
    [
      "a",
      "b",
      "k",
      "d",
      "e",
      "g",
      "h",
      "i",
      "l",
      "m",
      "n",
      "ng",
      "o",
      "p",
      "r",
      "s",
      "t",
      "u",
      "w",
      "y",
    ].map((char, index) => [char, index])
  );
  const regex = /ng|\w/g;
  const splittedWords = words.map((word) => word.match(regex));

  splittedWords.sort((word1, word2) => {
    const diffIndex = word1.findIndex((char1, index) => char1 !== word2[index]);
    if (diffIndex === -1) return word1.length - word2.length;
    return (
      minsikLanguageOrderMap[word1[diffIndex]] -
      minsikLanguageOrderMap[word2[diffIndex]]
    );
  });

  splittedWords.forEach((splittedWord) => {
    console.log(splittedWord.join(""));
  });
};

solution(words);
