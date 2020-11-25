import { getMidiNote, getScale, getChord } from './index.js';

const scale = getScale("A", "aeolian");
console.log('The A minor scale:', scale.join(' '));

const root = getMidiNote('A', 4);
let chord = getChord(root, 'A', "aeolian");
console.log('The A minor triad:', chord.join(' '));
chord = getChord(root, 'A', "aeolian", 'ninth');
console.log('The A minor ninth chord:', chord.join(' '));
