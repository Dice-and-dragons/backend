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

## Type Defenitions

- type CharacterType = {
  // Character Information
  name: string;
  class: string;
  level: number;
  background: string;
  playerName: string;
  race: string;
  alignment: string;
  experiencePoints: number;

  // Attributes
  attributes: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };

  // Inspiration and Proficiency
  inspiration: boolean;
  proficiencyBonus: number;

  // Saving Throws
  savingThrows: {
    strength: { proficient: boolean; value: number };
    dexterity: { proficient: boolean; value: number };
    constitution: { proficient: boolean; value: number };
    intelligence: { proficient: boolean; value: number };
    wisdom: { proficient: boolean; value: number };
    charisma: { proficient: boolean; value: number };
  };

  // Skills
  skills: {
    acrobatics: { proficient: boolean; value: number };
    animalHandling: { proficient: boolean; value: number };
    arcana: { proficient: boolean; value: number };
    athletics: { proficient: boolean; value: number };
    deception: { proficient: boolean; value: number };
    history: { proficient: boolean; value: number };
    insight: { proficient: boolean; value: number };
    intimidation: { proficient: boolean; value: number };
    investigation: { proficient: boolean; value: number };
    medicine: { proficient: boolean; value: number };
    nature: { proficient: boolean; value: number };
    perception: { proficient: boolean; value: number };
    performance: { proficient: boolean; value: number };
    persuasion: { proficient: boolean; value: number };
    religion: { proficient: boolean; value: number };
    sleightOfHand: { proficient: boolean; value: number };
    stealth: { proficient: boolean; value: number };
    survival: { proficient: boolean; value: number };
  };

  // Combat Stats
  armorClass: number;
  initiative: number;
  speed: number;
  hitPoints: {
    maximum: number;
    current: number;
    temporary: number;
  };
  hitDice: {
    total: string;
    current: string;
  };
  deathSaves: {
    successes: number;
    failures: number;
  };

  // Attacks & Spellcasting
  attacks: Array<{
    name: string;
    attackBonus: string;
    damage: string;
    type: string;
  }>;

  // Equipment
  equipment: string[];
  money: {
    copper: number;
    silver: number;
    electrum: number;
    gold: number;
    platinum: number;
  };

  // Features & Traits
  featuresTraits: string[];

  // Other Proficiencies & Languages
  otherProficiencies: string[];
  languages: string[];

  // Spellcasting
  spellcastingAbility: string;
  spellSaveDC: number;
  spellAttackBonus: number;
  spells: {
    cantrips: string[];
    [level: number]: {
      slots: {
        total: number;
        expended: number;
      };
      spells: string[];
    };
  };

  // Character Description
  personalityTraits: string;
  ideals: string;
  bonds: string;
  flaws: string;

  // Additional Notes
  additionalNotes: string;
};