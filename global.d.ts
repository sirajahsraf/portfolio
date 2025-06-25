declare module 'vite' {
  export function defineConfig(config: any): any;
  export function createServer(config?: any): Promise<any>;
  export function createLogger(level?: string): any;

  export interface ServerOptions {
    middlewareMode?: boolean;
    hmr?: {
      server?: any;
      port?: number;
    };
    allowedHosts?: any;
    host?: string | boolean;
    port?: number;
    strictPort?: boolean;
  }
}

declare module '*/vite.ts' {
  const content: any;
  export = content;
}
