/** Note: Octave designations are in scientific pitch notation. The MIDI
 * standard and equal temperament apply throughout. For example, c4 denotes
 * middle C, which is MIDI note 60 at 261.63 hertz. Applications like Ableton
 * may refer to the same note as c3 instead of c4.
 */

/** An array of the 12 note names from C through B (using uppercase letters and
 * sharps, e.g. "C#") */
export const noteNames = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
];

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

/** Given a `noteName`, e.g. "C#", return the lowest available MIDI note, or -1
 * if `noteName` is invalid. */
function getLowestMidiNote(noteName) {
  return lowestNotes[noteName] ?? -1;
}

/** Given a `noteName`, e.g. "C#", and an octave, e.g. `4`, return the MIDI note
 * number. Defaults to the middle octave (4). */
export function getMidiNote(noteName = 'C', octave = 4) {
  const LOWEST_VALID_MIDI_NOTE = 0; // C-1
  const HIGHEST_VALID_MIDI_NOTE = 127; // G9

  return Math.min(
    Math.max(
      getLowestMidiNote(noteName) + (octave + 1) * 12,
      LOWEST_VALID_MIDI_NOTE,
    ),
    HIGHEST_VALID_MIDI_NOTE,
  );
}

/** Array of mode names */
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

/** Map of mode names to scale, represented as an array of 7 semitone
 * differences from the root note of the scale */
export const modes = {
  //// Diatonic heptatonic scales ////
  // Major (Ionian)
  ionian: [0, 2, 4, 5, 7, 9, 11], // W–W–H–W–W–W–H
  dorian: [0, 2, 3, 5, 7, 9, 10], // W–H–W–W–W–H–W
  phrygian: [0, 1, 3, 5, 7, 8, 10], // H–W–W–W–H–W–W
  lydian: [0, 2, 4, 6, 7, 9, 11], // W–W–W–H–W–W–H
  mixolydian: [0, 2, 4, 5, 7, 9, 10], // W–W–H–W–W–H–W
  // Natural minor (Aeolian)
  aeolian: [0, 2, 3, 5, 7, 8, 10], // W–H–W–W–H–W–W
  locrian: [0, 1, 3, 5, 6, 8, 10], // H–W–W–H–W–W–W

  //// Non-diatonic heptatonic cales ////
  // Harmonic minor (Aeolian ♯7)
  harmonic: [0, 2, 3, 5, 7, 8, 11], // W–H–W–W–H–Aug2nd–H
  // Ascending melodic minor aka Jazz minor (Ionian ♭3)
  melodic: [0, 2, 3, 5, 7, 9, 11], // W–H–W–W–W–W–H
};

/** Given a root note and mode, return a scale, represented as an array of 7
 * MIDI note numbers */
export function getScale(scaleRootNoteName = 'C', octave = 4, mode = 'ionian') {
  const rootNoteNumber = getMidiNote(scaleRootNoteName, octave);

  return modes[mode].map((interval) => rootNoteNumber + interval);
}

/** Given a root note, mode, and number of notes, return a chord, represented as
 * an array of MIDI note numbers */
export function getChord(
  scaleRootNoteName = 'C',
  octave = 4,
  mode = 'ionian',
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
