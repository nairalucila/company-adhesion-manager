import { MiddlewareObj, Request } from '@middy/core';
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export interface ClassValidatorOptions {
  bodyClass?: new () => any;
}

export interface MiddyEvent<T> extends APIGatewayProxyEvent {
  parsedBody?: T;
}

/**
 * Custom middleware to validate the request body using class-validator.
 *
 * @typeParam T - The type of the request body.
 * @param options - The options for the middleware.
 * @param options.bodyClass - The class of the request body, used for validation.
 * @returns The middleware object.
 */
export const classValidator = <T>(
  options: ClassValidatorOptions,
): MiddlewareObj<MiddyEvent<T>, APIGatewayProxyResult> => {
  const before = async (
    request: Request<MiddyEvent<T>, APIGatewayProxyResult, Error, Context>,
  ) => {
    if (options.bodyClass && request.event.body) {
      try {
        // Transform plain object to class instance
        const dto = plainToInstance(options.bodyClass, request.event.body);

        // Validate the DTO
        const errors = await validate(dto);

        if (errors.length > 0) {
          const errorMessages = errors
            .map((error: ValidationError) => {
              return Object.values(error.constraints || {}).join(', ');
            })
            .join('; ');

          throw new Error(`Validation failed: ${errorMessages}`);
        }

        // Replace the body with the validated DTO instance
        request.event.parsedBody = dto;
      } catch (error) {
        const response: APIGatewayProxyResult = {
          statusCode: 400,
          body: JSON.stringify({
            message: 'Validation Error',
            error:
              error instanceof Error ? error.message : 'Invalid request body',
          }),
        };
        // Disable eslint rule because custom object error is thrown.
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        throw response;
      }
    }
  };

  return {
    before,
  };
};
