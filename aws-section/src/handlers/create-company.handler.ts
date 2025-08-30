import { APIGatewayProxyResult } from 'aws-lambda';
import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import { memoryDatabase } from '../database/memory.database';
import { CreateCompanyDto } from '../dto/create-company.dto';
import {
  classValidator,
  MiddyEvent,
} from '../middleware/class-validator.middleware';

export const createCompany = async (
  event: MiddyEvent<CreateCompanyDto>,
): Promise<APIGatewayProxyResult> => {
  try {
    // At this point, the body is already parsed and validated by middy
    const company = await memoryDatabase.saveCompany(event.parsedBody!);

    return {
      statusCode: 201,
      body: JSON.stringify(company),
    };
  } catch (error) {
    console.error('Error creating company:', error);
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};

export const createCompanyHandler = middy() // middleware engine for AWS Lambda https://middy.js.org/
  .use(jsonBodyParser()) // parse JSON string into an object
  .use(classValidator<CreateCompanyDto>({ bodyClass: CreateCompanyDto })) // validate the body using a custom middleware for class-validator
  .handler(createCompany); // the handler with the business logic
