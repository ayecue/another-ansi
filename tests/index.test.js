const { AnotherAnsiProvider, ModifierType, ColorType } = require('../dist');

describe('AnotherAnsiProvider', function () {
  describe('with unicode', () => {
    const provider = new AnotherAnsiProvider();

    test('modify', () => {
      expect(provider.modify(ModifierType.Reset, 'test')).toMatchSnapshot();
      expect(provider.modify(ModifierType.Bold, 'test')).toMatchSnapshot();
      expect(provider.modify(ModifierType.Dim, 'test')).toMatchSnapshot();
      expect(provider.modify(ModifierType.Italic, 'test')).toMatchSnapshot();
      expect(provider.modify(ModifierType.Underline, 'test')).toMatchSnapshot();
      expect(provider.modify(ModifierType.Overline, 'test')).toMatchSnapshot();
      expect(provider.modify(ModifierType.Inverse, 'test')).toMatchSnapshot();
      expect(provider.modify(ModifierType.Hidden, 'test')).toMatchSnapshot();
      expect(provider.modify(ModifierType.Strikethrough, 'test')).toMatchSnapshot();
    });

    test('color', () => {
      expect(provider.color(ColorType.Black, 'test')).toMatchSnapshot();
      expect(provider.color(ColorType.Red, 'test')).toMatchSnapshot();
      expect(provider.color(ColorType.Green, 'test')).toMatchSnapshot();
      expect(provider.color(ColorType.Yellow, 'test')).toMatchSnapshot();
      expect(provider.color(ColorType.Blue, 'test')).toMatchSnapshot();
      expect(provider.color(ColorType.Magenta, 'test')).toMatchSnapshot();
      expect(provider.color(ColorType.Cyan, 'test')).toMatchSnapshot();
      expect(provider.color(ColorType.White, 'test')).toMatchSnapshot();
      expect(provider.color(ColorType.BlackBright, 'test')).toMatchSnapshot();
      expect(provider.color(ColorType.Gray, 'test')).toMatchSnapshot();
      expect(provider.color(ColorType.Grey, 'test')).toMatchSnapshot();
      expect(provider.color(ColorType.RedBright, 'test')).toMatchSnapshot();
      expect(provider.color(ColorType.GreenBright, 'test')).toMatchSnapshot();
      expect(provider.color(ColorType.YellowBright, 'test')).toMatchSnapshot();
      expect(provider.color(ColorType.BlueBright, 'test')).toMatchSnapshot();
      expect(provider.color(ColorType.MagentaBright, 'test')).toMatchSnapshot();
      expect(provider.color(ColorType.CyanBright, 'test')).toMatchSnapshot();
      expect(provider.color(ColorType.WhiteBright, 'test')).toMatchSnapshot();
    });

    test('bgColor', () => {
      expect(provider.bgColor(ColorType.Black)).toMatchSnapshot();
      expect(provider.bgColor(ColorType.Red)).toMatchSnapshot();
      expect(provider.bgColor(ColorType.Green)).toMatchSnapshot();
      expect(provider.bgColor(ColorType.Yellow)).toMatchSnapshot();
      expect(provider.bgColor(ColorType.Blue)).toMatchSnapshot();
      expect(provider.bgColor(ColorType.Magenta)).toMatchSnapshot();
      expect(provider.bgColor(ColorType.Cyan)).toMatchSnapshot();
      expect(provider.bgColor(ColorType.White)).toMatchSnapshot();
      expect(provider.bgColor(ColorType.BlackBright)).toMatchSnapshot();
      expect(provider.bgColor(ColorType.Gray)).toMatchSnapshot();
      expect(provider.bgColor(ColorType.Grey)).toMatchSnapshot();
      expect(provider.bgColor(ColorType.RedBright)).toMatchSnapshot();
      expect(provider.bgColor(ColorType.GreenBright)).toMatchSnapshot();
      expect(provider.bgColor(ColorType.YellowBright)).toMatchSnapshot();
      expect(provider.bgColor(ColorType.BlueBright)).toMatchSnapshot();
      expect(provider.bgColor(ColorType.MagentaBright)).toMatchSnapshot();
      expect(provider.bgColor(ColorType.CyanBright)).toMatchSnapshot();
      expect(provider.bgColor(ColorType.WhiteBright)).toMatchSnapshot();
    });

    test('hex', () => {
      expect(provider.colorWithHex('#FF0000')).toMatchSnapshot();
      expect(provider.bgColorWithHex('#FF0000')).toMatchSnapshot();
    });

    test('rgb', () => {
      expect(provider.colorWithRgb(255, 0, 0)).toMatchSnapshot();
      expect(provider.bgColorWithRgb(255, 0, 0)).toMatchSnapshot();
    });

    test('16m', () => {
      expect(provider.colorWith16m(255, 0, 0)).toMatchSnapshot();
      expect(provider.bgColorWith16m(255, 0, 0)).toMatchSnapshot();
    });

    test('styleObject', () => {
      const styleObject = provider.getStyleObject();
      expect(styleObject).toMatchSnapshot();

      expect(`${styleObject.color.red.open}test${styleObject.color.close}`).toMatchSnapshot();

      expect(`${styleObject.bgColor.red.open}test${styleObject.bgColor.close}`).toMatchSnapshot();

      expect(`${styleObject.modifier.bold.open}test${styleObject.modifier.bold.close}`).toMatchSnapshot();

      expect(`${styleObject.command.clear}`).toMatchSnapshot();

      expect(`${styleObject.colorByHex('#FF0000')}test${styleObject.color.close}`).toMatchSnapshot();
      expect(`${styleObject.colorByRgb(255, 0, 0)}test${styleObject.color.close}`).toMatchSnapshot();
      expect(`${styleObject.colorBy16m(255, 0, 0)}test${styleObject.color.close}`).toMatchSnapshot();

      expect(`${styleObject.bgColorByHex('#FF0000')}test${styleObject.bgColor.close}`).toMatchSnapshot();
      expect(`${styleObject.bgColorByRgb(255, 0, 0)}test${styleObject.bgColor.close}`).toMatchSnapshot();
      expect(`${styleObject.bgColorBy16m(255, 0, 0)}test${styleObject.bgColor.close}`).toMatchSnapshot();
    });
  });
});
