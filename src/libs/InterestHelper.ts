

export class InterestHelper {

  /*
  Calculate FV. 
  Exact same Excel FV function
  Rate is the interest rate per period.
  Nper is the total number of payment periods in an annuity.
  Pmt is the payment made each period; it cannot change over the life of the annuity. Pmt must be entered as a negative number.
  Pv is the present value, or the lump-sum amount that a series of future payments is worth right now. If pv is omitted, it is assumed to be 0 (zero). PV must be entered as a negative number.
  Type is the number 0 or 1 and indicates when payments are due. If type is omitted, it is assumed to be 0 which represents at the end of the period.  If payments are due at the beginning of the period, type should be 1.
  */
  public static FV(interestRate: number, nPeriods: number, payment: number, PV: number, type = 0) {
    var pow = Math.pow(1 + interestRate, nPeriods),
      fv;

    PV = PV || 0;
    type = type || 0;

    if (interestRate) {
      fv = (payment * (1 + interestRate * type) * (1 - pow) / interestRate) - PV * pow;
    } else {
      fv = -1 * (PV + payment * nPeriods);
    }
    return fv;
  }

}