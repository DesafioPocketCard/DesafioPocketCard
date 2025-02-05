import { createNumberMask } from '@/utils/mask';

const RegexOf = {
  cpf: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
  cnpj: [
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
    /\d/,
    '/',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
  ],
  cep: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  date: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  passwordCode: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
  phone: ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  price: createNumberMask({
    prefix: ['R', '$', ' '],
    separator: ',',
    delimiter: '.',
    precision: 2,
  }),
  priceOnly: createNumberMask({
    separator: ',',
    delimiter: '.',
    precision: 2,
  }),
  percentage: createNumberMask({
    prefix: ['%', ' '],
  }),
  code: [/\d/, /\d/, /\d/, /\d/],
  prefix: [/[A-Z]/],
  codeWithPrefix: [/[A-Z]/, /\d/, /\d/, /\d/, /\d/],
  start: [/[A-Z0-9]/],
};

export default RegexOf;
