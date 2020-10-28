package miditools

/** Note: Octave designations are in scientific pitch notation. The MIDI
 * standard and equal temperament apply throughout. For example, C4 denotes
 * middle C, which is MIDI note 60 at 261.63 hertz. Applications like Ableton
 * may refer to the same note as C3 instead of C4.
 */

/** An array of the 12 note names from C through B (using uppercase letters and
 * sharps, e.g. "C#") */
var noteNames = [12]string{"C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"}

/** Given a `noteName`, e.g. "C#", return the lowest available MIDI note, or -1
 * if `noteName` is invalid. */
func GetLowestMidiNote(noteName string) int {
	for i := 0; i <= len(noteNames); i++ {
		if noteNames[i] == noteName {
			return i
		}
	}
	return -1
}

/** Given a `noteName`, e.g. "C#", and an octave, e.g. `4`, return the MIDI note
 * number. Defaults to the middle octave (4). */
func GetMidiNote(noteName string, octave int) int {
	note := GetLowestMidiNote(noteName) + (octave+1)*12

	if note < 0 {
		return 0 // C-1
	} else if note > 127 {
		return 127 // G9
	} else {
		return note
	}
}

/** Array of mode names */
var modeNames = [9]string{
	"ionian",
	"dorian",
	"phrygian",
	"lydian",
	"mixolydian",
	"aeolian",
	"locrian",
	"harmonic",
	"melodic",
}

/** A Scale is defined as an array of 7 integers */
type Scale = [7]int

/** Map of mode names to scale, represented as an array of 7 semitone
 * differences from the root note of the scale */
var modes = map[string]Scale{
	"ionian":     {0, 2, 4, 5, 7, 9, 11}, // W–W–H–W–W–W–H
	"dorian":     {0, 2, 3, 5, 7, 9, 10}, // W–H–W–W–W–H–W
	"phrygian":   {0, 1, 3, 5, 7, 8, 10}, // H–W–W–W–H–W–W
	"lydian":     {0, 2, 4, 6, 7, 9, 11}, // W–W–W–H–W–W–H
	"mixolydian": {0, 2, 4, 5, 7, 9, 10}, // W–W–H–W–W–H–W
	"aeolian":    {0, 2, 3, 5, 7, 8, 10}, // W–H–W–W–H–W–W
	"locrian":    {0, 1, 3, 5, 6, 8, 10}, // H–W–W–H–W–W–W
	"harmonic":   {0, 2, 3, 5, 7, 8, 11}, // W–H–W–W–H–Aug2nd–H
	"melodic":    {0, 2, 3, 5, 7, 9, 11}, // W–H–W–W–W–W–H
}

/** Given a root note and mode, return a scale, represented as an array of 7
 * MIDI note numbers */
func GetScale(scaleRootNoteName string, octave int, mode string) Scale {
	rootNoteNumber := GetMidiNote(scaleRootNoteName, octave)
	scale := modes[mode]
	for i := 0; i < len(scale); i++ {
		scale[i] = scale[i] + rootNoteNumber
	}
	return scale
}

/** A Chord is a slice of integers */
type Chord = []int

/** Map of chord names to chords (represented as a vector of steps in a scale)
 */
var chordShapes = map[string]Chord{
	"triad": {0, 2, 4},
}

/** Given a root note, mode, and number of notes, return a chord, represented as
 * an array of MIDI note numbers */
func GetChord(scaleRootNoteName string, octave int, mode string, numberOfNotes int) Chord {
	var scale = GetScale(scaleRootNoteName, octave, mode)
	shape := chordShapes["triad"]
	var indexes Chord
	var chord Chord

	for step := 0; step < numberOfNotes; step++ {
		note := shape[step%len(shape)] + 7*int(step/len(shape))
		indexes = append(indexes, note)
	}

	for i := 0; i < len(indexes); i++ {
		note := indexes[i]
		octaveOffset := int(note / 7)
		chord = append(chord, scale[((note%7)+7)%7]+12*octaveOffset)
	}

	return chord
}
