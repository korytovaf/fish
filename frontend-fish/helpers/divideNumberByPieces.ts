/**
 * Делит число на разряды разделителем
 * @param x - число
 * @param delimiter - разделитель
 * @returns {string}
 */

export const divideNumberByPieces: (x: string | number, delimiter?: string) => string = (x, delimiter) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter || " ");
}
