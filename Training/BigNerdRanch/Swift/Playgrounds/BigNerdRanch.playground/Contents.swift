//: Playground - noun: a place where people can play

import Cocoa

var myFirstInt: Int = 0


let oneCoolDude = "\u{1F60E}"
let playground = "Hello, playground"
var mutablePlayground = "Hello, mutable playground"
mutablePlayground += "!"

for c in mutablePlayground.characters {
    print("'\(c)'")
}

let aAcute = "\u{0061}\u{0301}"
for scalar in playground.unicodeScalars {
    print("\(scalar.value) ")
}

let empty = ""

if empty.isEmpty {
    print("its empty !")
}