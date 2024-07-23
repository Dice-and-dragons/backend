# Dice-and-dragons API Endpoints

### REST API
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

### Websocket API

1. **Add Event (add)**
   - `id`: Character ID
   - `backgroundId`: ID of the background to add the character to
   - `position`: Position of the character on the background

2. **Move Event (move)**
   - `id`: Character ID
   - `backgroundId`: ID of the background where the character is located
   - `position`: New position of the character on the background

3. **Remove Event (remove)**
   - `id`: Character ID
   - `backgroundId`: ID of the background to remove the character from