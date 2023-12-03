export function checkIfFilesAreTooBig(file?: File): boolean {
  let valid = true;
  if (file) {
    const size = file.size / 1024 / 1024;
    if (size > 10) {
      valid = false;
    }
  }
  return valid;
}

export function checkIfFilesAreCorrectType(file: File): boolean {
  let valid = true;
  if (file) {
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      valid = false;
    }
  }
  return valid;
}
