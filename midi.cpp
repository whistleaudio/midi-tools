#include "midi-tools.h"
#include <iostream>

int main() {
  const Scale scale = getScale("A", 4, "aeolian");
  for (const int &value : scale) {
    std::cout << value << ' ';
  }
  std::cout << "\n";
  const Chord chord = getChord("A", 4, "aeolian", 3);
  for (const int &value : chord) {
    std::cout << value << ' ';
  }
}
