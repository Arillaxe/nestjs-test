export abstract class BaseTask {
  abstract name: string;
  abstract interval: number;

  abstract execute(): void | Promise<void>;
}
