package main

import "fmt"

func main() {
	fmt.Print("The A minor scale: ")
	fmt.Println(getScale("A", 4, "aeolian")) // [69 71 72 74 76 77 79]
	fmt.Print("The A minor chord: ")
	fmt.Println(getChord("A", 4, "aeolian", 3)) // [69 72 76]
}
