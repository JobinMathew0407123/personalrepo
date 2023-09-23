// src/utils/validate.ts

import { validate } from 'class-validator';

export async function validateInput(input: any): Promise<string[]> {
  const errors = await validate(input);
  const errorMessages: string[] = [];

  if (errors.length > 0) {
    errors.forEach((error) => {
      Object.values(error.constraints).forEach((constraint) => {
        errorMessages.push(constraint);
      });
    });
  }

  return errorMessages;
}
