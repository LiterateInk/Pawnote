import type { PronoteApiUserPersonalInformation } from "~/api/user/personalInformation/types";
import type { Session } from "~/session";

export class StudentPersonalInformation {
  public readonly address: string[];

  public readonly postalCode: string;
  public readonly province: string;
  public readonly country: string;
  public readonly city: string;

  public readonly email: string;
  /** @format `+[country-code][phone-number]` */
  public readonly phone: string;

  public readonly INE: string;

  /**
   * Only available on instances with version 2024.1.3 or higher.
   *
   * iCal feature also requires to be enabled on the instance.
   */
  public readonly iCalToken?: string;

  constructor (session: Session, { Informations, iCal }: PronoteApiUserPersonalInformation["response"]["donnees"]) {
    this.address = [
      Informations.adresse1,
      Informations.adresse2,
      Informations.adresse3,
      Informations.adresse4
    ];

    this.postalCode = Informations.codePostal;
    this.province = Informations.province;
    this.country = Informations.pays;
    this.city = Informations.ville;

    this.email = Informations.eMail;
    this.phone = `+${Informations.indicatifTel}${Informations.telephonePortable}`;

    this.INE = Informations.numeroINE;

    if (session.instance.version[0] >= 2024) {
      this.iCalToken = iCal?.liste.V[0]?.paramICal;
    }
  }
}
