/** Note: Octave designations are in scientific pitch notation. The MIDI
 * standard and equal temperament apply throughout. For example, c4 denotes
 * middle C, which is MIDI note 60 at 261.63 hertz. Applications like Ableton
 * may refer to the same note as c3 instead of c4.
 */

/** An array of the 12 note names from c through b (using lowercase letters and
 * sharps, e.g. "c#") */
export const noteNames = [
  'c',
  'c#',
  'd',
  'd#',
  'e',
  'f',
  'f#',
  'g',
  'g#',
  'a',
  'a#',
  'b',
];

// const lowestNotes = {
//   c: 0,
//   'c#': 1,
//   d: 2,
//   'd#': 3,
//   e: 4,
//   f: 5,
//   'f#': 6,
//   g: 7,
//   'g#': 8,
//   a: 9,
//   'a#': 10,
//   b: 11,
// };

/** An object with note names as keys and the lowest available MIDI note numbers
 * as values
 */
export const lowestNotes = noteNames.reduce(
  (accumulator, currentValue, currentIndex) => {
    accumulator[currentValue] = currentIndex;
    return accumulator;
  },
  {},
);

/** Given a note name, e.g. "c#", return the lowest available MIDI note. */
function getLowestMidiNote(noteName) {
  return lowestNotes[noteName];
}

/** Given a `noteName`, e.g. "c#", and an octave, e.g. `4`, return the MIDI note
 *  number. Defaults to the middle octave (4).
 */
export function getMidiNote(noteName = 'c', octave = 4) {
  const LOWEST_VALID_MIDI_NOTE = 0; // c-1
  const HIGHEST_VALID_MIDI_NOTE = 127; // g9

  return Math.min(
    Math.max(
      getLowestMidiNote(noteName) + (octave + 1) * 12,
      LOWEST_VALID_MIDI_NOTE,
    ),
    HIGHEST_VALID_MIDI_NOTE,
  );
}

export const modeNames = [
  'ionian',
  'dorian',
  'phrygian',
  'lydian',
  'mixolydian',
  'aeolian',
  'locrian',
  'harmonic',
  'melodic',
];

const modes = {
  //// Diatonic heptatonic scales ////
  // Major (Ionian): "ionian" or "major"
  ionian: [0, 2, 4, 5, 7, 9, 11], // W–W–H–W–W–W–H
  dorian: [0, 2, 3, 5, 7, 9, 10], // W–H–W–W–W–H–W
  phrygian: [0, 1, 3, 5, 7, 8, 10], // H–W–W–W–H–W–W
  lydian: [0, 2, 4, 6, 7, 9, 11], // W–W–W–H–W–W–H
  mixolydian: [0, 2, 4, 5, 7, 9, 10], // W–W–H–W–W–H–W
  // Natural minor (Aeolian): "aeolian" or "minor"
  aeolian: [0, 2, 3, 5, 7, 8, 10], // W–H–W–W–H–W–W
  locrian: [0, 1, 3, 5, 6, 8, 10], // H–W–W–H–W–W–W

  //// Non-diatonic heptatonic cales ////
  // Harmonic minor (Aeolian ♯7): "harmonic"
  harmonic: [0, 2, 3, 5, 7, 8, 11], // W–H–W–W–H–Aug2nd–H
  // Ascending melodic minor aka Jazz minor (Ionian ♭3): "melodic", "jazz"
  melodic: [0, 2, 3, 5, 7, 9, 11], // W–H–W–W–W–W–H
};
modes.major = modes.ionian; // Alias "major" to "ionian"
modes.minor = modes.aeolian; // Alias "minor" to "aeolian"
modes.jazz = modes.melodic; // Alias "melodic" to "jazz"
export { modes };

export function getScale(scaleRootNoteName = 'c', octave = 4, mode = 'major') {
  const rootNoteNumber = getMidiNote(scaleRootNoteName, octave);

  return modes[mode].map((interval) => rootNoteNumber + interval);
}

export function getChord(
  scaleRootNoteName = 'c',
  octave = 4,
  mode = 'major',
  numberOfNotes = 3,
) {
  const scale = getScale(scaleRootNoteName, octave, mode);
  const shapes = { triad: [0, 2, 4] };
  const shape = shapes.triad;
  const indexes = [];

  for (let step = 0; step < numberOfNotes; step++) {
    indexes.push(
      shape[step % shape.length] + 7 * Math.floor(step / shape.length),
    );
  }

  return indexes.map((note) => {
    const octaveOffset = Math.floor(note / 7);
    return scale[((note % 7) + 7) % 7] + 12 * octaveOffset;
  });
}

// TODO: Add types of arpeggios
function getArpeggioNotes() {}
