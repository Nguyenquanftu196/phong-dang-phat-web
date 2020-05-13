export class CurrencyUtils {
  static formatNumber = (number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number)
  }

  static formatLabel = (label) => {
    if (parseInt(label) === 1) {
      return label + 'st'
    }
    if (parseInt(label) === 2) {
      return label + 'nd'
    }
    if (parseInt(label) === 3) {
      return label + 'rd'
    }
    return label + 'th'
  }
}