export class LateCheckInValidationError extends Error {
  constructor() {
    super('The check-in cannot be validated after 20 minutes after creation');
  }
}
