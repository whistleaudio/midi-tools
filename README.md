# midi-tools

## JavaScript

Files for the JavaScript project are in the repository's root. `index.js` exports some basic functions for generating MIDI notes, chords, and arpeggios.

### Usage

This library requires ES2020 or newer. Run `npm install whistleaudio/midi-tools` in your JavaScript project, and then consume the exported functions, e.g.:

```js
import { getChord } from 'midi-tools';

const chord = getChord("A", 4, "aeolian", 3);
console.log(chord.join(' '));
```

See source for further documentation or [whistleaudio/midi-app](https://github.com/whistleaudio/midi-app) for an example usage of the library.

#### Example

This repo includes a `js/midi-test.js` file you can use to quickly try it out. With [Node.js](https://nodejs.org) installed, run the following to print a scale and chord:

```sh
node midi-test.js
```

## C++

The `c++` folder contains the C++ project. `miditools.h` implements similar functions for generating MIDI notes, chords, and arpeggios in C++. Note that `midi-tools.h` defines a couple type aliases: a `Scale` as an array of 7 integers and a `Chord` as a vector of integers.

### Usage

This library requires C++11 or newer. For example, a macOS install may come with C++98, so you can `brew install gcc` and add `export CXX=/usr/local/bin/g++-10` to `.bashrc` to tell `make` to use the newer compiler.

Include the `midi-tools.h` header file in your implementation file.

```cpp
#include <iostream>
#include "midi-tools.h"

int main()
{
  const Chord chord = getChord("A", 4, "aeolian", 3);
  for (const int& value : chord) {
    std::cout << value << ' ';
  }
}
```

#### Example

This repo includes a `midi-test.cpp` file you can use to quickly test it out.

```sh
cd c++ && make midi-test && ./midi-test
```

## Go

The `go` folder contains the Go project. `miditools.go` implements similar functions for generating MIDI notes, chords, and arpeggios with Golang. Note that `miditools.go` defines a couple types: a `Scale` as an array of 7 integers and a `Chord` as a slice of integers.

### Usage

From the same module, `miditools.go` can be used by importing "github.com/whistleaudio/miditools" to use functions like `miditools.GetChord()`.

```go
package main

import (
	"fmt"
	"github.com/whistleaudio/miditools"
)

func main() {
	fmt.Println(miditools.GetChord("A", 4, "aeolian", 3)) // [69 72 76]
}

```

#### Example

This repo includes a `main.go` file you can use to quickly test it out.

```sh
cd go && go run cmd/main.go
```
