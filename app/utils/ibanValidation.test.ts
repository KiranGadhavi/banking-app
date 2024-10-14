import { validateIBAN } from "./ibanValidation";

describe("IBAN Validation", () => {
  test("validates correct IBAN", () => {
    expect(validateIBAN("DE89 3704 0044 0532 0130 00")).toBeTruthy();
    expect(validateIBAN("GB29NWBK60161331926819")).toBeTruthy();
    expect(validateIBAN("SA03 8000 0000 6080 1016 7519")).toBeTruthy();
  });

  test("rejects incorrect IBAN", () => {
    expect(validateIBAN("DE89 3704 0044 0532 0130 01")).toBeFalsy();
    expect(validateIBAN("GB29NWBK60161331926818")).toBeFalsy();
    expect(validateIBAN("SA03 8000 0000 6080 1016 7518")).toBeFalsy();
  });

  test("handles edge cases", () => {
    expect(validateIBAN("")).toBeFalsy();
    expect(validateIBAN("123456789")).toBeFalsy();
    expect(validateIBAN("ABCDEFGHIJKLMNOP")).toBeFalsy();
  });
});
