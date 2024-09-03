export type PasswordRules = Readonly<{
  maxLength: number;
  minLength: number;

  rules: number[]; // TODO: type the numbers to an enum
}>;
