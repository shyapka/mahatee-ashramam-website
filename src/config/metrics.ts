// =====================================================
// METRICS TO UPDATE - FILL BY EVENING
// =====================================================

export const INPUT_METRICS = {
  // CHILDREN STATISTICS
  currentChildren: "100+",           // How many children currently in care?
  totalChildrenServed: "100+",       // Total children helped over the years?
  
  // ORGANIZATIONAL
  yearsOfService: "15+",             // When was Mahatee Ashramam founded?
  foundedYear: "2009",               // Exact founding year for calculations
  
  // FACILITIES & SERVICES
  careType: "24/7",                  // Round-the-clock care description
  facilityType: "24x7",              // Residential facility description
  
  // DONATION CALCULATIONS
  costPerChildPerDay: 35,            // Rupees per child per day for meals?
  costPerChildPerYear: 18000,        // Annual cost per child (education, food, shelter)?
  costPerChildPerMonth: 1500,        // Monthly cost per child?
  
  // MEAL CALCULATIONS (will auto-calculate based on children count)
  dailyMealCost: 3500,               // Total daily meal cost for all children
  monthlyMealCost: 27000,            // Total monthly meal cost for all children
  mealsPerMonth: 9000,               // Total meals served per month
  
  // IMPACT STATEMENTS
  donorFundedPercentage: "100%",     // What percentage is donor funded?
  transparencyLevel: "100%",         // Transparency claim
}

// =====================================================
// AUTO-CALCULATED VALUES (Don't edit these)
// =====================================================

export const CALCULATED_METRICS = {
  // These will be calculated from INPUT_METRICS
  get childrenCount() {
    return parseInt(INPUT_METRICS.currentChildren.replace('+', ''))
  },
  
  get dailyMealsCount() {
    return this.childrenCount * 3 // breakfast, lunch, dinner
  },
  
  get monthlyMealsCount() {
    return this.dailyMealsCount * 30
  },
  
  get costPerMeal() {
    return Math.round(INPUT_METRICS.dailyMealCost / this.dailyMealsCount)
  }
}

// =====================================================
// DISPLAY VALUES (Used in components)
// =====================================================

export const WEBSITE_METRICS = {
  children: INPUT_METRICS.currentChildren,
  years: INPUT_METRICS.yearsOfService,
  care: INPUT_METRICS.careType,
  facility: INPUT_METRICS.facilityType,
  donorFunded: INPUT_METRICS.donorFundedPercentage,
  
  // Donation amounts
  dailyMeal: INPUT_METRICS.dailyMealCost,
  childSponsor: INPUT_METRICS.costPerChildPerYear,
  monthlyMeals: INPUT_METRICS.monthlyMealCost,
  
  // Impact descriptions
  dailyMealImpact: `Feeds ${INPUT_METRICS.currentChildren} children for a full day`,
  monthlyMealImpact: `Provides ${INPUT_METRICS.mealsPerMonth}+ meals`,
  childSponsorImpact: 'Covers education, food, shelter & healthcare',
  
  // About page content
  foundingStory: `over ${INPUT_METRICS.yearsOfService.replace('+', '')} years ago`,
  currentImpact: `over ${INPUT_METRICS.currentChildren} children`,
}

// =====================================================
// DONATION OPTIONS (Used in donation pages)
// =====================================================

export const DONATION_OPTIONS = [
  {
    id: 1,
    title: 'Sponsor One Day Meal',
    amount: WEBSITE_METRICS.dailyMeal,
    description: 'Provide nutritious meals for all children for one day',
    icon: '🍽️',
    impact: WEBSITE_METRICS.dailyMealImpact
  },
  {
    id: 2,
    title: 'Sponsor a Child',
    amount: WEBSITE_METRICS.childSponsor,
    description: 'Support one child\'s complete care for an entire year',
    icon: '👶',
    impact: WEBSITE_METRICS.childSponsorImpact
  },
  {
    id: 3,
    title: 'Monthly Meals',
    amount: WEBSITE_METRICS.monthlyMeals,
    description: 'Ensure nutritious meals for all children for one month',
    icon: '🥘',
    impact: WEBSITE_METRICS.monthlyMealImpact
  },
  {
    id: 4,
    title: 'Custom Amount',
    amount: 0,
    description: 'Choose your own contribution amount',
    icon: '💝',
    impact: 'Every rupee makes a difference'
  }
]