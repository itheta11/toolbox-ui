export default class CsvGenerator {
  static generate(jsonData) {
    debugger;
    if (Array.isArray(jsonData)) {
      const headers = Object.keys(jsonData[0]);
      let csvrows = "";
      jsonData.forEach((row, rowIndex) => {
        let csvrow = "";
        headers.forEach((header, headerItemIndex) => {
          if (headerItemIndex !== headers.length - 1) {
            csvrow += row[header] + ",";
          } else {
            csvrow += row[header];
          }
        });

        if (rowIndex !== jsonData.length - 1) {
          csvrows += csvrow;
        } else {
          csvrows += csvrow + "\n";
        }
      });

      return headers.join(",") + "\n" + csvrows;
    }
  }
}
