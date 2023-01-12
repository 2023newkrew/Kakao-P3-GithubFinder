/* eslint-disable max-classes-per-file */
import { FAILED_TO_FETCH } from '../constant/message';

export class NetworkError extends Error {
  constructor(message) {
    super(message);
    Error.captureStackTrace(this, NetworkError);
  }
}

export class FetchError extends NetworkError {
  constructor(response) {
    super(`${FAILED_TO_FETCH}: ${response.status}`);
    this.response = response;
    Error.captureStackTrace(this, FetchError);
  }
}
