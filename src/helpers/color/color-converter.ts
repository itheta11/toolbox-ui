import ColorGnerator from "./color-generator";

export default function colorConversion(
  from: string,
  to: string,
  value: any
): string {
  const colorGenerator = new ColorGnerator();

  if (from === "hex") {
    colorGenerator.extractFromHex(value);
    if (to === "rgb") {
      return colorGenerator.toRGB();
    } else if (to === "rgba") {
      return colorGenerator.toRGBA();
    } else if (to === "hsl") {
      return colorGenerator.toHSL();
    } else if (to === "hsla") {
      return colorGenerator.toHSLA();
    }
  }

  if (from === "rgb") {
    const { r, g, b } = getRgbComponents(value);
    colorGenerator.extractFromRGBA(
      { red: r, green: g, blue: b, alpha: 1 },
      null
    );
    if (to === "hex") {
      return colorGenerator.toHEX();
    } else if (to === "rgba") {
      return colorGenerator.toRGBA();
    } else if (to === "hsl") {
      return colorGenerator.toHSL();
    } else if (to === "hsla") {
      return colorGenerator.toHSLA();
    }
  }

  if (from === "rgba") {
    const { r, g, b, a } = getRgbaComponents(value);
    colorGenerator.extractFromRGBA(
      { red: r, green: g, blue: b, alpha: a },
      null
    );
    if (to === "hex") {
      return colorGenerator.toHEX();
    } else if (to === "rgb") {
      return colorGenerator.toRGB();
    } else if (to === "hsl") {
      return colorGenerator.toHSL();
    } else if (to === "hsla") {
      return colorGenerator.toHSLA();
    }
  }

  if (from === "hsl") {
    const { h, s, l } = getHslComponents(value);
    colorGenerator.extractFromHSLA(h, s, l, 1);
    if (to === "hex") {
      return colorGenerator.toHEX();
    } else if (to === "rgb") {
      return colorGenerator.toRGB();
    } else if (to === "rgba") {
      return colorGenerator.toRGBA();
    } else if (to === "hsla") {
      return colorGenerator.toHSLA();
    }
  }

  if (from === "hsla") {
    const { h, s, l, a } = getHslaComponents(value);
    colorGenerator.extractFromHSLA(h, s, l, a);
    if (to === "hex") {
      return colorGenerator.toHEX();
    } else if (to === "rgb") {
      return colorGenerator.toRGB();
    } else if (to === "rgba") {
      return colorGenerator.toRGBA();
    } else if (to === "hsla") {
      return colorGenerator.toHSL();
    }
  }
  return value;
}

function getRgbComponents(rgbString) {
  // Match the RGB format and extract the components
  const match = rgbString.match(/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/);

  if (!match) {
    throw new Error("Invalid RGB format. Expected format: 'rgb(r, g, b)'.");
  }

  // Parse and return the components as numbers
  const [_, r, g, b] = match;
  return {
    r: parseInt(r, 10),
    g: parseInt(g, 10),
    b: parseInt(b, 10),
  };
}

function getRgbaComponents(rgbaString) {
  // Match the RGBA format and extract the components
  const match = rgbaString.match(
    /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(0|1|0?\.\d+)\)$/
  );

  if (!match) {
    throw new Error(
      "Invalid RGBA format. Expected format: 'rgba(r, g, b, a)'."
    );
  }

  // Parse and return the components as numbers
  const [_, r, g, b, a] = match;
  return {
    r: parseInt(r, 10),
    g: parseInt(g, 10),
    b: parseInt(b, 10),
    a: parseFloat(a),
  };
}

function getHslComponents(hslString) {
  // Match the HSL format and extract the components
  const match = hslString.match(
    /^hsl\((\d{1,3}),\s*(\d{1,3}%)\s*,\s*(\d{1,3}%)\)$/
  );

  if (!match) {
    throw new Error("Invalid HSL format. Expected format: 'hsl(h, s%, l%)'.");
  }

  // Parse and return the components
  const [_, h, s, l] = match;
  return {
    h: parseInt(h, 10), // Hue
    s: parseInt(s, 10) / 100, // Saturation
    l: parseInt(l, 10) / 100, // Lightness
  };
}

function getHslaComponents(hslaString) {
  // Match the HSLA format and extract the components
  const match = hslaString.match(
    /^hsla\((\d{1,3}),\s*(\d{1,3}%)\s*,\s*(\d{1,3}%)\s*,\s*(0|1|0?\.\d+)\)$/
  );

  if (!match) {
    throw new Error(
      "Invalid HSLA format. Expected format: 'hsla(h, s%, l%, a)'."
    );
  }

  // Parse and return the components
  const [_, h, s, l, a] = match;
  return {
    h: parseInt(h, 10), // Hue
    s: parseInt(s, 10) / 100, // Saturation
    l: parseInt(l, 10) / 100, // Lightness
    a: parseFloat(a), // Alpha
  };
}

export type ColorUnits = "hex" | "rgb" | "rgba" | "hsl" | "hsla";
