export type PositionType = { x: number; y: number };

export type CharacterType = {
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

export type SizeType = {
  xSize: Sizes;
  ySize: Sizes;
};

type Sizes = 6 | 18 | 36 | 64 | 128 | 256 | 512;

export type RoomsType = string[];
