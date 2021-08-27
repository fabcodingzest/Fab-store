export const validatePositiveNumber = (val: unknown): true | string => {
  if (val) {
    const str = val.toString();
    const regex = /^[+]?[0-9]+$/g;
    const isNonDecimalPositiveInteger = regex.test(str);
    if (isNonDecimalPositiveInteger) return true;
    return 'The quantity should only be an integer and less than 10!';
  }
};
