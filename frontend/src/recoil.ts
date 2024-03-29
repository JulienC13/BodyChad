import { atom } from "recoil";
import ALL_EXERCISES_MOCK from "./API/get-tous.json"; //Simule les données récupérées depuis l'API

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
  default: 1,
});

export const isValidateState = atom({
  key: "isValidateState",
  default: false,
});

export const titleSessionState = atom({
  key: "titleSessionState",
  default: "",
});
export const addedExercisesIndexState = atom({
  key: "addedExercisesIndexState",
  default: [],
});

export const currentExerciseState = atom({
  key: "currentExerciseState",
  default: 0,
});

export const allSeancesState = atom({
  key: "allSeancesState",
  default: [],
});

export const selectedSeanceState = atom({
  key: "selectedSeanceState",
  default: null,
});

export const addRepsState = atom({
  key: "addRepsState",
  default: 0,
});

export const addWeightState = atom({
  key: "addWeightState",
  default: 0,
});

export const addTimeState = atom({
  key: "addTimeState",
  default: false,
});
