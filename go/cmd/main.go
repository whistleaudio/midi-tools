package main

import (
	"fmt"
	"github.com/whistleaudio/miditools"
)

func main() {
	fmt.Print("The A minor scale: ")
	fmt.Println(miditools.GetScale("A", 4, "aeolian")) // [69 71 72 74 76 77 79]
	fmt.Print("The A minor chord: ")
	fmt.Println(miditools.GetChord("A", 4, "aeolian", 3)) // [69 72 76]
}
