function extractFromHex(hex) {
  const sanitizedHex = hex.replace(/^#/, "");
  const bigint = parseInt(sanitizedHex, 16);
  const length = sanitizedHex.length;
  if (length === 3) {
    const red = ((bigint >> 8) & 0xf) * 17;
    const green = ((bigint >> 4) & 0xf) * 17;
    const blue = (bigint & 0xf) * 17;
    return { red, green, blue };
  }
  if (length === 6) {
    const red = (bigint >> 16) & 255;
    const green = (bigint >> 8) & 255;
    const blue = bigint & 255;
    const alpha = 1;
    return { red, green, blue, alpha };
  }
  throw new Error("Invalid color.");
}

console.log("check");
// function run() {
//   try {
//     console.log(extractFromHex("#f8fafc"));
//   } catch (er) {
//     console.error(er);
//   }
// }

// run();
