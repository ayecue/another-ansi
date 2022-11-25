import colorConvert from 'color-convert';

export const TEXT_COLOR_CODE = 38;
export const TEXT_COLOR_CLOSE_CODE = 39;
export const BACKGROUND_COLOR_CODE = 48;
export const BACKGROUND_COLOR_CLOSE_CODE = 49;

export type CodeTuple = [number, number];

export enum EscapeSequence {
  Hex = '\x1b',
  Unicode = '\u001B'
}

export enum CommandType {
  Clear = 'clear',
  Backspace = 'backspace'
}

export enum ModifierType {
  Reset = 'reset',
  Bold = 'bold',
  Dim = 'dim',
  Italic = 'italic',
  Underline = 'underline',
  Overline = 'overline',
  Inverse = 'inverse',
  Hidden = 'hidden',
  Strikethrough = 'strikethrough'
}

const modifierCodes: {
  [key in ModifierType]: CodeTuple;
} = {
  [ModifierType.Reset]: [0, 0],
  [ModifierType.Bold]: [1, 22],
  [ModifierType.Dim]: [2, 22],
  [ModifierType.Italic]: [3, 23],
  [ModifierType.Underline]: [4, 24],
  [ModifierType.Overline]: [53, 55],
  [ModifierType.Inverse]: [7, 27],
  [ModifierType.Hidden]: [8, 28],
  [ModifierType.Strikethrough]: [9, 29]
};

export enum ColorType {
  Black = 'black',
  Red = 'red',
  Green = 'green',
  Yellow = 'yellow',
  Blue = 'blue',
  Magenta = 'magenta',
  Cyan = 'cyan',
  White = 'white',
  BlackBright = 'blackBright',
  Gray = 'gray',
  Grey = 'grey',
  RedBright = 'redBright',
  GreenBright = 'greenBright',
  YellowBright = 'yellowBright',
  BlueBright = 'blueBright',
  MagentaBright = 'magentaBright',
  CyanBright = 'cyanBright',
  WhiteBright = 'whiteBright'
}

const textColorCodes: {
  [key in ColorType]: CodeTuple;
} = {
  [ColorType.Black]: [30, TEXT_COLOR_CLOSE_CODE],
  [ColorType.Red]: [31, TEXT_COLOR_CLOSE_CODE],
  [ColorType.Green]: [32, TEXT_COLOR_CLOSE_CODE],
  [ColorType.Yellow]: [33, TEXT_COLOR_CLOSE_CODE],
  [ColorType.Blue]: [34, TEXT_COLOR_CLOSE_CODE],
  [ColorType.Magenta]: [35, TEXT_COLOR_CLOSE_CODE],
  [ColorType.Cyan]: [36, TEXT_COLOR_CLOSE_CODE],
  [ColorType.White]: [37, TEXT_COLOR_CLOSE_CODE],
  [ColorType.BlackBright]: [90, TEXT_COLOR_CLOSE_CODE],
  [ColorType.Gray]: [90, TEXT_COLOR_CLOSE_CODE],
  [ColorType.Grey]: [90, TEXT_COLOR_CLOSE_CODE],
  [ColorType.RedBright]: [91, TEXT_COLOR_CLOSE_CODE],
  [ColorType.GreenBright]: [92, TEXT_COLOR_CLOSE_CODE],
  [ColorType.YellowBright]: [93, TEXT_COLOR_CLOSE_CODE],
  [ColorType.BlueBright]: [94, TEXT_COLOR_CLOSE_CODE],
  [ColorType.MagentaBright]: [95, TEXT_COLOR_CLOSE_CODE],
  [ColorType.CyanBright]: [96, TEXT_COLOR_CLOSE_CODE],
  [ColorType.WhiteBright]: [97, TEXT_COLOR_CLOSE_CODE]
};

const backgroundColorCodes: {
  [key in ColorType]: CodeTuple;
} = {
  [ColorType.Black]: [40, BACKGROUND_COLOR_CLOSE_CODE],
  [ColorType.Red]: [41, BACKGROUND_COLOR_CLOSE_CODE],
  [ColorType.Green]: [42, BACKGROUND_COLOR_CLOSE_CODE],
  [ColorType.Yellow]: [43, BACKGROUND_COLOR_CLOSE_CODE],
  [ColorType.Blue]: [44, BACKGROUND_COLOR_CLOSE_CODE],
  [ColorType.Magenta]: [45, BACKGROUND_COLOR_CLOSE_CODE],
  [ColorType.Cyan]: [46, BACKGROUND_COLOR_CLOSE_CODE],
  [ColorType.White]: [47, BACKGROUND_COLOR_CLOSE_CODE],
  [ColorType.BlackBright]: [100, BACKGROUND_COLOR_CLOSE_CODE],
  [ColorType.Gray]: [100, BACKGROUND_COLOR_CLOSE_CODE],
  [ColorType.Grey]: [100, BACKGROUND_COLOR_CLOSE_CODE],
  [ColorType.RedBright]: [101, BACKGROUND_COLOR_CLOSE_CODE],
  [ColorType.GreenBright]: [102, BACKGROUND_COLOR_CLOSE_CODE],
  [ColorType.YellowBright]: [103, BACKGROUND_COLOR_CLOSE_CODE],
  [ColorType.BlueBright]: [104, BACKGROUND_COLOR_CLOSE_CODE],
  [ColorType.MagentaBright]: [105, BACKGROUND_COLOR_CLOSE_CODE],
  [ColorType.CyanBright]: [106, BACKGROUND_COLOR_CLOSE_CODE],
  [ColorType.WhiteBright]: [107, BACKGROUND_COLOR_CLOSE_CODE]
};

export interface AnsiObject {
  open: string;
  close: string;
}
export interface AnsiStyleObject {
  bgColorByHex: (v: string) => string;
  bgColorByRgb: (r: number, g: number, b: number) => string;
  bgColorBy16m: (r: number, g: number, b: number) => string;
  colorByHex: (v: string) => string;
  colorByRgb: (r: number, g: number, b: number) => string;
  colorBy16m: (r: number, g: number, b: number) => string;
  modifier: {
    [key in ModifierType]: AnsiObject;
  };
  color: {
    [key in ColorType]: Omit<AnsiObject, 'close'>;
  } & Omit<AnsiObject, 'open'>;
  bgColor: {
    [key in ColorType]: Omit<AnsiObject, 'close'>;
  } & Omit<AnsiObject, 'open'>;
  command: {
    [key in CommandType]: string;
  };
}

export class AnotherAnsiProvider {
  escapeSequence: EscapeSequence;

  constructor(escapeSequence: EscapeSequence = EscapeSequence.Unicode) {
    this.escapeSequence = escapeSequence;
  }

  private ansi(code: number): string {
    return `${this.escapeSequence}[${code}m`;
  }

  private ansi256(code: number): string {
    return `${this.escapeSequence}[${TEXT_COLOR_CODE};5;${code}m`;
  }

  private ansi16m(r: number, g: number, b: number): string {
    return `${this.escapeSequence}[${TEXT_COLOR_CODE};2;${r};${g};${b}m`;
  }

  private bgAnsi256(code: number): string {
    return `${this.escapeSequence}[${BACKGROUND_COLOR_CODE};5;${code}m`;
  }

  private bgAnsi16m(r: number, g: number, b: number): string {
    return `${this.escapeSequence}[${BACKGROUND_COLOR_CODE};2;${r};${g};${b}m`;
  }

  private wrap([a, b]: CodeTuple, content: string) {
    const open = this.ansi(a);
    const close = this.ansi(b);
    return `${open}${content}${close}`;
  }

  bgColorWith16m(r: number, g: number, b: number, content: string) {
    const open = this.bgAnsi16m(r, g, b);
    const close = this.ansi(BACKGROUND_COLOR_CLOSE_CODE);
    return `${open}${content}${close}`;
  }

  bgColorWithRgb(r: number, g: number, b: number, content: string) {
    const open = this.bgAnsi256(colorConvert.rgb.ansi256([r, g, b]));
    const close = this.ansi(BACKGROUND_COLOR_CLOSE_CODE);
    return `${open}${content}${close}`;
  }

  bgColorWithHex(hexCode: string, content: string) {
    const open = this.bgAnsi256(colorConvert.hex.ansi256(hexCode));
    const close = this.ansi(BACKGROUND_COLOR_CLOSE_CODE);
    return `${open}${content}${close}`;
  }

  bgColor(type: ColorType, content: string): string {
    return this.wrap(backgroundColorCodes[type], content);
  }

  colorWith16m(r: number, g: number, b: number, content: string) {
    const open = this.ansi16m(r, g, b);
    const close = this.ansi(TEXT_COLOR_CLOSE_CODE);
    return `${open}${content}${close}`;
  }

  colorWithRgb(r: number, g: number, b: number, content: string) {
    const open = this.ansi256(colorConvert.rgb.ansi256([r, g, b]));
    const close = this.ansi(TEXT_COLOR_CLOSE_CODE);
    return `${open}${content}${close}`;
  }

  colorWithHex(hexCode: string, content: string) {
    const open = this.ansi256(colorConvert.hex.ansi256(hexCode));
    const close = this.ansi(TEXT_COLOR_CLOSE_CODE);
    return `${open}${content}${close}`;
  }

  color(type: ColorType, content: string): string {
    return this.wrap(textColorCodes[type], content);
  }

  modify(type: ModifierType, content: string): string {
    return this.wrap(modifierCodes[type], content);
  }

  command(type: CommandType): string {
    switch (type) {
      case CommandType.Clear:
        return `${this.escapeSequence}[2J${this.escapeSequence}[3J${this.escapeSequence}[;H`;
      case CommandType.Backspace:
        return `${this.escapeSequence}[D${this.escapeSequence}[K`
      default:
        throw new Error('Unknown command.');
    }
  }

  getStyleObject(): AnsiStyleObject {
    return {
      colorByHex: (v) => this.ansi256(colorConvert.hex.ansi256(v)),
      colorByRgb: (r, g, b) => this.ansi256(colorConvert.rgb.ansi256(r, g, b)),
      colorBy16m: (r, g, b) => this.ansi16m(r, g, b),
      bgColorByHex: (v) => this.bgAnsi256(colorConvert.hex.ansi256(v)),
      bgColorByRgb: (r, g, b) =>
        this.bgAnsi256(colorConvert.rgb.ansi256(r, g, b)),
      bgColorBy16m: (r, g, b) => this.bgAnsi16m(r, g, b),
      modifier: {
        ...(Object.entries(modifierCodes).reduce((result, [key, value]) => {
          return {
            ...result,
            [key]: this.ansi(value[0])
          };
        }, {}) as { [key in ModifierType]: AnsiObject })
      },
      color: {
        ...(Object.entries(textColorCodes).reduce((result, [key, value]) => {
          return {
            ...result,
            [key]: this.ansi(value[0])
          };
        }, {}) as { [key in ColorType]: AnsiObject }),
        close: this.ansi(TEXT_COLOR_CLOSE_CODE)
      },
      bgColor: {
        ...(Object.entries(backgroundColorCodes).reduce(
          (result, [key, value]) => {
            return {
              ...result,
              [key]: this.ansi(value[0])
            };
          },
          {}
        ) as { [key in ColorType]: AnsiObject }),
        close: this.ansi(BACKGROUND_COLOR_CLOSE_CODE)
      },
      command: {
        [CommandType.Clear]: this.command(CommandType.Clear),
        [CommandType.Backspace]: this.command(CommandType.Backspace),
      }
    };
  }
}
