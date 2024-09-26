class LoggerService {
    private static logs: string[] = [];

    static info(message: string) {
        this.addLog(`INFO: ${message}`);
    }

    static warn(message: string) {
        this.addLog(`WARN: ${message}`);
    }

    static error(message: string) {
        this.addLog(`ERROR: ${message}`);
    }

    private static addLog(message: string) {
        const timestamp = new Date().toISOString();
        this.logs.push(`[${timestamp}] ${message}`);
    }

    static getLogs() {
        return this.logs;
    }
}

export default LoggerService;