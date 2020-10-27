# midi-tools

## JavaScript

`index.js` exports some basic functions for generating MIDI notes, chords, and arpeggios.

### Usage

This library requires ES2020 or newer. Run `npm install whistleaudio/midi-tools` in your JavaScript project, and then consume the exported functions, e.g.:

```js
import { getMidiNote, getScale, getChord } from 'midi-tools';
```

See source for further documentation or [whistleaudio/midi-app](https://github.com/whistleaudio/midi-app) for an example usage of the library.

#### Example

This repo includes a `midi-test.js` file you can use to quickly try it out. With [Node.js](https://nodejs.org) installed, run the following to print a scale and chord:

```sh
node midi-test.js
```

## C++

`miditools.h` implements similar functions for generating MIDI notes, chords, and arpeggios in C++.

### Usage

This library requires C++11 or newer. For example, a macOS install may come with C++98, so you can `brew install gcc` and add `export CXX=/usr/local/bin/g++-10` to `.bashrc` to tell `make` to use the newer compiler.

Include the `midi-tools.h` header file in your implementation file.

```cpp
#include <iostream>
#include "midi-tools.h"

int main()
{
  int note = getMidiNote("A", 4);
  std::cout << note;
}
```

If your file is named `midi.cpp`, run it with `make midi && ./midi`.

#### Example

This repo includes a `midi-test.cpp` file you can use to quickly test it out.

```sh
make midi-test && ./midi-test
```

## Go

`miditools.go` implements similar functions for generating MIDI notes, chords, and arpeggios with Golang.

### Usage

#### Example

This repo includes a `main.go` file you can use to quickly test it out.

```sh
cd golang && go run .
```
