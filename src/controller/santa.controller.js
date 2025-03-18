const { assignSecretSantas } = require('../services/assigner.service');
const { parseCSV, writeCSV } = require('../utils/fileHandler.utils');
const logger = require('../utils/logger.utils');

exports.generateAssignments = async (req, res, next) => {
    try {
        const { currentYearFile, lastYearFile } = req.body;

        const currentYearEmployees = parseCSV(currentYearFile);
        const lastYearAssignments = lastYearFile ? parseCSV(lastYearFile) : [];

        const assignments = assignSecretSantas(currentYearEmployees, lastYearAssignments);

        const outputPath = './src/output/secret_santa_assignments.csv';
        writeCSV(outputPath, assignments);

        logger.info('Assignments generated successfully!');
        res.status(200).json({ message: 'Assignments generated successfully!', file: outputPath });
    } catch (error) {
        logger.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
};