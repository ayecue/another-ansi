# another-ansi

[![another-ansi](https://circleci.com/gh/ayecue/another-ansi.svg?style=svg)](https://circleci.com/gh/ayecue/another-ansi)

Inspired by [ansi-styles](https://github.com/chalk/ansi-styles).

## Install

```sh
npm install another-ansi
```

## Usage

```js
import { AnotherAnsiProvider, ColorType } from 'another-ansi';

const p = new AnotherAnsiProvider();

// red text color
console.log(p.color(ColorType.Red, 'test'));

// red text color + green background color
console.log(p.bgColor(ColorType.Green, p.color(ColorType.Red, 'test')));

// red text color via hex
console.log(p.colorWithHex('#FF0000', 'test'));

// red text color via rgb
console.log(p.colorWithRgb(255, 0, 0, 'test'));

// bold text
console.log(p.modify(ModifierType.Bold, 'test'));

// clear console - only osx
console.log(p.command(CommandType.Clear));
```

## Escape sequences

```ts
EscapeSequence.Unicode // '\u001B' by default
EscapeSequence.Hex // '\x1b'
```

Can be used to define escape sequence in ansi provider:
```ts
const p  = new AnotherAnsiProvider(EscapeSequence.Hex);
p.color(ColorType.Red, 'test'); // \x1b[31mtest\x1b[39m
```

## Modifier + Colors

Modifier:
```ts
enum ModifierType {
  Reset,
  Bold,
  Dim,
  Italic,
  Underline,
  Overline,
  Inverse,
  Hidden,
  Strikethrough
}
```

Colors:
```ts
enum ColorType {
  Black,
  Red,
  Green,
  Yellow,
  Blue,
  Magenta,
  Cyan,
  White,
  BlackBright,
  Gray,
  Grey,
  RedBright,
  GreenBright,
  YellowBright,
  BlueBright,
  MagentaBright,
  CyanBright,
  WhiteBright
}
```

Commands:
```ts
enum CommandType {
  Clear
}
```

## Style Object

```ts
const styleObject = provider.getStyleObject();

// red text color
console.log(`${styleObject.color.red.open}test${styleObject.color.close}`);

// red background color
console.log(`${styleObject.bgColor.red.open}test${styleObject.bgColor.close}`);

// red background color
console.log(`${styleObject.bgColorBy16m(255, 0, 0)}test${styleObject.bgColor.close}`);
```