const fs = require('fs');
const { parse } = require('csv-parse/sync');
const { stringify } = require('csv-stringify/sync');

exports.parseCSV = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    return parse(content, { columns: true });
};

exports.writeCSV = (filePath, data) => {
    const dir = filePath.substring(0, filePath.lastIndexOf('/'));
    
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const content = stringify(data, { header: true });
    fs.writeFileSync(filePath, content);
};
