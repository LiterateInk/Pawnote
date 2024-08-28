export class UploadSizeError extends Error {
  constructor(maxSizeInBytes: number) {
    super(`The file you are trying to upload is too large, maximum allowed is ${maxSizeInBytes} bytes`);
    this.name = "UploadSizeError";
  }
}

export class UploadFailedError extends Error {
  constructor() {
    super("The file upload failed");
    this.name = "UploadFailedError";
  }
}
