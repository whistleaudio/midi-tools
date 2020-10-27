#ifndef MIDI_TOOLS_H
#define MIDI_TOOLS_H

#include <array>
#include <cstdint>
#include <map>
#include <string>

/** Note: Octave designations are in scientific pitch notation. The MIDI
 * standard and equal temperament apply throughout. For example, C4 denotes
 * middle C, which is MIDI note 60 at 261.63 hertz. Applications like Ableton
 * may refer to the same note as C3 instead of C4.
 */

/** An array of the 12 note names from C through B (using uppercase letters and
 * sharps, e.g. "C#") */
const std::array<std::string, 12> noteNames = {"C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"};

/** Given a `noteName`, e.g. "C#", return the lowest available MIDI note, or -1
 * if `noteName` is invalid. */
int getLowestMidiNote(std::string noteName)
{
  for (auto i = 0; i <= noteNames.size(); i++)
  {
    if (noteNames[i] == noteName)
      return i;
  }
  return -1;
}

/** Given a `noteName`, e.g. "C#", and an octave, e.g. `4`, return the MIDI note
 * number. Defaults to the middle octave (4). */
int getMidiNote(std::string noteName = "C", int octave = 4)
{
  int note = getLowestMidiNote(noteName) + (octave + 1) * 12;

  if (note < 0)
  {
    return 0; // C-1
  }
  else if (note > 127)
  {
    return 127; // G9
  }
  else
  {
    return note;
  }
}

/** Array of mode names */
const std::string modeNames[9] = {
    "ionian",
    "dorian",
    "phrygian",
    "lydian",
    "mixolydian",
    "aeolian",
    "locrian",
    "harmonic",
    "melodic",
};

/** A Scale is defined as an array of 7 unsigned integers */
typedef std::array<int, 7> Scale;

/** Map of mode names to scale, represented as an array of 7 semitone
 * differences from the root note of the scale */
const std::map<std::string, Scale> modes = {
    //// Diatonic heptatonic scales ////
    // Major (Ionian): "ionian" or "major"
    {"ionian", {0, 2, 4, 5, 7, 9, 11}},     // W–W–H–W–W–W–H
    {"dorian", {0, 2, 3, 5, 7, 9, 10}},     // W–H–W–W–W–H–W
    {"phrygian", {0, 1, 3, 5, 7, 8, 10}},   // H–W–W–W–H–W–W
    {"lydian", {0, 2, 4, 6, 7, 9, 11}},     // W–W–W–H–W–W–H
    {"mixolydian", {0, 2, 4, 5, 7, 9, 10}}, // W–W–H–W–W–H–W
    // Natural minor (Aeolian): "aeolian" or "minor"
    {"aeolian", {0, 2, 3, 5, 7, 8, 10}}, // W–H–W–W–H–W–W
    {"locrian", {0, 1, 3, 5, 6, 8, 10}}, // H–W–W–H–W–W–W
    //// Non-diatonic heptatonic cales ////
    // Harmonic minor (Aeolian ♯7): "harmonic"
    {"harmonic", {0, 2, 3, 5, 7, 8, 11}}, // W–H–W–W–H–Aug2nd–H
    // Ascending melodic minor aka Jazz minor (Ionian ♭3): "melodic", "jazz"
    {"melodic", {0, 2, 3, 5, 7, 9, 11}}, // W–H–W–W–W–W–H
};

/** Given a root note and mode, return a scale, represented as an array of 7
 * MIDI note numbers */
Scale getScale(std::string scaleRootNoteName = "C", int octave = 4, std::string mode = "ionian")
{
  const int rootNoteNumber = getMidiNote(scaleRootNoteName, octave);
  Scale scale = modes.find(mode)->second;
  for (auto i = 0; i <= mode.size(); i++)
  {
    scale[i] = scale[i] + rootNoteNumber;
  }
  return scale;
}

#endif // MIDI_TOOLS_H
