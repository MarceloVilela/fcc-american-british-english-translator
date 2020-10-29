/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require('chai');
const assert = chai.assert;

let Translator;

suite('Functional Tests', () => {
  suiteSetup(() => {
    // DOM already mocked -- load translator then run tests
    Translator = require('../public/translator.js');
  });

  suite('Function ____()', () => {
    /* 
      The translated sentence is appended to the `translated-sentence` `div`
      and the translated words or terms are wrapped in 
      `<span class="highlight">...</span>` tags when the "Translate" button is pressed.
    */
    test("Translation appended to the `translated-sentence` `div`", done => {
      // american-to-british
      const inputAmericanToBritish = 'Mangoes are my favorite fruit.';
      const outputAmericanToBritish = 'Mangoes are my favourite fruit.';

      document.querySelector('#locale-select').value = 'american-to-british'
      document.querySelector('#text-input').value = inputAmericanToBritish;
      document.querySelector('#translate-btn').click();

      assert.equal(
        document.querySelector('#translated-sentence').textContent,
        outputAmericanToBritish
      );

      // british-to-american
      const inputBritishToAmerican = 'We watched the footie match for a while.';
      const outputBritishToAmerican = 'We watched the soccer match for a while.';

      document.querySelector('#locale-select').value = 'british-to-american'
      document.querySelector('#text-input').value = inputBritishToAmerican;
      document.querySelector('#translate-btn').click();

      assert.equal(
        document.querySelector('#translated-sentence').textContent,
        outputBritishToAmerican
      );
      done();
    });

    /* 
      If there are no words or terms that need to be translated,
      the message 'Everything looks good to me!' is appended to the
      `translated-sentence` `div` when the "Translate" button is pressed.
    */
    test("'Everything looks good to me!' message appended to the `translated-sentence` `div`", done => {
      const input = 'ok.';
      const output = 'Everything looks good to me!';

      document.querySelector('#text-input').value = input;
      document.querySelector('#translate-btn').click();

      assert.equal(
        document.querySelector('#translated-sentence').textContent,
        output
      );

      done();
    });

    /* 
      If the text area is empty when the "Translation" button is
      pressed, append the message 'Error: No text to translate.' to 
      the `error-msg` `div`.
    */
    test("'Error: No text to translate.' message appended to the `translated-sentence` `div`", done => {
      // empty field
      const inputBlank = '';
      const output = 'Error: No text to translate.';

      document.querySelector('#text-input').value = inputBlank;
      document.querySelector('#translate-btn').click();

      assert.equal(
        document.querySelector('#translated-sentence').textContent,
        output
      );

      // filled whit space
      const inputOnlySpace = '   ';
      
      document.querySelector('#text-input').value = inputOnlySpace;
      document.querySelector('#translate-btn').click();

      assert.equal(
        document.querySelector('#translated-sentence').textContent,
        output
      );

      done();
    });

  });

  suite('Function ____()', () => {
    /* 
      The text area and both the `translated-sentence` and `error-msg`
      `divs` are cleared when the "Clear" button is pressed.
    */
    test("Text area, `translated-sentence`, and `error-msg` are cleared", done => {
      // filled
      const input = 'ok.';
      const output = 'Everything looks good to me!';

      document.querySelector('#text-input').value = input;
      document.querySelector('#translate-btn').click();

      assert.equal(
        document.querySelector('#translated-sentence').textContent,
        output
      );

      // cleaned
      const inputCleared = '';
      const outputCleared = '';

      document.querySelector('#clear-btn').click();

      assert.equal(
        document.querySelector('#text-input').value,
        inputCleared
      );

      assert.equal(
        document.querySelector('#translated-sentence').textContent,
        outputCleared
      );

      done();
    });

  });

});
