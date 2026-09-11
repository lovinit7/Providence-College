/**
 * bmi.js — Core BMI calculation, conversion, and classification
 */

const UNITS = {
  METRIC:   'metric',
  IMPERIAL: 'imperial',
};

/**
 * Convert imperial (feet, inches, pounds) to metric (cm, kg)
 */
export function imperialToMetric({ feet, inches, pounds }) {
  const totalInches = (parseFloat(feet) || 0) * 12 + (parseFloat(inches) || 0);
  const cm = totalInches * 2.54;
  const kg = parseFloat(pounds) * 0.453592;
  return { cm, kg };
}

/**
 * Calculate BMI
 * @param {number} weightKg  Weight in kilograms
 * @param {number} heightCm  Height in centimetres
 * @returns {number}         BMI value (unrounded)
 */
export function calculateBMI(weightKg, heightCm) {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

/**
 * Classify a BMI value into a category
 * @param {number} bmi
 * @returns {{ key: string, label: string }}
 */
export function classifyBMI(bmi) {
  if (bmi < 18.5) return { key: 'underweight', label: 'Underweight' };
  if (bmi < 25)   return { key: 'normal',      label: 'Normal / Healthy' };
  if (bmi < 30)   return { key: 'overweight',  label: 'Overweight' };
  return              { key: 'obese',       label: 'Obesity' };
}

/**
 * Validate and parse metric form inputs
 * Returns { valid, errors, weightKg, heightCm } 
 */
export function parseMetricInputs({ height, weight }) {
  const errors = {};
  const h = parseFloat(height);
  const w = parseFloat(weight);

  if (!height || isNaN(h) || h <= 0) {
    errors.height = 'Height cannot be 0 cm. Physics has declined to participate.';
  } else if (h < 50) {
    errors.height = 'That height seems unlikely. Are you a hobbit?';
  } else if (h > 272) {
    errors.height = 'The tallest human ever was 272 cm. Bold of you.';
  }

  if (!weight || isNaN(w) || w <= 0) {
    errors.weight = 'Weight required. Zero is not a valid lifestyle.';
  } else if (w < 10) {
    errors.weight = 'That weight is… concerning. Are you sure?';
  } else if (w > 500) {
    errors.weight = 'The calculator is flattered, but that seems unlikely.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    weightKg: w,
    heightCm: h,
  };
}

/**
 * Validate and parse imperial form inputs
 * Returns { valid, errors, weightKg, heightCm }
 */
export function parseImperialInputs({ feet, inches, pounds }) {
  const errors = {};
  const ft  = parseFloat(feet)   || 0;
  const ins = parseFloat(inches) || 0;
  const lbs = parseFloat(pounds);

  const totalInches = ft * 12 + ins;

  if ((!feet && !inches) || totalInches <= 0) {
    errors.height = 'Height required. Gravity is waiting.';
  } else if (totalInches < 20) {
    errors.height = 'Too short to compute. Literally.';
  } else if (totalInches > 107) {
    errors.height = 'That height broke the chart. And possibly physics.';
  }

  if (!pounds || isNaN(lbs) || lbs <= 0) {
    errors.weight = 'Weight required. Zero is not a valid lifestyle.';
  } else if (lbs < 22) {
    errors.weight = 'That weight is… concerning. Are you sure?';
  } else if (lbs > 1100) {
    errors.weight = 'The calculator is flattered, but that seems unlikely.';
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors, weightKg: 0, heightCm: 0 };
  }

  const { cm, kg } = imperialToMetric({ feet, inches, pounds });
  return {
    valid: true,
    errors: {},
    weightKg: kg,
    heightCm: cm,
  };
}

/**
 * Validate age
 */
export function validateAge(age) {
  const a = parseInt(age, 10);
  if (!age || isNaN(a) || a <= 0) return 'Age required. The universe needs to know.';
  if (a < 18)  return 'This calculator is for adults only. Come back in a few years.';
  if (a > 120) return 'Impressive if true. Please see a doctor about that.';
  return null;
}
