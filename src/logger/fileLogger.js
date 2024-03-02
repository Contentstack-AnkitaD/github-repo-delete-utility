
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

let writeToConsole = false;

// Function to set up file logging
function fileLogger() {
    const logsDirectory = path.join(process.cwd(), 'logs');
    // Create the logs directory if it doesn't exist
    if (!fs.existsSync(logsDirectory)) {
        fs.mkdirSync(logsDirectory);
        console.log(`Logs directory created at: ${logsDirectory}`);
    }

    const currentDate = new Date().toISOString().replace(/:/g, '-');
    const logFileName = `file_${currentDate}.log`;
    const logFilePath = path.join(logsDirectory, logFileName);
    const finalLogFilePath = path.join(logsDirectory, `finalLogs_${currentDate}.log`);


    // Create a write stream to the log file
    const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

    // Store the original console.log
    const originalConsoleLog = console.log;

    const originalConsoleError = console.error;

    const originalConsoleWarn = console.warn;


    // Override console.log to write to file by default
    console.log = function (...args) {
        // Write to the log file
        const logMsg = `${args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg)).join(' ')}\n`;

        // Write to the log file
        logStream.write(logMsg);
        // Log to the console if writeToConsole is true
        if (writeToConsole) {
            originalConsoleLog.apply(console, args);
        }

    };

    function stripAnsi(str) {
        return str.replace(/\u001b\[[0-9]{1,2}m/g, '');
    }

    // Override console.error to write to file by default
    console.error = function (...args) {
        // Write to the log file
        let logMsg = `${args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : chalk.red(arg))).join(' ')}\n`;
        logStream.write(stripAnsi(logMsg));

        // Log to the console if writeToConsole is true
        if (writeToConsole) {
            originalConsoleError.apply(console, [chalk.red(...args)]);
        }

    };

    // Override console.error to write to file by default
    console.warn = function (...args) {
        // Write to the log file
        let logMsg = `${args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : chalk.yellow(arg))).join(' ')}\n`;
        logStream.write(stripAnsi(logMsg));

        // Log to the console if writeToConsole is true
        if (writeToConsole) {
            originalConsoleWarn.apply(console, [chalk.yellow(...args)]);
        }
    };

    // Override console.error to write to file by default
    console.success = function (...args) {
        // Write to the log file
        let logMsg = `${args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : chalk.greenBright(arg))).join(' ')}\n`;
        logStream.write(stripAnsi(logMsg));

        // Log to the console if writeToConsole is true
        if (writeToConsole) {
            originalConsoleLog.apply(console, [chalk.greenBright(...args)]);
        }
    };

    console.alert = function (...args) {
        // Write to the log file
        let logMsg = `${args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : chalk.cyanBright(arg))).join(' ')}\n`;
        logStream.write(stripAnsi(logMsg));

        // Log to the console if writeToConsole is true
        if (writeToConsole) {
            originalConsoleLog.apply(console, [chalk.cyanBright(...args)]);
        }
    };
}

// Function to enable logging to console
function enableConsoleLogging() {
    writeToConsole = true;
}

// Function to disable logging to console
function disableConsoleLogging() {
    writeToConsole = false;
}

export { fileLogger, enableConsoleLogging, disableConsoleLogging };

