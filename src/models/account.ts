export type Account = Readonly<{
  address: string[];

  postalCode: string;
  province: string;
  country: string;
  city: string;

  email: string;
  /** @format `+[country-code][phone-number]` */
  phone: string;

  INE: string;

  /**
   * Only available on instances with PRONOTE version 2024 or higher.
   *
   * iCal feature also requires to be enabled on the instance.
   */
  iCalToken?: string;
}>;
