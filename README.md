# Dice-and-dragons API Endpoints

## Create Character

- **URL:** `/character/create`
- **Method:** `POST`
- **Query Parameters:**
  - `characterData`: Character data (type: CharacterType)
  - `userId`: User ID (type: string)
- **Success Response:**
  - **Code:** 200
  - **Content:** `Character created with id: {id}`

## Update Character

- **URL:** `/character/update`
- **Method:** `POST`
- **Query Parameters:**
  - `id`: Character ID (type: string)
  - `characterData`: Updated character data (type: CharacterType)
- **Success Response:**
  - **Code:** 200
  - **Content:** `User successfully updated`

## Delete Character

- **URL:** `/character/delete`
- **Method:** `POST`
- **Query Parameters:**
  - `id`: Character ID (type: string)
- **Success Response:**
  - **Code:** 200
  - **Content:** `User successfully deleted`

## Notes

- All endpoints are prefixed with the base path defined in the `CharacterRouter` constructor.
- The API uses query parameters instead of request body for data input.
- Error handling is not explicitly defined in the provided code.
- Authentication and authorization mechanisms are not shown in the provided code.