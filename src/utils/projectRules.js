const MAX_SCRIPT_LENGTH = 5000;
function validateScript(value) {
  const text = String(value ?? '').trim();
  if (!text) return { valid: false, reason: 'empty' };
  if (text.length > MAX_SCRIPT_LENGTH) return { valid: false, reason: 'too_long' };
  return { valid: true, value: text };
}
function getNextStep(step) {
  const steps = ['welcome', 'script', 'style', 'preview'];
  const index = steps.indexOf(step);
  return index < 0 || index === steps.length - 1 ? step : steps[index + 1];
}
module.exports = { MAX_SCRIPT_LENGTH, validateScript, getNextStep };
