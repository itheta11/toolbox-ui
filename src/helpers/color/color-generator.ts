export default class ColorGnerator {
  public color: Color | null;

  constructor() {
    this.color = {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 1,
    };
  }
  public extractFromHex(hex: string) {
    const sanitizedHex = hex.replace(/^#/, "");
    const bigint = parseInt(sanitizedHex, 16);
    const length = sanitizedHex.length;
    if (length === 3) {
      this.color.red = ((bigint >> 8) & 0xf) * 17;
      this.color.green = ((bigint >> 4) & 0xf) * 17;
      this.color.blue = (bigint & 0xf) * 17;
      return;
    }
    if (length === 6) {
      this.color.red = (bigint >> 16) & 255;
      this.color.green = (bigint >> 8) & 255;
      this.color.blue = bigint & 255;
      this.color.alpha = 1;
      return;
    }
    throw new Error("Invalid color.");
  }

  public extractFromRGBA(fg: Color, bg: Color | null) {
    if (
      (fg.red >= 0 && fg.red <= 255) ||
      (fg.green >= 0 && fg.green <= 255) ||
      (fg.blue >= 0 && fg.blue <= 255)
    ) {
      throw new Error("Invalid color.");
    }

    if (bg === null) {
      this.color.red = fg.red;
      this.color.green = fg.green;
      this.color.blue = fg.blue;
      this.color.alpha = 1;
    } else {
      this.color.red = Math.round(fg.red * fg.alpha + bg.red * (1 - fg.alpha));
      this.color.green = Math.round(
        fg.green * fg.alpha + bg.green * (1 - fg.alpha)
      );
      this.color.blue = Math.round(
        fg.blue * fg.alpha + bg.blue * (1 - fg.alpha)
      );
      this.color.alpha = 1;
    }
  }

  public extractFromHSLA(h: number, s: number, l: number, a = 1) {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let [r, g, b] = [0, 0, 0];
    if (h < 60) [r, g, b] = [c, x, 0];
    else if (h < 120) [r, g, b] = [x, c, 0];
    else if (h < 180) [r, g, b] = [0, c, x];
    else if (h < 240) [r, g, b] = [0, x, c];
    else if (h < 300) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];

    this.color.red = Math.round((r + m) * 255);
    this.color.green = Math.round((g + m) * 255);
    this.color.blue = Math.round((b + m) * 255);
    this.color.alpha = a;
  }

  public toHEX(): string {
    const getHex = (value) => value.toString(16).padStart(2, "0");
    return `#${getHex(this.color.red)}${getHex(this.color.green)}${getHex(this.color.blue)}`;
  }

  public toRGB(): string {
    return `rgb(${this.color.red}, ${this.color.green}, ${this.color.blue})`;
  }

  public toRGBA(): string {
    return `rgb(${this.color.red}, ${this.color.green}, ${this.color.blue},  ${this.color.alpha})`;
  }

  private converttoHSL() {
    const r = this.color.red / 255;
    const g = this.color.green / 255;
    const b = this.color.blue / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (delta !== 0) {
      s = delta / (1 - Math.abs(2 * l - 1));
      switch (max) {
        case r:
          h = 60 * (((g - b) / delta) % 6);
          if (h < 0) h += 360; // Normalize negative hue
          break;
        case g:
          h = 60 * ((b - r) / delta + 2);
          break;
        case b:
          h = 60 * ((r - g) / delta + 4);
          break;
      }
    }

    return {
      h: Math.round(h),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }

  public toHSL(): string {
    const { h, s, l } = this.converttoHSL();
    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  public toHSLA(): string {
    const { h, s, l } = this.converttoHSL();
    return `hsla(${h}, ${s}%, ${l}%, ${this.color.alpha})`;
  }
}

type Color = {
  red: number;
  green: number;
  blue: number;
  alpha: number;
};
