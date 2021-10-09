export enum Occupation {
  EMPLOYED = 'employed',
  STUDENT = 'student',
  SELF_EMPLOYED = 'self_employed',
}

export enum InsuranceType {
  LIABILITY,
  HOME_CONTENT,
  HEALTH,
}

// TODO move numbers to env vars
export const INSURANCE_TYPE_TO_VALUE = {
  [InsuranceType.LIABILITY]: 300,
  [InsuranceType.HOME_CONTENT]: 420,
  [InsuranceType.HEALTH]: 250,
};

export const OCCUPATION_TO_PERCENT = {
  [Occupation.EMPLOYED]: 1.5,
  [Occupation.SELF_EMPLOYED]: 1.3,
  [Occupation.STUDENT]: 1,
};
