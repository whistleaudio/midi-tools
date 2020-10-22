#include <iostream>
#include "midi-tools.h"

int main()
{
  int note1 = getMidiNote("A", 4);
  std::cout << note1 << "\n";
  const Scale scale = getScale("A", 4, "aeolian");
  for (const int &value : scale)
  {
    std::cout << value << ' ';
  }
}
