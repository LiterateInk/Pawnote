type ReactNativeFileFromURI = {
  uri: string
  name: string
  type: string

  size: number
};

export type PawnoteSupportedFormDataFile = Blob | File | Buffer | ArrayBuffer | Uint8Array | ReactNativeFileFromURI;
