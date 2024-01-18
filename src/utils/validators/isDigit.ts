function isDigit(value: string) {
  for (const char of value) {
    if (isNaN(parseInt(char))) return false;
  }
  return true;
}

export default isDigit;
