export enum ErrorCodes {
    ERROR_READING_THE_EMAIL = 'ERROR_READING_THE_EMAIL',
    JSON_PARSE_ERROR = 'JSON_PARSE_ERROR',
    NETWORK_ERROR = 'NETWORK_ERROR',
    UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  }
  
  export const ErrorMessages = {
    [ErrorCodes.ERROR_READING_THE_EMAIL]: 'Error reading the email.',
    [ErrorCodes.JSON_PARSE_ERROR]: 'Failed to parse JSON content.',
    [ErrorCodes.NETWORK_ERROR]: 'Network error occurred while fetching JSON content.',
    [ErrorCodes.UNKNOWN_ERROR]: 'An unknown error occurred.',
  };