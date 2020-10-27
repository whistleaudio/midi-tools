import { getScale, getChord } from './index.js';

const scale = getScale("A", 4, "aeolian");
console.log('The A minor scale:', scale.join(' '));

const chord = getChord("A", 4, "aeolian", 3);
console.log('The A minor chord:', chord.join(' '));
