
## API Endpoints

### Create a Company

**POST** `/companies`

Request body:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Example Corp",
  "type": "Corporative",
  "adhesionDate": "2023-01-01",
  "transferDates": ["2023-02-01", "2023-03-01"]
}
```

Successful response (201):
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Example Corp",
    "type": "Corporative",
    "adhesionDate": "2023-01-01",
    "transferDates": ["2023-02-01", "2023-03-01"]
  }
}
```

## How to integrate in the system

We have a lambda function that is triggered by an API Gateway. The API Gateway is configured to forward the request to the lambda function and the lambda functions persist the company in the database, in this case, we are using an in-memory database for demo purposes.

### Plus I added middy library
Middy is a middleware engine for AWS Lambda https://middy.js.org/ that simplify the process of building lambda functions.

