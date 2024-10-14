export function validateIBAN(iban: string): boolean {
  // Remove spaces and convert to uppercase
  const cleanedIBAN = iban.replace(/\s/g, "").toUpperCase();

  // Basic regex check for IBAN format
  const ibanRegex =
    /^([A-Z]{2}[ \-]?[0-9]{2})(?=(?:[ \-]?[A-Z0-9]){9,30}$)((?:[ \-]?[A-Z0-9]{3,5}){2,7})([ \-]?[A-Z0-9]{1,3})?$/;

  if (!ibanRegex.test(cleanedIBAN)) {
    return false;
  }

  // Move the first 4 characters to the end
  const rearranged = cleanedIBAN.slice(4) + cleanedIBAN.slice(0, 4);

  // Convert letters to numbers (A=10, B=11, ...)
  const converted = rearranged
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      return code >= 65 && code <= 90 ? code - 55 : char;
    })
    .join("");

  // Perform mod-97 operation
  let remainder = 0;
  for (let i = 0; i < converted.length; i += 7) {
    const chunk = remainder + converted.substr(i, 7);
    remainder = parseInt(chunk, 10) % 97;
  }

  return remainder === 1;
}
