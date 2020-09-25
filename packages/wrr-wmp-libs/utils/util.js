export function isEqualForArray(listA, listB) {
  let equal = true;
  const length = listA.length;

  for (let i = 0; i < length; i++) {
    if (listA[i] !== listB[i]) {
      equal = false;
      break;
    }
  }

  return equal;
}
