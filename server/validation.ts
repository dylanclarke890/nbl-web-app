export function validatePhone(number: string): Boolean {
  const first = number[0];
  const remainder = number.substring(1, number.length);

  if (!isAllDigits(remainder)) {
    return false;
  }

  if (first === "0" && number.length === 11) {
    return true;
  }

  if (first === "+" && number.length === 13) {
    return true;
  }

  return false;
}

export function validateEmail(email: string): Boolean {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email)) {
    return true;
  }

  return false;
}

export function validateField(
  value: string,
  minLength: number,
  maxLength = -1
): Boolean {
  if (!value) {
    return false;
  }

  if (value.length < minLength) {
    return false;
  }

  if (maxLength > -1 && value.length > maxLength) {
    return false;
  }

  return true;
}

export function isNumber(n: string): Boolean {
  return nums.includes(parseInt(n));
}

const isAllDigits = (value: string): Boolean => /^\d+$/.test(value);
const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
