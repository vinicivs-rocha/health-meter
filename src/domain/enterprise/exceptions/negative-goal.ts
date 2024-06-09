export class NegativeGoal extends Error {
  constructor() {
    super("Goal cannot be negative.");
  }
}
