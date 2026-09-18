/**
 * Rest Easy Cleaning Co. - Live Estimate Engine
 * Provides transparent, instant estimate calculations with frequency discounts.
 */

const EstimateCalculator = {
  // Home pricing parameters
  homeRates: {
    baseRate: 95,
    perBedroom: 25,
    perBathroom: 35,
    serviceMultiplier: {
      standard: 1.0,
      deep: 1.45,
      move: 1.65
    },
    frequencyDiscount: {
      'one-time': 0,
      'weekly': 0.20,
      'biweekly': 0.15,
      'monthly': 0.10
    }
  },

  // Office pricing parameters
  officeRates: {
    sizeRates: {
      small: 135,     // Under 1,000 sq ft
      medium: 220,    // 1,000 - 2,500 sq ft
      large: 340,     // 2,500 - 5,000 sq ft
      xlarge: 490     // 5,000+ sq ft
    },
    perRestroom: 35,
    serviceMultiplier: {
      standard: 1.0,
      deep: 1.4,
      turnover: 1.25
    },
    frequencyDiscount: {
      'one-time': 0,
      'weekly': 0.20,
      'biweekly': 0.15,
      'monthly': 0.10
    }
  },

  /**
   * Calculates estimated range for home cleaning
   */
  calculateHome(bedrooms, bathrooms, serviceType, frequency) {
    const beds = parseInt(bedrooms, 10) || 1;
    const baths = parseInt(bathrooms, 10) || 1;
    const sType = this.homeRates.serviceMultiplier[serviceType] ? serviceType : 'standard';
    const freq = this.homeRates.frequencyDiscount[frequency] !== undefined ? frequency : 'biweekly';

    const subtotal = this.homeRates.baseRate + 
      (beds * this.homeRates.perBedroom) + 
      (baths * this.homeRates.perBathroom);

    const adjustedSubtotal = subtotal * this.homeRates.serviceMultiplier[sType];
    const discount = this.homeRates.frequencyDiscount[freq];
    const finalPerVisit = adjustedSubtotal * (1 - discount);

    const minEstimate = Math.round(finalPerVisit * 0.95);
    const maxEstimate = Math.round(finalPerVisit * 1.10);

    const discountPercent = Math.round(discount * 100);

    return {
      type: 'home',
      minPrice: minEstimate,
      maxPrice: maxEstimate,
      discountPercent: discountPercent,
      frequencyLabel: this.getFrequencyLabel(freq)
    };
  },

  /**
   * Calculates estimated range for office cleaning
   */
  calculateOffice(sqftTier, restrooms, serviceType, frequency) {
    const tier = this.officeRates.sizeRates[sqftTier] ? sqftTier : 'small';
    const baths = parseInt(restrooms, 10) || 1;
    const sType = this.officeRates.serviceMultiplier[serviceType] ? serviceType : 'standard';
    const freq = this.officeRates.frequencyDiscount[frequency] !== undefined ? frequency : 'biweekly';

    const baseSizePrice = this.officeRates.sizeRates[tier];
    const restroomPrice = baths * this.officeRates.perRestroom;
    const subtotal = (baseSizePrice + restroomPrice) * this.officeRates.serviceMultiplier[sType];

    const discount = this.officeRates.frequencyDiscount[freq];
    const finalPerVisit = subtotal * (1 - discount);

    const minEstimate = Math.round(finalPerVisit * 0.95);
    const maxEstimate = Math.round(finalPerVisit * 1.12);
    const discountPercent = Math.round(discount * 100);

    return {
      type: 'office',
      minPrice: minEstimate,
      maxPrice: maxEstimate,
      discountPercent: discountPercent,
      frequencyLabel: this.getFrequencyLabel(freq)
    };
  },

  getFrequencyLabel(freq) {
    switch (freq) {
      case 'weekly': return 'Weekly (20% Off)';
      case 'biweekly': return 'Every 2 Weeks (15% Off)';
      case 'monthly': return 'Monthly (10% Off)';
      case 'one-time': default: return 'One-Time Visit';
    }
  }
};
