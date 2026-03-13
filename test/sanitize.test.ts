import { strict as assert } from 'node:assert';
import {
  sanitizeName,
  sanitizeNumeric,
  sanitizeStreet,
  sanitizeHouseNumber,
} from '../src/utils/sanitize.ts';

// sanitizeName ────────────────────────────────────────────────────────────

describe('sanitizeName', () => {
  it('passes through a plain ASCII name', () => {
    assert.equal(sanitizeName('Max'), 'Max');
  });

  it('passes through a name with a hyphen', () => {
    assert.equal(sanitizeName('Anna-Lena'), 'Anna-Lena');
  });

  it('preserves capital Ö — names like Ömer are valid', () => {
    assert.equal(sanitizeName('Ömer'), 'Ömer');
  });

  it('preserves capital Ü — names like Ümit are valid', () => {
    assert.equal(sanitizeName('Ümit'), 'Ümit');
  });

  it('passes through lowercase umlauts and spaces', () => {
    assert.equal(sanitizeName('Jürgen Müller'), 'Jürgen Müller');
  });

  it('strips digits from a name', () => {
    assert.equal(sanitizeName('Max123'), 'Max');
  });

  it('strips angle brackets from an XSS attempt (letters remain)', () => {
    assert.equal(sanitizeName('<script>alert(1)</script>'), 'scriptalertscript');
  });

  it('strips @ and ! but preserves letters and space', () => {
    assert.equal(sanitizeName('Max! @Müller'), 'Max Müller');
  });

  it('returns an empty string for empty input', () => {
    assert.equal(sanitizeName(''), '');
  });
});

// sanitizeNumeric ─────────────────────────────────────────────────────────

describe('sanitizeNumeric', () => {
  it('passes through a 5-digit string unchanged', () => {
    assert.equal(sanitizeNumeric('10115'), '10115');
  });

  it('strips letters from a mixed string', () => {
    assert.equal(sanitizeNumeric('10abc'), '10');
  });

  it('strips spaces and punctuation', () => {
    assert.equal(sanitizeNumeric('1 0. 1-1 5'), '10115');
  });

  it('returns empty string for all-letter input', () => {
    assert.equal(sanitizeNumeric('abcde'), '');
  });

  it('returns empty string for empty input', () => {
    assert.equal(sanitizeNumeric(''), '');
  });

  it('does not truncate — a 6-digit string stays 6 digits', () => {
    assert.equal(sanitizeNumeric('101150'), '101150');
  });
});

// sanitizeStreet ──────────────────────────────────────────────────────────

describe('sanitizeStreet', () => {
  it('passes through a normal street name with ß', () => {
    assert.equal(sanitizeStreet('Musterstraße'), 'Musterstraße');
  });

  it('preserves capital Ö in a street name', () => {
    assert.equal(sanitizeStreet('Öderberger Str.'), 'Öderberger Str.');
  });

  it('passes through hyphens and dots', () => {
    assert.equal(sanitizeStreet('Karl-Marx-Str.'), 'Karl-Marx-Str.');
  });

  it('strips digits — numbers belong in the house-number field', () => {
    assert.equal(sanitizeStreet('Musterstraße 5'), 'Musterstraße ');
  });

  it('strips a <script> tag but keeps text content', () => {
    assert.equal(
      sanitizeStreet('<script>xss</script>Hauptstraße'),
      'xssHauptstraße',
    );
  });

  it('strips an <img onerror> XSS injection attempt', () => {
    assert.equal(
      sanitizeStreet('<img onerror="alert(1)">Bahnhofstr.'),
      'Bahnhofstr.',
    );
  });

  it('strips @ and ! from street input', () => {
    assert.equal(sanitizeStreet('Haupt@straße!'), 'Hauptstraße');
  });

  it('returns empty string for empty input', () => {
    assert.equal(sanitizeStreet(''), '');
  });
});

// sanitizeHouseNumber ─────────────────────────────────────────────────────

describe('sanitizeHouseNumber', () => {
  it('passes through a plain number', () => {
    assert.equal(sanitizeHouseNumber('12'), '12');
  });

  it('passes through a number with a letter suffix', () => {
    assert.equal(sanitizeHouseNumber('12a'), '12a');
  });

  it('passes through a hyphenated range', () => {
    assert.equal(sanitizeHouseNumber('5-7'), '5-7');
  });

  it('passes through a slash format', () => {
    assert.equal(sanitizeHouseNumber('3/4'), '3/4');
  });

  it('strips spaces and special characters', () => {
    assert.equal(sanitizeHouseNumber('12 a!'), '12a');
  });

  it('returns empty string for empty input', () => {
    assert.equal(sanitizeHouseNumber(''), '');
  });

  it('strips angle brackets but keeps letters, digits, and forward-slash', () => {
    assert.equal(sanitizeHouseNumber('<b>12</b>'), 'b12/b');
  });
});
