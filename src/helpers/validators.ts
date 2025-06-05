import { STATES } from "./constants"

export const isValidState = (state: string): boolean => {
  return STATES.includes(state)
}