export default class CsvGenerator {
    static generate(jsonData) {
        if (Array.isArray(jsonData)) {
            const headers = Object.keys(jsonData[0]);
            const rows = jsonData.map(obj => {
                headers.map(header => JSON.stringify(obj[header], null, 2)).join(",");

            })
            console.log([headers.join(","), ...rows].join("\n"))
            return [headers.join(","), ...rows].join("\n");
        }
    }
}