function validate_cpf(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf === '') return false;

    if (
        cpf === '00000000000' ||
        cpf === '11111111111' ||
        cpf === '22222222222' ||
        cpf === '33333333333' ||
        cpf === '44444444444' ||
        cpf === '55555555555' ||
        cpf === '66666666666' ||
        cpf === '77777777777' ||
        cpf === '88888888888' ||
        cpf === '99999999999'
    ) {
        return false;
    }

    if (cpf.length !== 11) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i), 10) * (10 - i);
    }
    let remainder = 11 - (sum % 11);
    const digit1 = remainder === 10 || remainder === 11 ? 0 : remainder;

    if (digit1 !== parseInt(cpf.charAt(9), 10)) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i), 10) * (11 - i);
    }
    remainder = 11 - (sum % 11);
    const digit2 = remainder === 10 || remainder === 11 ? 0 : remainder;

    if (digit2 !== parseInt(cpf.charAt(10), 10)) return false;

    return true;
}

function validate_cnpj(cnpj: string): boolean {
    const cleanCNPJ = cnpj.replace(/[^\d]/g, '');

    if (cleanCNPJ.length !== 14) return false;

    if (/^(\d)\1+$/.test(cleanCNPJ)) return false;

    const calculateDV = (base: string, weights: number[]): number => {
        const sum = base
            .split('')
            .map((num, idx) => parseInt(num, 10) * weights[idx])
            .reduce((acc, curr) => acc + curr, 0);

        const remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    };

    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    const base1 = cleanCNPJ.slice(0, 12);
    const dv1 = calculateDV(base1, weights1);

    const base2 = cleanCNPJ.slice(0, 12) + dv1.toString();
    const dv2 = calculateDV(base2, weights2);

    return cleanCNPJ === base1 + dv1.toString() + dv2.toString();
}

function validate_cns(cns: string): boolean {
    // Validation routine for Numbers that start with 1 or 2:
    cns = cns.replace(/\s/g, '');

    if (cns.trim().length !== 15) {
        return false;
    }

    let sum = 0;
    let remainder: number;
    let digit: number;
    let result = '';

    const pis = cns.substring(0, 11);

    for (let i = 0; i < 11; i++) {
        sum += parseInt(pis.charAt(i), 10) * (15 - i);
    }

    remainder = sum % 11;
    digit = 11 - remainder;

    if (digit === 11) {
        digit = 0;
    }

    if (digit === 10) {
        sum = 0;
        for (let i = 0; i < 11; i++) {
            sum += parseInt(pis.charAt(i), 10) * (15 - i);
        }
        remainder = sum % 11;
        digit = 11 - remainder;
        result = `${pis}001${digit.toString()}`;
    } else {
        result = `${pis}000${digit.toString()}`;
    }

    return cns === result;
}
function validate_cns_prov(cns: string): boolean {
    // Validation routine for Numbers that start with 7, 8 or 9:
    if (cns.trim().length !== 15) {
        return false;
    }

    let sum = 0;

    for (let i = 0; i < 15; i++) {
        sum += parseInt(cns.charAt(i), 10) * (15 - i);
    }

    const remainder: number = sum % 11;

    return remainder === 0;
}

function validate_nis(nis: string): boolean {
    nis = nis.replace(/[^\d]/g, '');

    if (nis.length !== 11) return false;

    const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    let sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(nis.charAt(i), 10) * weights[i];
    }

    let result = 11 - (sum % 11);
    if (result === 10 || result === 11) {
        result = 0;
    }

    const checkDigit = parseInt(nis.charAt(10), 10);
    return result === checkDigit;
}

const isValidBirthDate = (date: Date): boolean => {
    const today = new Date();
    const limit = new Date();
    limit.setFullYear(limit.getFullYear() - 130); // Subtrai 130 anos da data atual
    return date <= today && date >= limit;
};

function validateName(name: string): boolean {
    if (name.length < 3) {
        return false;
    }
    if (name.split(' ').length === 1) {
        return false;
    }
    name = name.replace(/\s+/g, ' ');
    name = name.toUpperCase();
    if (!/^[A-ZÁÀÃÂÉÈẼÊÍÌĨÎÓÒÕÔÚÙŨÛÇ'\s]+$/.test(name)) {
        return false;
    }
    const terms = name.split(' ');
    if (terms[0].length === 1 && terms[1].length === 1) {
        return false;
    }
    if (terms.length === 2 && terms[0].length === 2 && terms[1].length === 2) {
        return false;
    }
    return true;
}

function validateCEP(cep: string) {
    return cep.match(/^[0-9]{5}-[0-9]{3}$/);
}
function validatePhone(phone: string) {
    return phone.match(/^(\d{1,2})\s\d{4,5}-\d{4}/);
}

const passwordRequirements = [
    { regex: /.{8,}/, message: 'A senha deve ter pelo menos 8 caracteres' },
    {
        regex: /[a-z]/,
        message: 'A senha deve conter pelo menos 1 letra minúscula',
    },
    {
        regex: /[A-Z]/,
        message: 'A senha deve conter pelo menos 1 letra maiúscula',
    },
    { regex: /[0-9]/, message: 'A senha deve conter pelo menos 1 número' },
    {
        regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/,
        message: 'A senha deve conter pelo menos 1 caractere especial',
    },
];

export {
    validate_cpf,
    validate_cnpj,
    validate_cns,
    validate_cns_prov,
    validate_nis,
    isValidBirthDate,
    validateName,
    validateCEP,
    validatePhone,
    passwordRequirements,
};
