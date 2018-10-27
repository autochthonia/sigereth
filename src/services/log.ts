import log from 'loglevel';

export const updateLog = log.getLogger('updateLog');
updateLog.setDefaultLevel(0)
export const performanceLog = log.getLogger('performanceLog');
performanceLog.setDefaultLevel(0)

export default log;
