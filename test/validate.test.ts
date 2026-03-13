import { strict as assert } from 'node:assert';
import {
  validateZipCode,
  validateDonationForm,
} from '../src/utils/validate.ts';
import type { DonationFormInput } from '../src/utils/validate.ts';

// Shared fixtures ─────────────────────────────────────────────────────────

const validOfficeForm: DonationFormInput = {
  firstName: 'Max',
  lastName: 'Mustermann',
  clothingType: 'Jacken & Mäntel',
  crisisArea: 'Ukraine',
  handover: 'office',
  street: '',
  houseNumber: '',
  zipCode: '',
  country: 'Deutschland',
};

const validPickupForm: DonationFormInput = {
  ...validOfficeForm,
  handover: 'pickup',
  street: 'Musterstraße',
  houseNumber: '12a',
  zipCode: '10115',
  country: 'Deutschland',
};

// validateZipCode ─────────────────────────────────────────────────────────

describe('validateZipCode', () => {
  it('accepts 10115 — a valid Berlin zip', () => {
    assert.equal(validateZipCode('10115'), true);
  });

  it('accepts 10999 — upper end of Berlin zip range', () => {
    assert.equal(validateZipCode('10999'), true);
  });

  it('accepts 10000 — lower bound', () => {
    assert.equal(validateZipCode('10000'), true);
  });

  it('rejects 12345 — does not start with 10', () => {
    assert.equal(validateZipCode('12345'), false);
  });

  it('rejects 9999 — too short (4 digits)', () => {
    assert.equal(validateZipCode('9999'), false);
  });

  it('rejects 101150 — too long (6 digits)', () => {
    assert.equal(validateZipCode('101150'), false);
  });

  it('rejects empty string', () => {
    assert.equal(validateZipCode(''), false);
  });

  it('rejects 10abc — non-digit characters', () => {
    assert.equal(validateZipCode('10abc'), false);
  });
});

// validateDonationForm ────────────────────────────────────────────────────

describe('validateDonationForm', () => {
  it('returns no errors for a valid office form', () => {
    const errors = validateDonationForm(validOfficeForm, false);
    assert.deepEqual(errors, {});
  });

  it('returns no errors for a valid pickup form with a Berlin zip', () => {
    const errors = validateDonationForm(validPickupForm, true);
    assert.deepEqual(errors, {});
  });

  it('returns errors for every required field when the form is all-empty', () => {
    const empty: DonationFormInput = {
      firstName: '',
      lastName: '',
      clothingType: '',
      crisisArea: '',
      handover: '',
      street: '',
      houseNumber: '',
      zipCode: '',
      country: '',
    };
    const errors = validateDonationForm(empty, false);
    assert.ok(errors.firstName, 'expected firstName error');
    assert.ok(errors.lastName, 'expected lastName error');
    assert.ok(errors.clothingType, 'expected clothingType error');
    assert.ok(errors.crisisArea, 'expected crisisArea error');
    assert.ok(errors.handover, 'expected handover error');
  });

  it('returns address errors when pickup fields are empty', () => {
    const form: DonationFormInput = {
      ...validPickupForm,
      street: '',
      houseNumber: '',
      zipCode: '',
    };
    const errors = validateDonationForm(form, true);
    assert.ok(errors.street, 'expected street error');
    assert.ok(errors.houseNumber, 'expected houseNumber error');
    assert.ok(errors.zipCode, 'expected zipCode error');
  });

  it('returns a zip error for a non-Berlin zip in pickup mode', () => {
    const form: DonationFormInput = { ...validPickupForm, zipCode: '20095' };
    const errors = validateDonationForm(form, true);
    assert.ok(errors.zipCode, 'expected zip error for Hamburg code 20095');
  });

  it('does not return address errors in office mode even if address is empty', () => {
    const errors = validateDonationForm(validOfficeForm, false);
    assert.equal(errors.street, undefined);
    assert.equal(errors.houseNumber, undefined);
    assert.equal(errors.zipCode, undefined);
  });

  it('returns firstName error for a whitespace-only first name', () => {
    const form: DonationFormInput = { ...validOfficeForm, firstName: '   ' };
    const errors = validateDonationForm(form, false);
    assert.ok(errors.firstName, 'expected firstName error for whitespace-only value');
  });

  it('does not set a country error — country is auto-set and never validated', () => {
    const form: DonationFormInput = { ...validPickupForm, country: '' };
    const errors = validateDonationForm(form, true);
    assert.equal(errors.country, undefined);
  });
});
