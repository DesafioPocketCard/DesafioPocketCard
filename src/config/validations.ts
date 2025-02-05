function validateCheckDigit(document: string, length: number, baseWeight: number): boolean {
  const digit = parseInt(document.charAt(length));
  const numbers = document.substring(0, length);

  let sum = 0;
  let weight = baseWeight;

  for (let i = 0; i < length; i++) {
    sum += parseInt(numbers.charAt(i)) * weight--;
    if (weight < 2) weight = 9; // Specific rule for CNPJ
  }

  const result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  return result === digit;
}

function validateCNPJ(cnpj: string): boolean {
  const repeatedRegex = /^(\d)\1+$/;
  const cleanerRegex = /[^\d]+/g;
  const cleanedCNPJ = cnpj.replace(cleanerRegex, '');

  if (cleanedCNPJ.length !== 14) return false;

  if (repeatedRegex.test(cleanedCNPJ)) return false;

  return validateCheckDigit(cleanedCNPJ, 12, 5) && validateCheckDigit(cleanedCNPJ, 13, 6);
}

function validateCPF(cnpj: string): boolean {
  const repeatedRegex = /^(\d)\1+$/;
  const cleanerRegex = /[^\d]+/g;
  const cleanedCPF = cnpj.replace(cleanerRegex, '');

  if (cleanedCPF.length !== 11) return false;

  if (repeatedRegex.test(cleanedCPF)) return false;

  return validateCheckDigit(cleanedCPF, 9, 10) && validateCheckDigit(cleanedCPF, 10, 11);
}

function validateCEP(cep: string) {
  return cep.match(/^[0-9]{5}-[0-9]{3}$/) || cep.match(/^[0-9]{8}/);
}

function validatePhone(phone: string) {
  return phone.match(/^\(\d{2}\)\s9\d{4}-\d{4}$/);
}

export { validateCNPJ, validateCPF, validateCEP, validatePhone };
