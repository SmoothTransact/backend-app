export interface RedisRepositoryInterface {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
  del(key: string): Promise<void>;
  exists(key: string): Promise<number>;
  sadd(
    prefix: string,
    key: string,
    member: string | number | Buffer,
  ): Promise<number>;
  setWithExpiry(key: string, value: string, expiry: number): Promise<void>;
  sismember(key: string, member: string | number | Buffer): Promise<number>;
}
