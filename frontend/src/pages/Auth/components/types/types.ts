export type PersonalData = {
  name: string;
  preferences: string;
};

export type PersonalDataProps = PersonalData & {
  updateFields: (fields: Partial<PersonalData>) => void;
};

export type GeneralData = {
  login: string;
  password: string;
};

export type GeneralDataProps = GeneralData & {
  updateFields: (fields: Partial<GeneralData>) => void;
};

export type RegisterFormData = {
  login: string;
  password: string;
  name: string;
  preferences: string;
};
