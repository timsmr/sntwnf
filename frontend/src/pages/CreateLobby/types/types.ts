export type CreateFormData = {
  name: string;
  date: string;
};

export type CreateFormDataProps = CreateFormData & {
  updateFields: (fields: Partial<CreateFormData>) => void;
};
