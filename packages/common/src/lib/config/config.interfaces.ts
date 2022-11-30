import { z } from 'zod';
import { LoggerConfig } from '@andreafspeziale/logger';
import { baseEnvSchema } from './config.schema';

export enum NodeEnv {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

interface EnvConfig {
  env: NodeEnv;
}

export interface Service {
  name: string;
  version: string;
}

export interface ServiceConfig {
  service: Service;
}

export interface Server {
  host: string;
  port: number;
  apiPrefix: string;
  swagger: boolean;
}

export interface ServerConfig {
  server: Server;
}

export type BaseEnvSchema = z.infer<typeof baseEnvSchema>;

export interface BaseConfig extends ServiceConfig, EnvConfig, ServerConfig, LoggerConfig {}
