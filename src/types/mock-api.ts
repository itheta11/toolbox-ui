import { ALL_TYPES } from ".";

export interface MockField {
  id: string;
  name: string;
  type: ALL_TYPES;
  module?: string;
  moduleType?: string;
}
