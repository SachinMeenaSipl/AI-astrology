/**
 * Numerology Service
 * Calculates numerology numbers and their meanings
 */
class NumerologyService {
  constructor() {
    this.numberMeanings = {
      1: {
        name: 'The Leader',
        traits: 'Independent, ambitious, pioneering, confident',
        career: 'Leadership roles, entrepreneurship, innovation',
        challenges: 'Ego, dominance, impatience',
        lucky: { colors: ['Red', 'Orange'], days: ['Sunday'], gemstones: ['Ruby'] }
      },
      2: {
        name: 'The Peacemaker',
        traits: 'Diplomatic, sensitive, cooperative, intuitive',
        career: 'Counseling, mediation, partnerships, teamwork',
        challenges: 'Over-sensitivity, indecisiveness, dependency',
        lucky: { colors: ['White', 'Cream'], days: ['Monday'], gemstones: ['Pearl', 'Moonstone'] }
      },
      3: {
        name: 'The Creative',
        traits: 'Expressive, optimistic, creative, social',
        career: 'Arts, communication, entertainment, writing',
        challenges: 'Scattered energy, superficiality, exaggeration',
        lucky: { colors: ['Yellow', 'Gold'], days: ['Thursday'], gemstones: ['Yellow Sapphire'] }
      },
      4: {
        name: 'The Builder',
        traits: 'Practical, disciplined, hardworking, stable',
        career: 'Construction, organization, management, systems',
        challenges: 'Rigidity, stubbornness, resistance to change',
        lucky: { colors: ['Blue', 'Grey'], days: ['Saturday', 'Sunday'], gemstones: ['Blue Sapphire'] }
      },
      5: {
        name: 'The Adventurer',
        traits: 'Freedom-loving, versatile, adaptable, curious',
        career: 'Travel, sales, media, variety-based work',
        challenges: 'Restlessness, impulsiveness, lack of focus',
        lucky: { colors: ['Green', 'Light colors'], days: ['Wednesday'], gemstones: ['Emerald'] }
      },
      6: {
        name: 'The Nurturer',
        traits: 'Responsible, caring, harmonious, artistic',
        career: 'Teaching, healthcare, hospitality, arts',
        challenges: 'Over-responsibility, worry, perfectionism',
        lucky: { colors: ['Pink', 'Blue'], days: ['Friday'], gemstones: ['Diamond', 'Opal'] }
      },
      7: {
        name: 'The Seeker',
        traits: 'Analytical, spiritual, introspective, intuitive',
        career: 'Research, spirituality, technology, analysis',
        challenges: 'Isolation, skepticism, aloofness',
        lucky: { colors: ['Purple', 'Violet'], days: ['Monday'], gemstones: ['Cat\'s Eye'] }
      },
      8: {
        name: 'The Achiever',
        traits: 'Ambitious, authoritative, successful, material',
        career: 'Business, finance, authority, executive roles',
        challenges: 'Materialism, workaholism, control issues',
        lucky: { colors: ['Black', 'Dark Blue'], days: ['Saturday'], gemstones: ['Blue Sapphire'] }
      },
      9: {
        name: 'The Humanitarian',
        traits: 'Compassionate, idealistic, generous, universal',
        career: 'Social work, healing, teaching, philanthropy',
        challenges: 'Emotional intensity, martyrdom, impracticality',
        lucky: { colors: ['Red', 'Crimson'], days: ['Tuesday'], gemstones: ['Red Coral'] }
      }
    };
  }

  /**
   * Calculate Life Path Number
   */
  calculateLifePath(dateOfBirth) {
    const date = new Date(dateOfBirth);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    
    const sum = this.reduceToSingleDigit(day) + 
                this.reduceToSingleDigit(month) + 
                this.reduceToSingleDigit(year);
    
    return this.reduceToSingleDigit(sum);
  }

  /**
   * Calculate Destiny Number (from name)
   */
  calculateDestiny(fullName) {
    const letterValues = {
      'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
      'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
      'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
    };
    
    let sum = 0;
    const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, '');
    
    for (const char of cleanName) {
      sum += letterValues[char] || 0;
    }
    
    return this.reduceToSingleDigit(sum);
  }

  /**
   * Calculate Personality Number (from consonants)
   */
  calculatePersonality(fullName) {
    const consonants = 'BCDFGHJKLMNPQRSTVWXYZ';
    const letterValues = {
      'B': 2, 'C': 3, 'D': 4, 'F': 6, 'G': 7, 'H': 8,
      'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'P': 7, 'Q': 8, 'R': 9,
      'S': 1, 'T': 2, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
    };
    
    let sum = 0;
    const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, '');
    
    for (const char of cleanName) {
      if (consonants.includes(char)) {
        sum += letterValues[char] || 0;
      }
    }
    
    return this.reduceToSingleDigit(sum);
  }

  /**
   * Calculate Soul Urge Number (from vowels)
   */
  calculateSoulUrge(fullName) {
    const vowels = 'AEIOU';
    const letterValues = {
      'A': 1, 'E': 5, 'I': 9, 'O': 6, 'U': 3
    };
    
    let sum = 0;
    const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, '');
    
    for (const char of cleanName) {
      if (vowels.includes(char)) {
        sum += letterValues[char] || 0;
      }
    }
    
    return this.reduceToSingleDigit(sum);
  }

  /**
   * Calculate Birth Day Number
   */
  calculateBirthDay(dateOfBirth) {
    const date = new Date(dateOfBirth);
    const day = date.getDate();
    return this.reduceToSingleDigit(day);
  }

  /**
   * Calculate Maturity Number
   */
  calculateMaturity(lifePath, destiny) {
    return this.reduceToSingleDigit(lifePath + destiny);
  }

  /**
   * Reduce number to single digit (handle master numbers)
   */
  reduceToSingleDigit(num) {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = num.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
    }
    return num;
  }

  /**
   * Get complete numerology report
   */
  generateNumerologyReport(dateOfBirth, fullName) {
    const lifePath = this.calculateLifePath(dateOfBirth);
    const destiny = this.calculateDestiny(fullName);
    const personality = this.calculatePersonality(fullName);
    const soulUrge = this.calculateSoulUrge(fullName);
    const birthDay = this.calculateBirthDay(dateOfBirth);
    const maturity = this.calculateMaturity(lifePath, destiny);
    
    return {
      coreNumbers: {
        lifePath: {
          number: lifePath,
          meaning: this.numberMeanings[lifePath] || this.numberMeanings[this.reduceToSingleDigit(lifePath)],
          description: 'Your life purpose and the path you are meant to walk'
        },
        destiny: {
          number: destiny,
          meaning: this.numberMeanings[destiny] || this.numberMeanings[this.reduceToSingleDigit(destiny)],
          description: 'Your ultimate goal and what you are working toward'
        },
        personality: {
          number: personality,
          meaning: this.numberMeanings[personality] || this.numberMeanings[this.reduceToSingleDigit(personality)],
          description: 'How others perceive you'
        },
        soulUrge: {
          number: soulUrge,
          meaning: this.numberMeanings[soulUrge] || this.numberMeanings[this.reduceToSingleDigit(soulUrge)],
          description: 'Your inner desires and motivations'
        },
        birthDay: {
          number: birthDay,
          meaning: this.numberMeanings[birthDay] || this.numberMeanings[this.reduceToSingleDigit(birthDay)],
          description: 'Special talents and abilities you were born with'
        },
        maturity: {
          number: maturity,
          meaning: this.numberMeanings[maturity] || this.numberMeanings[this.reduceToSingleDigit(maturity)],
          description: 'The person you will become in your mature years'
        }
      },
      luckyElements: this.getLuckyElements(lifePath, destiny),
      compatibilityNumbers: this.getCompatibleNumbers(lifePath),
      yearForecast: this.calculatePersonalYear(dateOfBirth),
      recommendations: this.getRecommendations(lifePath, destiny)
    };
  }

  /**
   * Get lucky elements
   */
  getLuckyElements(lifePath, destiny) {
    const primary = this.numberMeanings[lifePath] || this.numberMeanings[this.reduceToSingleDigit(lifePath)];
    const secondary = this.numberMeanings[destiny] || this.numberMeanings[this.reduceToSingleDigit(destiny)];
    
    return {
      colors: [...new Set([...primary.lucky.colors, ...secondary.lucky.colors])],
      days: [...new Set([...primary.lucky.days, ...secondary.lucky.days])],
      gemstones: [...new Set([...primary.lucky.gemstones, ...secondary.lucky.gemstones])]
    };
  }

  /**
   * Get compatible numbers
   */
  getCompatibleNumbers(lifePath) {
    const compatibility = {
      1: [1, 3, 5, 9],
      2: [2, 4, 6, 8],
      3: [1, 3, 5, 9],
      4: [2, 4, 6, 8],
      5: [1, 3, 5, 7, 9],
      6: [2, 4, 6, 8, 9],
      7: [5, 7, 9],
      8: [2, 4, 6, 8],
      9: [1, 3, 5, 6, 9]
    };
    
    return compatibility[lifePath] || [];
  }

  /**
   * Calculate Personal Year
   */
  calculatePersonalYear(dateOfBirth) {
    const date = new Date(dateOfBirth);
    const currentYear = new Date().getFullYear();
    const birthMonth = date.getMonth() + 1;
    const birthDay = date.getDate();
    
    const sum = this.reduceToSingleDigit(birthDay) + 
                this.reduceToSingleDigit(birthMonth) + 
                this.reduceToSingleDigit(currentYear);
    
    const personalYear = this.reduceToSingleDigit(sum);
    
    return {
      year: currentYear,
      personalYear: personalYear,
      theme: this.getPersonalYearTheme(personalYear)
    };
  }

  /**
   * Get Personal Year theme
   */
  getPersonalYearTheme(personalYear) {
    const themes = {
      1: 'New Beginnings - Time to start fresh and take initiative',
      2: 'Patience & Partnerships - Focus on cooperation and relationships',
      3: 'Creativity & Expression - Time for creative pursuits and socializing',
      4: 'Building & Foundation - Focus on hard work and establishing stability',
      5: 'Change & Freedom - Embrace change and new experiences',
      6: 'Responsibility & Service - Focus on family and community',
      7: 'Introspection & Spirituality - Time for inner reflection and growth',
      8: 'Achievement & Success - Focus on career and material goals',
      9: 'Completion & Letting Go - Time to finish projects and release the old'
    };
    
    return themes[personalYear] || '';
  }

  /**
   * Get recommendations
   */
  getRecommendations(lifePath, destiny) {
    return {
      career: 'Focus on careers that align with your life path number strengths',
      relationships: 'Seek partners with compatible numerology numbers',
      health: 'Balance your energies through meditation and proper rest',
      finances: 'Invest wisely according to your favorable days and periods',
      spirituality: 'Develop your intuitive abilities and spiritual awareness'
    };
  }
}

module.exports = new NumerologyService();
