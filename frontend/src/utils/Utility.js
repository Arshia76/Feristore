class Utility {
  static toEnglishDigits(str) {
    // convert persian digits [۰۱۲۳۴۵۶۷۸۹]
    let e = '۰'.charCodeAt(0);
    str = str.replace(/[۰-۹]/g, function (t) {
      return t.charCodeAt(0) - e;
    });

    // convert arabic indic digits [٠١٢٣٤٥٦٧٨٩]
    e = '٠'.charCodeAt(0);
    str = str.replace(/[٠-٩]/g, function (t) {
      return t.charCodeAt(0) - e;
    });
    return str;
  }

  static toFarsiNumber(n) {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    return n.toString().replace(/\d/g, (x) => farsiDigits[x]);
  }

  static formatMoney(number, separator = ',', decimalCount = 0) {
    let int = [];
    number = parseFloat(number).toFixed(decimalCount);
    number = number.split('.');
    const m = number[0].length % 3;
    if ([1, 2].includes(m)) int.push(number[0].slice(0, m));
    if (number[0].length > 2)
      int.push(...number[0].substr(m, number[0].length).match(/.{1,3}/g));

    return int.join(separator) + (number[1] ? '.' + number[1] : '');
  }
}

export default Utility;
