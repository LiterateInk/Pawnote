package ink.literate.pawnote.models.errors

class UploadSizeError(maxSizeInBytes: Double) :
    Error(
        "The file you are trying to upload is too large, maximum allowed is $maxSizeInBytes bytes")

class UploadFailedError : Error("The file upload failed")
