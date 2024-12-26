export default class CsharpClassGenerator {
  private __baseName = "root";
  private __jsdocStr = "";
  private __jsdocMap = new Map<string, string>();

  constructor() {
    this.__jsdocStr = "";
    this.__jsdocMap = new Map([[this.__baseName, ""]]);
  }

  private typedefStr(name: string) {
    return `class ${name} {\n`;
  }

  private arraydefStr(type: string, name: string) {
    return `    public ${type}[] ${name} {get; set;}\n`;
  }

  private propertyStr(type: string, name: string) {
    return `    public ${type} ${name} {get; set;}\n`;
  }

  private captaializeFirstletter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private getJsDocType(value: any) {
    if (Array.isArray(value)) {
      return "array";
    } else if (typeof value === "object" && value !== null) {
      return "object";
    } else if (typeof value === "string") {
      return "string";
    } else if (typeof value === "number") {
      return "long";
    } else if (typeof value === "boolean") {
      return "bool";
    } else {
      return "dynamic";
    }
  }

  public getJsDocContainer() {
    return this.__jsdocMap;
  }
  public createRoot(inputObj: Object, typedefName: string) {
    if (Array.isArray(inputObj)) {
      let jsdoc = this.typedefStr(typedefName);
      const arrtype = this.getJsDocType(inputObj[0]);
      const key = "obj1";
      debugger;

      if (arrtype == "object") {
        const nestedTypename = `${this.captaializeFirstletter(key)}`;
        jsdoc += this.arraydefStr(nestedTypename, key);

        this.create(inputObj[0], nestedTypename);
      } else {
        jsdoc += this.arraydefStr(arrtype, key);
        jsdoc += ` */\n`;
      }
      this.__jsdocMap.set(typedefName, jsdoc);
    } else {
      this.create(inputObj, typedefName);
    }
  }

  public create(inputObj: Object, typedefName: string) {
    let jsdoc = this.typedefStr(typedefName);

    for (const key in inputObj) {
      if (inputObj.hasOwnProperty(key)) {
        const value = inputObj[key];
        const type = this.getJsDocType(value);
        if (type === "object") {
          const nestedTypename = `${this.captaializeFirstletter(key)}`;
          jsdoc += this.propertyStr(nestedTypename, key);
          this.create(value, nestedTypename);
        } else if (type === "array") {
          const arrtype = this.getJsDocType(value[0]);
          if (arrtype === "object") {
            const nestedTypename = `${this.captaializeFirstletter(key)}`;
            jsdoc += this.arraydefStr(nestedTypename, key);

            for (const item of value) {
              this.create(item, nestedTypename);
            }
          } else {
            jsdoc += this.arraydefStr(arrtype, key);
          }
        } else {
          jsdoc += this.propertyStr(type, key);
        }
      }
    }
    jsdoc += `}\n`;
    this.__jsdocMap.set(typedefName, jsdoc);
  }

  public toString() {
    let str = "";
    for (const value of this.__jsdocMap.values()) {
      str += `${value}\n`;
    }
    return str;
  }
}
