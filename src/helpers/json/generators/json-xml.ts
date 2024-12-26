export default class XmlGenerator {
  private __baseName = "root";
  private __xmlStr = "";
  private INDENT = "    ";

  constructor() {}

  public convertValue(value, key, level) {
    const indent = this.INDENT.repeat(level);

    if (value === null || value === undefined) {
      return `${indent}<${key}/>`;
    }

    if (Array.isArray(value)) {
      return value
        .map((item) => this.convertValue(item, key, level))
        .join("\n");
    }

    if (typeof value === "object") {
      return this.createXML(value, key, level);
    }

    // Escape special characters in text content
    const escapedValue = String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

    return `${indent}<${key}>${escapedValue}</${key}>`;
  }

  private createXML(obj, rootName = "root", level = 0) {
    const indent = this.INDENT.repeat(level);

    if (typeof obj !== "object" || obj === null) {
      return this.convertValue(obj, rootName, level);
    }

    const xmlParts = [];

    for (const [key, value] of Object.entries(obj)) {
      xmlParts.push(this.convertValue(value, key, level + 1));
    }

    return rootName
      ? `${indent}<${rootName}>\n${xmlParts.join("\n")}\n${indent}</${rootName}>`
      : xmlParts.join("\n");
  }

  public create(obj) {
    return '<?xml version="1.0" encoding="UTF-8"?>\n' + this.createXML(obj);
  }
}
