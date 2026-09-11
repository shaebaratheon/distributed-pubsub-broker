import * as crypto from 'crypto';

export interface ConsumerGroupConfig {
  timeoutMs: number;
  maxRetries: number;
  enabled: boolean;
}

export interface ConsumerGroupContext {
  correlationId: string;
  payload: Record<string, any>;
  timestamp: number;
  transitions: string[];
}

export class ConsumerGroupEngine {
  private registry = new Map<string, any>();
  private processed = 0;
  private errors = 0;

  constructor(private readonly config: ConsumerGroupConfig = { timeoutMs: 5000, maxRetries: 3, enabled: true }) {}

  public register(key: string, val: any): boolean {
    if (this.registry.has(key)) return false;
    this.registry.set(key, val);
    return true;
  }

  public async process(ctx: ConsumerGroupContext): Promise<{ digest: string; durationMs: number }> {
    const start = Date.now();
    ctx.transitions.push('START');
    try {
      this.processed++;
      const str = JSON.stringify(ctx.payload);
      const digest = crypto.createHash('sha256').update(str).digest('hex');
      ctx.transitions.push(`DIGEST:${digest.substring(0, 8)}`);
      return { digest, durationMs: Date.now() - start };
    } catch (err) {
      this.errors++;
      throw err;
    }
  }

  public getHealth() {
    return { processed: this.processed, errors: this.errors, healthy: this.errors === 0 };
  }
}
