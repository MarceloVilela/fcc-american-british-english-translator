import { americanOnly } from './american-only.js';
import { britishOnly } from './british-only.js';
import { americanToBritishSpelling } from './american-to-british-spelling.js';
import { americanToBritishTitles } from './american-to-british-titles.js';

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/

var findReplace = (source, find, replace, capitalize = false) => {
  var output = source;

  var regexIncludes = new RegExp(`( )(${find})(\\.| )`, 'i');
  var matchIncludes = source.match(regexIncludes);

  var regexStartsWith = new RegExp(`^(${find})(\\.| )`, 'i');
  var matchStartsWith = source.match(regexStartsWith);

  if (matchIncludes || matchStartsWith) {
    var match = matchIncludes
      ? matchIncludes[2]
      : matchStartsWith[1];

    var replaceFormatted = !capitalize
      ? replace
      : replace.charAt(0).toUpperCase() + replace.slice(1) + ' ';

    output = source.replace(match, replaceFormatted);
  }

  return output;
}

var translate = (input, localeSelect) => {

  var textOutput = input;

  let britishToamericanSpelling = {};
  Object.keys(americanToBritishSpelling).forEach(word => britishToamericanSpelling[americanToBritishSpelling[word]] = word);

  let britishToamericanTitles = {};
  Object.keys(americanToBritishTitles).forEach(word => britishToamericanTitles[americanToBritishTitles[word]] = word);

  const spelling = localeSelect === 'american-to-british' ? americanToBritishSpelling : britishToamericanSpelling;
  const only = localeSelect === 'american-to-british' ? americanOnly : britishOnly;
  const titles = localeSelect === 'american-to-british' ? americanToBritishTitles : britishToamericanTitles;

  Object.keys(spelling).forEach(word => textOutput = findReplace(
    textOutput,
    word,
    spelling[word],
  ));

  Object.keys(only).forEach((word, key) => {
    if (Object.keys(only).lastIndexOf(word) === key) {

      textOutput = findReplace(
        textOutput,
        word,
        only[word]
      )
    }
  });

  Object.keys(titles).reverse().forEach(word => {

    textOutput = findReplace(
      textOutput,
      word,
      titles[word],
      true
    ).replace('  ', ' ')
  });

  var regexHours = /\d\d:\d\d/g;
  var match = textOutput.match(regexHours);
  if (match) {
    match.map(find => {
      textOutput = textOutput.replace(':', '.');
    })
  }


  return textOutput;
}

try {

  document.querySelector('#translate-btn').addEventListener('click', () => {
    var inputValue = document.querySelector('#text-input').value;

    var inputTranslated = translate(inputValue, document.querySelector('#locale-select').value);

    var outputContent = inputValue !== inputTranslated
      ? inputTranslated
      : 'Everything looks good to me!';

    outputContent = !(inputValue.match(/^\s{1,}$/) || inputValue === '')
      ? outputContent
      : 'Error: No text to translate.';

    document.querySelector('#translated-sentence').textContent = outputContent;
  });

  document.querySelector('#clear-btn').addEventListener('click', () => {
    document.querySelector('#text-input').value = '';

    document.querySelector('#translated-sentence').textContent = '';
  });

  module.exports = {

    translate

  }
} catch (e) { }
