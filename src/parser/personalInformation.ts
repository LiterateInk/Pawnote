import type { PronoteApiUserPersonalInformation } from "~/api/user/personalInformation/types";

export class StudentPersonalInformation {
  public address: string[];
  
  public postalCode: string;
  public province: string;
  public country: string;
  public city: string;
  
  public email: string;
  /** In the format: +[country-code][phone-number]` */
  public phone: string;

  public INE: string;

  constructor (personalInformation: PronoteApiUserPersonalInformation["response"]["donnees"]["Informations"]) {
    this.address = [
      personalInformation.adresse1,
      personalInformation.adresse2,
      personalInformation.adresse3,
      personalInformation.adresse4,
    ];

    this.postalCode = personalInformation.codePostal;
    this.province = personalInformation.province;
    this.country = personalInformation.pays;
    this.city = personalInformation.ville;

    this.email = personalInformation.eMail;
    this.phone = `+${personalInformation.indicatifTel}${personalInformation.telephonePortable}`;

    this.INE = personalInformation.numeroINE;
  }
}
