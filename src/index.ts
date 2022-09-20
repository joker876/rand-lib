type integer = number;
/**
 * Generates a random decimal number, chosen from between two numbers.
 * This method uses a [cryptographically secure random number generator](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues). 
 * @param min The minimum number to generate. Optional, defaults to 0.
 * @param max The maximum number to generate. Optional, defaults to 1.
 * @returns A random decimal number between `min` and `max`.
 */
function secureInt(min: integer = 0, max: integer = 100): integer {
    const randomBuffer = new Uint32Array(1);

    crypto.getRandomValues(randomBuffer);

    let rand = randomBuffer[0] / (0xffffffff + 1);

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(rand * (max - min + 1)) + min;
}
/**
 * Generates a random decimal number, chosen from between two numbers.
 * @param min The minimum number to generate. Optional, defaults to 0.
 * @param max The maximum number to generate. Optional, defaults to 1.
 * @returns A random decimal number between `min` and `max`.
 */
function float(min: number = 0, max: number = 1): number {
    return Math.random() * (max - min) + min;
}
/**
 * Generates a random integer, chosen from between two numbers.
 * @param min The minimum number to generate. Optional, defaults to 0.
 * @param max The maximum number to generate. Optional, defaults to 100.
 * @returns A random integer between `min` and `max`.
 */
function int(min: integer = 0, max: integer = 100): integer {
    return Math.round(float(min, max));
}
/**
 * Generates a random boolean value, with customizable probability of returning `true`.
 * @param probability The probability of returning `true`. Should be a number between 0 and 1. Defaults to 50% (0.5).
 * @returns A randomly generated boolean.
 */
function boolean(probability: number = 0.5): boolean {
    return Math.random() < probability;
}
/**
 * Generates an array of random integers, chosen from between two numbers.
 * @param length How many numbers to generate. Required.
 * @param min The minimum number to generate. Optional, defaults to 0.
 * @param max The maximum number to generate. Optional, defaults to 100.
 * @returns A an array of random integers between `min` and `max`.
 */
function multipleInt(length: number, min: integer = 0, max: integer = 100): integer[] {
    let arr: number[] = [];
    for (let i = 0; i < length; i++) {
        arr.push(int(min, max));
    }
    return arr;
}
/**
 * Generates an array of random decimal numbers, chosen from between two numbers.
 * @param length How many numbers to generate. Required.
 * @param min The minimum number to generate. Optional, defaults to 0.
 * @param max The maximum number to generate. Optional, defaults to 1.
 * @returns A an array of random decimal numbers between `min` and `max`.
 */
function multipleFloat(length: integer, min: number = 0, max: number = 1): number[] {
    let arr: number[] = [];
    for (let i = 0; i < length; i++) {
        arr.push(float(min, max));
    }
    return arr;
}
/**
 * Generates a random number, chosen from between two numbers, according to binomial distribution.
 * @param min The minimum number to generate. Optional, defaults to 0.
 * @param max The maximum number to generate. Optional, defaults to 1.
 * @param skew The skew factor of the binomial distribution. Optional, defaults to 1 (no skew). [more info](https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve)
 * @returns a randomly generated number, following the binomial distribution.
 */
function binomial(min: number = 0, max: number = 1, skew: number = 1) {
    if (skew <= 0) throw new Error("Skew cannot be lower than or equal to 0");

    let u = 0, v = 0;
    while (u === 0) u = Math.random() //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random()
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
    num = num / 10.0 + 0.5 // Translate to 0 -> 1
    if (num > 1 || num < 0)
        num = binomial(min, max, skew) // resample between 0 and 1 if out of range
    else {
        num = Math.pow(num, skew) // Skew
        num *= max - min // Stretch to fill range
        num += min // offset to min
    }
    return num
}
/**
 * Chooses a random element from an array, from indexes between `min` and `max`.
 * @param array The array to choose elements from. Required.
 * @param min The minimum index to choose from. Optional, defaults to 0.
 * @param max The maximum index to choose from. Optional, defaults to the last index.
 * @returns A random element chosen from the array, from indexes between `min` and `max`.
 */
function fromArray<T>(array: T[], min: integer = 0, max: integer = array.length - 1): T {
    if (min < 0) min = 0;
    if (max > array.length - 1) max = array.length - 1;
    return array[int(min, max)];
}
/**
 * Chooses a random key from an object.
 * @param obj The object to choose keys from. Required.
 * @returns A random key from the object.
 */
function fromObject<T extends object>(obj: T): keyof T {
    let keys = Object.keys(obj) as (keyof T)[];
    return fromArray(keys);
}
/**
 * Generates a random character from a predefined list. All duplicates in the final list are removed.
 * @param options Various options to quickly define what characters can be used. The available options are:
 * * `from` - a string or array of characters to choose from
 * * `letters` - allows to choose from all lowercase and uppercase letters (a-z and A-Z)
 * * `uppercase` - allows to choose from all uppercase letters (A-Z)
 * * `lowercase` - allows to choose from all lowercase letters (a-z)
 * * `numbers` - allows to choose from all numbers (0-9)
 * * `special` - allows to choose from all ASCII special characters
 * @returns A random character chosen from the predefined list.
 */
function character(options: { from?: string | string[], letters?: boolean, uppercase?: boolean, lowercase?: boolean, numbers?: boolean, special?: boolean }): string {
    //convert `options.from` from string to array 
    if (typeof options.from == "string") options.from = options.from.split('');
    //initiate array to choose characters from
    let charArray = options.from ?? [];
    //add all lowercase letters
    if (options.letters || options.lowercase) charArray.push(...('abcdefghijklmnopqrstuvwxyz'.split('')));
    //add all uppercase letters
    if (options.letters || options.uppercase) charArray.push(...('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')));
    //add all numbers
    if (options.numbers) charArray.push(...('0123456789'.split('')));
    //add all ASCII special characters
    if (options.special) charArray.push(...('!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'.split('')));
    //remove duplicates
    charArray = [...new Set(charArray)];
    //return
    return fromArray(charArray);
}
/**
 * Generates A random string of set length from a predefined list of characters.
 * @param options Various options to quickly define what characters can be used in the string. The available options are:
 * * `from` - a string or array of characters to choose from
 * * `letters` - allows to choose from all lowercase and uppercase letters (a-z and A-Z)
 * * `uppercase` - allows to choose from all uppercase letters (A-Z)
 * * `lowercase` - allows to choose from all lowercase letters (a-z)
 * * `numbers` - allows to choose from all numbers (0-9)
 * * `special` - allows to choose from all ASCII special characters
 * @returns A random string of characters chosen from the predefined list.
 */
function string(length: integer, options: { from?: string | string[], letters?: boolean, uppercase?: boolean, lowercase?: boolean, numbers?: boolean, special?: boolean }): string {
    let str = '';
    for (let i = 0; i < length; i++) {
        str += character(options);
    }
    return str;
}
/**
 * Generates a random date from between two dates.
 * @param min The minimum date to choose from. Required.
 * @param max The maximum date to choose from. Optional, defaults to current date.
 * @returns A random date from between `min` and `max`.
 */
function date(min: Date, max: Date = new Date(Date.now())): Date {
    return new Date(int(min.valueOf(), max.valueOf()));
}
/**
 * Generates a random string of characters that is a [valid HTML5 id](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id#sect2).
 * @param length The length of the returned id. Optional, defaults to 10.
 * @returns A random string of characters a-z, A-Z, 0-9, "_", and "-".
 */
function id(length: integer = 10): string {
    let ret = '';
    //characters 0-9, "-", and "_" shouldn't be first in the id
    do {
        ret = character({ letters: true, numbers: true, from: '-_' });
    } while (ret <= '9' || ret == '_'); // <= '9' elliminates all numbers and "-", == '_' elliminates "_".
    //add the rest of the id normally
    for (let i = 1; i < length; i++) {
        ret += character({ letters: true, numbers: true, from: '-_' });
    }
    return ret;
}
function password(length: integer = 16): string {
    let ret = '';
    do {
        ret = string(length, { letters: true, numbers: true, special: true });
    } while (
        (ret.match(/[a-z]/g)?.length ?? 0) < length / 4 ||
        (ret.match(/[A-Z]/g)?.length ?? 0) < length / 4 ||
        (ret.match(/[0-9]/g)?.length ?? 0) < length / 6 ||
        (ret.match(/[!"#$%&'()*+,\-./:;<=>?@[\\]\^_`{|}~]/g)?.length ?? 0) < length / 8
    );
    return ret;
}
/**
 * Rolls an *n*-sided die and returns the result.
 * @param n Amount of sides of the die. Optional, defaults to 6.
 * @returns a random number that may appear on the chosen die. The numbers always range from 1 to `n`.
 */
function die(n: integer = 6): number {
    return int(1, n);
}
/**
 * Generates a random RGB color.
 * @returns An object containing `r`, `g`, and `b` properties, each with a 0-1 number.
 */
function rgbColor(): { r: integer, g: integer, b: integer } {
    return {
        r: int(0, 255),
        g: int(0, 255),
        b: int(0, 255)
    }
}
/**
 * Generates a random hex color.
 * @returns A string representing the hex number, with a hash in front.
 */
function hexColor(): string {
    return '#' + string(6, { numbers: true, from: 'abcdef' });
}
export const TakeChance = {
    int,
    secureInt,
    float,
    multipleInt,
    multipleFloat,
    boolean,
    binomial,
    character,
    string,
    fromArray,
    fromObject,
    date,
    id,
    password,
    die,
    rgbColor,
    hexColor,
}
export default TakeChance;