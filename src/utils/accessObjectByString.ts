export default function accessObjectByString(
  object: Record<string, any>,
  inputString: string,
): any | undefined {
  if (object instanceof Object && inputString) {
    const splitedString = inputString.split('.');

    const attribute = splitedString.reduce((previous, current) => {
      if (previous) return previous[current];
      return previous;
    }, object);

    return attribute;
  }
}
