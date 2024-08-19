# Dice-and-Dragons API

## Overview

Dice-and-Dragons API provides WebSocket endpoints for managing characters in the game. These endpoints allow you to create, update, delete, and manage character positions on different backgrounds in real-time.

## WebSocket API Endpoints

### 1. **Create Character**

- **Event:** `create`
- **Payload:**
  - `character`: Character data (type: CharacterType)
  - `userId`: User ID (type: string)
- **Description:** Creates a new character and assigns it to the specified user.

### 2. **Update Character**

- **Event:** `update`
- **Payload:**
  - `id`: Character ID (type: string)
  - `character`: Updated character data (type: CharacterType)
- **Description:** Updates an existing character with the provided data.

### 3. **Delete Character**

- **Event:** `delete`
- **Payload:**
  - `id`: Character ID (type: string)
- **Description:** Deletes a character with the specified ID.

### 4. **Add Event**

- **Event:** `add`
- **Payload:**
  - `id`: Character ID (type: string)
  - `backgroundId`: ID of the background to add the character to (type: string)
  - `position`: Position of the character on the background (type: { x: number, y: number })
- **Description:** Adds a character to a specified background at the given position.

### 5. **Move Event**

- **Event:** `move`
- **Payload:**
  - `id`: Character ID (type: string)
  - `backgroundId`: ID of the background where the character is located (type: string)
  - `position`: New position of the character on the background (type: { x: number, y: number })
- **Description:** Moves a character to a new position on the specified background.

### 6. **Remove Event**

- **Event:** `remove`
- **Payload:**
  - `id`: Character ID (type: string)
  - `backgroundId`: ID of the background to remove the character from (type: string)
- **Description:** Removes a character from the specified background.

## Server Events

- **`ping`**: Sent by clients to check the connection. The server broadcasts this to all clients.
- **`update`**: Broadcasted by the server to all clients when any character is created, updated, deleted, added, moved, or removed.
- **`disconnect`**: Triggered when a user disconnects from the server.
