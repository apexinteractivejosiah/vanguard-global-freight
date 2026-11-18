import test from 'node:test';
import assert from 'node:assert/strict';
import { getTranslations, SUPPORTED_LANGUAGES } from './i18n';

test('all supported languages return complete non-empty translations', () => {
  assert.ok(SUPPORTED_LANGUAGES.length >= 6);
  const enKeys = Object.keys(getTranslations('en'));
  for (const lang of SUPPORTED_LANGUAGES) {
    const bundle = getTranslations(lang.code);
    for (const key of enKeys) {
      const val = (bundle as unknown as Record<string, string>)[key];
      assert.ok(typeof val === 'string' && val.trim().length > 0, `Missing ${lang.code}.${key}`);
    }
  }
});
