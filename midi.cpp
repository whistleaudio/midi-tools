#include <iostream>
#include "midi-tools.h"

int main()
{
  int note = getMidiNote("A", 4);
  std::cout << note;
}
