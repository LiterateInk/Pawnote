import { Partner } from "~/models";
export const decodePartner = (partner: any): Partner => ({ sso: partner.SSO });
