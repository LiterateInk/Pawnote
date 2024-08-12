import { PronoteApiAccountId } from "~/constants/accounts";

export interface PronoteApiInstance {
  request: Record<string, never>

  response: {
    version: number[]
    date: string
    CAS: { actif: false } | { actif: true, casURL: string, jetonCAS: string }
    espaces: Array<{ nom: string, URL: string }>
    nomEtab: string
  }
}

export interface ApiInstance {
  input: {
    pronoteURL: string
  }

  output: {
    version: number[]
    schoolName: string

    accounts: Array<{
      name: string
      id: PronoteApiAccountId
    }>

    pronoteRootURL: string

    /** URL of the ENT we have to handle. */
    entURL?: string
    /** Used to generate new temporary passwords for Pronote after ENT login. */
    entToken?: string
  }
}
