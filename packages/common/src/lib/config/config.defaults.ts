import { LoggerLevel } from '@andreafspeziale/logger';
import { NodeEnv } from './config.interfaces';

export const NODE_ENV = NodeEnv.Development;

export const HOST = '0.0.0.0';
export const PORT = '3000';

export const API_PREFIX = 'api';
export const SWAGGER = 'true';

export const LOGGER_LEVEL = LoggerLevel.Debug;
export const LOGGER_PRETTY = 'true';
export const LOGGER_REDACT = '';
