export interface BaseObject {
  /** Unique Identifier, ideally unique amonst all Objects, but if isolated as a child of some object, unique within that group */
  id: string;
  /** The display name */
  name: string;
}
