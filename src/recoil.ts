import { atom } from "recoil";
import ALL_EXERCISES_MOCK from "./API/get-tous.json";

export const exercisesState = atom({
  key: "exercisesState",
  default: ALL_EXERCISES_MOCK,
});

export const setSecondsState = atom({
  key: "setSecondsState",
  default: 0,
});

export const setMinutesState = atom({
  key: "setMinutesState",
  default: 0,
});

export const setSeriesState = atom({
  key: "setSeriesState",
  default: 0,
});

export const isValidateState = atom({
  key: "isValidateState",
  default: false,
});

export const titleSessionState = atom({
  key: "titleSessionState",
  default: "",
});
export const addedExercisesState = atom({
  key: "addedExercisesState",
  default: [],
});

export const currentExerciseState = atom({
  key: "currentExerciseState",
  default: null,
});
