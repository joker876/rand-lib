# Take(A)Chance
A JavaScript library to help with various tasks involving randomness.

## Highlights
* Supports TypeScript!
* Supports Node and browser
* Includes full JSX documentation
* Code weighs only 16kB

## Installation
```
npm install take-chance --save
```

## Usage
```js
import { TakeChance } from 'take-chance';
```

### Functions - Table of Contents
  - [int](#int)
  - [float](#float)
  - [multipleInt](#multipleint)
  - [multipleFloat](#multiplefloat)
  - [boolean](#boolean)
  - [binomial](#binomial)
  - [character](#character)
  - [string](#string)
  - [fromArray](#fromarray)
  - [fromObject](#fromobject)
  - [date](#date)
  - [id](#id)
  - [die](#die)
  - [rgbColor](#rgbcolor-and-hexcolor)
  - [hexColor](#rgbcolor-and-hexcolor)

#### int
Generates a random integer, optionally specifying minimum and maximum range.

Type: `function(min?: number, max?: number): number`

* `min` (number) - minimum value, inclusive. Optional, default 0.
* `max` (number) - maximum value, inclusive. Optional, default 100.

```js
TakeChance.int()            // example outputs: 78, 9, 36
TakeChance.int(10)          // example outputs: 45, 11, 97
TakeChance.int(0, 20)       // example outputs: 1, 13, 7
```

#### float
Generates a random floating point decimal, optionally specifying minimum and maximum range.

Type: `function(min?: number, max?: number): number`

* `min` (number) - minimum value, inclusive. Optional, default 0.
* `max` (number) - maximum value, inclusive. Optional, default 1.

```js
TakeChance.float()            // example output: 0.4089221334106232
TakeChance.float(0.5)         // example output: 0.9873850867986081
TakeChance.float(0, 5)        // example output: 3.4504321331627576
```

#### multipleInt
Generates an array of random integers of defined length, optionally specifying minimum and maximum range.

Type: `function(length: number, min?: number, max?: number): number[]`

* `length` (number) - how many numbers to generate. Required.
* `min` (number) - minimum value, inclusive. Optional, default 0.
* `max` (number) - maximum value, inclusive. Optional, default 100.

```js
TakeChance.multipleInt()               // error: specify array length
TakeChance.multipleInt(3)              // example output: [45, 11, 97]
TakeChance.multipleInt(3, 0, 20)       // example output: [1, 13, 7]
```

#### multipleFloat
Generates an array of random floating point decimals of defined length, optionally specifying minimum and maximum range.

Type: `function(length: number, min?: number, max?: number): number[]`

* `length` (number) - how many numbers to generate. Required.
* `min` (number) - minimum value, inclusive. Optional, default 0.
* `max` (number) - maximum value, inclusive. Optional, default 100.

```js
TakeChance.multipleFloat()           // error: specify array length
TakeChance.multipleFloat(3)          
TakeChance.multipleFloat(3, 0, 2)    
```

#### boolean
Generates a random boolean value, optionally specyfing the probability of getting `true`.

Type: `function(probability?: number): boolean`

* `probability` (number) - the probability of getting `true`. It must be between 0 and 1. Optional, default to 0.5.

```js
TakeChance.boolean()        // example output: true (50% chance of true)
TakeChance.boolean(0.2)     // example output: false (20% chance of true)
```

#### binomial
Generates a random floating point decimal according to [binomial distribution](https://en.wikipedia.org/wiki/Binomial_distribution), optionally specifying minimum and maximum range, and the skew factor.

Type: `function(min?: number, max?: number, skew?: number): number`

* `min` (number) - minimum value, inclusive. Optional, default 0.
* `max` (number) - maximum value, inclusive. Optional, default 1.
* `skew` (number) - the skew factor. Must be higher than 0 to work properly (values above 10 are not really useful). Optional, default 1 (no skew). Changes how much the values are skewed towards `min` or `max`. [visualization](https://jsfiddle.net/2uc346hp/)

#### character
Generates a random character from a defined set of characters.

Type: `function(options: object): string`

* `options` (object) - the options to select the character. Its an object that should contain at least one of the following properties:
  * `from` (string | string[]) - a string of characters or an array of individual characters to choose from, in addition to other options.
  * `letters` (boolean) - if set to `true`, all letters of both cases (a-z and A-Z) are added to the characters to choose from.
  * `uppercase` (boolean) - if set to `true`, all uppercase letters (A-Z) are added to the characters to choose from.
  * `lowercase` (boolean) - if set to `true`, all lowercase letters (a-z) are added to the characters to choose from.
  * `numbers` (boolean) - if set to `true`, all numbers (0-9) are added to the characters to choose from.
  * `special` (boolean) - if set to `true`, all all ASCII special characters are added to the characters to choose from.

```js
TakeChance.character({ letters: true })       // example outputs: 'A', 't', 'Q'
TakeChance.character({ from: 'abcdef%!' })    // example outputs: '!', 'a', 'f'
```

#### string
Generates a random string of characters from a defined set of characters.

Type: `function(length: number, options: object): string`
* `length` (number) - the length of the string to generate. Required.
* `options` (object) - the options to select the character. See [character](#character) for more info.
```js
TakeChance.string(5, { letters: true })   // example outputs: 'AviRp', 'TffPQ'
```

#### fromArray
Picks a random element from an array.

Type: `function(array: any[], min?: number, max?: number): any`
* `array` (any[]) - the array to pick from. Required.
* `min` (number) - the minimum index to choose from. Optional, default 0.
* `max` (number) - the maximum index to choose from. Optional, default to last index.
```js
TakeChance.fromArray(['foo', 'bar', 'baz', 5])     // example output: 'bar'
```

#### fromObject
Picks a random key from an object.

Type: `function(object: object): any`
* `object` (object) - the object to pick the key from. Required.
```js
TakeChance.fromArray(['foo', 'bar', 'baz', 5])     // example output: 'bar'
```

#### date
Picks a date from between two dates.

Type: `function(min: Date, max?: Date): Date`
* `min` (Date) - the minimum date to choose from. Required.
* `max` (Date) - the maximum date to choose from. Optional, default to current date.

#### id
Generates a random string of characters that is a [valid HTML5 id](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id#sect2).

It generates ids from these characters: a-z, A-Z, 0-9, "_", and "-". The generated id always starts with a letter.

With the length of 10, there are over 4 quadrillion (4x10^15) possible ids, which makes the chance of getting two same ids extremely unlikely.

Type: `function(length?: number): string`

* `length` (number) - the length of the generated id. Optional, default 10.

```js
TakeChance.id()   // example output: 'e4Jwbn-3_qP'
```

#### die
Rolls a virtual die with *n* sides. Returns a random number between 1 and *n* (inclusive).

Type: `function(n?: number): string`
* `n` (number) - the amount of sides the die has. Optional, default 6.

```js
TakeChance.die()     // example output: 5
TakeChance.die(24)   // example output: 17
```

#### rgbColor and hexColor
Generates a random color in either RGB or HEX format.

Type: `function(): { r: number, g: number, b: number }` and `function(): string`

* This function has no parameters.

Function `rgbColor` returns an object containing `r`, `g`, and `b` properties, all with a random integer between 0 and 255 (inclusive).

Function `hexColor` returns a string with 6 random hex symbols (lowercase letters), 2 for each color. It also adds a hash symbol (`#`) at the beginning of the string.

```js
TakeChance.rgbColor()   // example output: { r: 53, g: 187, b: 241 }
TakeChance.hexColor()   // example output: '#a7f14e'
```