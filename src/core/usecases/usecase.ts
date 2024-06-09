export abstract class Usecase<Input, Output> {
  abstract output: Output;
  abstract execute(input: Input): Promise<void>;
}
