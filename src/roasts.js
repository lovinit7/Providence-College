/**
 * roasts.js — Roast library and random selection engine
 */

const ROASTS = {
  underweight: [
    "Your BMI is asking where the rest of you went.",
    "The wind has filed a formal complaint about you.",
    "Your skeleton sent a strongly worded letter. It wants company.",
    "Gravity is barely trying with you. It's not even breaking a sweat.",
    "Your BMI looked at the chart and said: 'I'm not on here. Am I on here?'",
    "Physics called. It wants more mass to work with.",
    "The scale did a double-take. That's rare. Usually the scale is unimpressed.",
    "BMI report: Underweight. The report itself felt weird saying that out loud.",
    "You are defying the BMI chart. The chart is filing an appeal.",
    "Your result suggests you could be carried away by a moderately confident breeze.",
  ],
  normal: [
    "Okay. You escaped the allegations.",
    "Congratulations. Your spreadsheet of life is currently balanced.",
    "The BMI committee reviewed your file and chose peace.",
    "You're in the healthy range. Annoying, but well done.",
    "Normal. Boring, technically correct, entirely acceptable.",
    "The chart is satisfied. The chart does not give out trophies.",
    "Your BMI has no notes. It reviewed your file and left.",
    "Healthy range detected. You may continue existing.",
    "You have achieved the most average possible outcome. Well-averaged.",
    "BMI: Normal. You have bested the chart. The chart is fine with that.",
  ],
  overweight: [
    "Your BMI has entered the group chat and it has concerns.",
    "Your BMI said it wants to speak to the manager.",
    "The scale has seen things. It cannot unsee them.",
    "Your BMI is technically in the overweight range. It told me to tell you that.",
    "The chart has placed a flag on your file. The flag is yellow.",
    "Overweight. The BMI chart is not judging you. It is simply — observing.",
    "Your BMI has concerns. Your BMI has prepared a PowerPoint.",
    "The spreadsheet of life shows a budget deficit.",
    "Overweight confirmed. Your BMI has been forwarded to management.",
    "Your BMI walked in, looked around, and asked 'Is this the right place?'",
  ],
  obese: [
    "Your BMI didn't just cross the line. It brought luggage.",
    "Your BMI applied for citizenship in a different territory.",
    "The BMI chart looked at your number and called a meeting.",
    "Your BMI has crossed into bold, italic, and underlined territory.",
    "Obesity range. The chart printed your result in a larger font. Automatically.",
    "Your BMI has been issued a formal letter. It arrives by courier.",
    "The chart has created a new category. Just for this occasion.",
    "Your BMI walked in, removed its jacket, sat down, and asked for the Wi-Fi password.",
    "The scale needed a moment before displaying your result. A personal moment.",
    "Your BMI has made a reservation. It's staying a while.",
  ],
};

/** No-repeat shuffle bag per category */
const _bags = {};

function getBag(category) {
  if (!_bags[category] || _bags[category].length === 0) {
    // Refill and shuffle
    _bags[category] = [...ROASTS[category]];
    for (let i = _bags[category].length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [_bags[category][i], _bags[category][j]] = [_bags[category][j], _bags[category][i]];
    }
  }
  return _bags[category];
}

/**
 * Get a random roast for the given BMI category key
 * Uses a shuffle-bag system to avoid immediate repeats
 * @param {'underweight'|'normal'|'overweight'|'obese'} categoryKey
 * @returns {string}
 */
export function getRoast(categoryKey) {
  const bag = getBag(categoryKey);
  return bag.pop();
}
