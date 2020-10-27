#include <iostream>

#include "midi-tools.h"

int main() {
  std::cout << "The C minor scale: ";
  const Scale scale = getScale("A", 4, "aeolian");
  for (const int& value : scale) {
    std::cout << value << ' ';
  }
  std::cout << "\nThe C minor chord: ";
  const Chord chord = getChord("A", 4, "aeolian", 3);
  for (const int& value : chord) {
    std::cout << value << ' ';
  }
}
