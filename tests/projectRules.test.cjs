const test = require('node:test');
const assert = require('node:assert/strict');
const { MAX_SCRIPT_LENGTH, validateScript, getNextStep } = require('../src/utils/projectRules.js');

test('rejects empty or whitespace-only scripts', () => {
  assert.deepEqual(validateScript('   '), { valid: false, reason: 'empty' });
});
test('trims valid script text', () => {
  assert.deepEqual(validateScript('  Hello world  '), { valid: true, value: 'Hello world' });
});
test('rejects scripts beyond the supported limit', () => {
  assert.deepEqual(validateScript('a'.repeat(MAX_SCRIPT_LENGTH + 1)), { valid: false, reason: 'too_long' });
});
test('moves through the expected project flow', () => {
  assert.equal(getNextStep('welcome'), 'script');
  assert.equal(getNextStep('script'), 'style');
  assert.equal(getNextStep('style'), 'preview');
  assert.equal(getNextStep('preview'), 'preview');
});
test('keeps unknown steps unchanged', () => {
  assert.equal(getNextStep('unknown'), 'unknown');
});
