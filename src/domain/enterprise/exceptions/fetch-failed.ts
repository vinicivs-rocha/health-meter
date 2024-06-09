export class FetchFailed extends Error {
  constructor(target: string) {
    super(`${target} fetch failed.`);
  }
}
