export type ToolMeta = {
  slug: string;
  country: 'uk' | 'usa' | 'canada' | 'australia' | 'germany';
  flag: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  calculatorType: 'income' | 'salary' | 'vat' | 'capital-gains' | 'province' | 'self-employed' | 'super' | 'gst';
  inputs: { id: string; label: string; type: 'number' | 'select'; options?: string[]; placeholder?: string; prefix?: string }[];
  faqs: { q: string; a: string }[];
  relatedSlugs: string[];
};

export const TOOLS: ToolMeta[] = [
  {
    slug: 'uk-income-tax-calculator',
    country: 'uk', flag: '🇬🇧',
    title: 'UK Income Tax Calculator',
    metaTitle: 'UK Income Tax Calculator 2025 — Free & Accurate',
    metaDescription: 'Calculate your UK income tax for 2025/26. Enter your salary and instantly see your tax, National Insurance, and take-home pay broken down.',
    h1: 'UK Income Tax Calculator 2025/26',
    intro: 'Find out exactly how much income tax and National Insurance you pay on your salary. Enter your gross annual income below and get an instant, detailed breakdown — including your monthly take-home pay.',
    calculatorType: 'income',
    inputs: [
      { id: 'grossSalary', label: 'Annual Gross Salary', type: 'number', placeholder: '50000', prefix: '£' },
      { id: 'taxYear', label: 'Tax Year', type: 'select', options: ['2025/26', '2024/25'] },
    ],
    faqs: [
      { q: 'How accurate is this UK income tax calculator?', a: 'This calculator uses the official HMRC tax bands and National Insurance rates for 2025/26. It gives a very close estimate for most employees. It does not account for pension contributions, student loan repayments, or other deductions.' },
      { q: 'What is the personal allowance for 2025/26?', a: 'The standard personal allowance is £12,570. This is the amount of income you can earn before paying income tax. It starts to reduce if your income exceeds £100,000.' },
      { q: 'Do I pay National Insurance on my full salary?', a: 'No. You only pay National Insurance on earnings above the Primary Threshold, which is £12,570 per year in 2025/26.' },
      { q: 'What are the UK income tax bands for 2025?', a: 'Basic rate (20%) applies on income between £12,571 and £50,270. Higher rate (40%) applies between £50,271 and £125,140. Additional rate (45%) applies on income over £125,140.' },
      { q: 'Is this calculator free to use?', a: 'Yes, completely free. No registration required.' },
    ],
    relatedSlugs: ['uk-salary-after-tax-calculator', 'uk-vat-calculator'],
  },
  {
    slug: 'uk-salary-after-tax-calculator',
    country: 'uk', flag: '🇬🇧',
    title: 'UK Salary After Tax Calculator',
    metaTitle: 'UK Salary After Tax Calculator 2025 — Take-Home Pay',
    metaDescription: 'See your exact UK take-home pay for 2025/26. Calculates income tax, National Insurance, and shows your monthly and weekly net salary.',
    h1: 'UK Salary After Tax Calculator 2025',
    intro: 'Enter your annual salary and discover exactly what you take home each month and week after income tax and National Insurance deductions.',
    calculatorType: 'salary',
    inputs: [
      { id: 'grossSalary', label: 'Annual Gross Salary', type: 'number', placeholder: '35000', prefix: '£' },
    ],
    faqs: [
      { q: 'What is take-home pay?', a: 'Take-home pay is your salary after income tax and National Insurance have been deducted. It is the amount that actually lands in your bank account each month.' },
      { q: 'How is monthly take-home calculated?', a: 'Your annual net salary is divided by 12 to give the monthly figure. The calculator assumes you are paid the same amount each month.' },
      { q: 'Does the calculator include pension deductions?', a: 'No — pension contributions are not included as these vary by employer and personal choice. Your actual take-home may be lower if you contribute to a pension.' },
    ],
    relatedSlugs: ['uk-income-tax-calculator', 'uk-vat-calculator'],
  },
  {
    slug: 'uk-vat-calculator',
    country: 'uk', flag: '🇬🇧',
    title: 'UK VAT Calculator',
    metaTitle: 'UK VAT Calculator 2025 — Add or Remove VAT Instantly',
    metaDescription: 'Add or remove UK VAT from any price. Supports standard (20%), reduced (5%), and zero rates. Free and instant.',
    h1: 'UK VAT Calculator 2025',
    intro: 'Calculate VAT on any amount — add VAT to a net price or remove it from a gross price. Choose your rate: standard (20%), reduced (5%), or zero.',
    calculatorType: 'vat',
    inputs: [
      { id: 'amount', label: 'Amount', type: 'number', placeholder: '100', prefix: '£' },
      { id: 'vatRate', label: 'VAT Rate', type: 'select', options: ['20% Standard', '5% Reduced', '0% Zero'] },
      { id: 'direction', label: 'Calculate', type: 'select', options: ['Add VAT', 'Remove VAT'] },
    ],
    faqs: [
      { q: 'What is the standard UK VAT rate?', a: 'The standard VAT rate in the UK is 20%. This applies to most goods and services.' },
      { q: 'What is the reduced VAT rate?', a: 'The reduced rate is 5% and applies to certain goods and services including home energy, children\'s car seats, and some health products.' },
      { q: 'How do I remove VAT from a price?', a: 'To remove 20% VAT, divide the gross price by 1.20. For 5% VAT, divide by 1.05. Our calculator does this automatically.' },
    ],
    relatedSlugs: ['uk-income-tax-calculator', 'uk-salary-after-tax-calculator'],
  },
  {
    slug: 'us-federal-income-tax-calculator',
    country: 'usa', flag: '🇺🇸',
    title: 'US Federal Income Tax Calculator',
    metaTitle: 'US Federal Income Tax Calculator 2025 — Free & Accurate',
    metaDescription: 'Calculate your US federal income tax for 2025. Enter your salary and filing status to see your bracket, effective rate, and take-home pay.',
    h1: 'US Federal Income Tax Calculator 2025',
    intro: 'Calculate your federal income tax based on your gross salary and filing status. Includes Social Security, Medicare (FICA), and shows your complete tax breakdown.',
    calculatorType: 'income',
    inputs: [
      { id: 'grossSalary', label: 'Annual Gross Income', type: 'number', placeholder: '75000', prefix: '$' },
      { id: 'filingStatus', label: 'Filing Status', type: 'select', options: ['single', 'marriedFilingJointly'] },
    ],
    faqs: [
      { q: 'What is the standard deduction for 2025?', a: 'For 2025, the standard deduction is $14,600 for single filers and $29,200 for married filing jointly.' },
      { q: 'What is FICA tax?', a: 'FICA stands for Federal Insurance Contributions Act. It includes Social Security tax (6.2% up to $168,600) and Medicare tax (1.45% of all wages).' },
      { q: 'What is the difference between effective and marginal tax rate?', a: 'Your marginal rate is the rate on your last dollar of income. Your effective rate is the average rate on all income. The effective rate is almost always lower.' },
    ],
    relatedSlugs: ['us-take-home-pay-calculator', 'us-capital-gains-tax-calculator'],
  },
  {
    slug: 'us-take-home-pay-calculator',
    country: 'usa', flag: '🇺🇸',
    title: 'US Take-Home Pay Calculator',
    metaTitle: 'US Take-Home Pay Calculator 2025 — Salary After Tax',
    metaDescription: 'See your US take-home pay for 2025. Calculates federal income tax, Social Security, Medicare, and shows your monthly net salary.',
    h1: 'US Take-Home Pay Calculator 2025',
    intro: 'Enter your annual salary to see exactly what lands in your bank account after federal income tax, Social Security, and Medicare deductions.',
    calculatorType: 'salary',
    inputs: [
      { id: 'grossSalary', label: 'Annual Gross Salary', type: 'number', placeholder: '60000', prefix: '$' },
      { id: 'filingStatus', label: 'Filing Status', type: 'select', options: ['single', 'marriedFilingJointly'] },
    ],
    faqs: [
      { q: 'Does this include state income tax?', a: 'No, this calculator only covers federal income tax and FICA. State income tax varies significantly — from 0% in states like Texas and Florida to over 13% in California.' },
      { q: 'What percentage of my paycheck goes to taxes?', a: 'For most Americans earning $50,000–$100,000, the effective federal tax rate (including FICA) is typically 20–28%.' },
    ],
    relatedSlugs: ['us-federal-income-tax-calculator', 'us-capital-gains-tax-calculator'],
  },
  {
    slug: 'us-capital-gains-tax-calculator',
    country: 'usa', flag: '🇺🇸',
    title: 'US Capital Gains Tax Calculator',
    metaTitle: 'US Capital Gains Tax Calculator 2025 — Long & Short Term',
    metaDescription: 'Calculate US capital gains tax for 2025. Find your long-term (0%, 15%, or 20%) or short-term rate based on your income and filing status.',
    h1: 'US Capital Gains Tax Calculator 2025',
    intro: 'Calculate the tax you owe on investment gains. Long-term gains (held over 1 year) are taxed at 0%, 15%, or 20% depending on your total income. Short-term gains are taxed as ordinary income.',
    calculatorType: 'capital-gains',
    inputs: [
      { id: 'gainAmount', label: 'Capital Gain Amount', type: 'number', placeholder: '20000', prefix: '$' },
      { id: 'ordinaryIncome', label: 'Other Ordinary Income', type: 'number', placeholder: '60000', prefix: '$' },
      { id: 'holdingPeriod', label: 'Holding Period', type: 'select', options: ['Long-term (over 1 year)', 'Short-term (1 year or less)'] },
      { id: 'filingStatus', label: 'Filing Status', type: 'select', options: ['single', 'marriedFilingJointly'] },
    ],
    faqs: [
      { q: 'What is long-term capital gains tax?', a: 'Long-term capital gains apply to assets held for more than one year. The rates are 0%, 15%, or 20% depending on your taxable income and filing status.' },
      { q: 'What is short-term capital gains tax?', a: 'Short-term gains apply to assets held one year or less. They are taxed at your ordinary income tax rate, which can be as high as 37%.' },
    ],
    relatedSlugs: ['us-federal-income-tax-calculator', 'us-take-home-pay-calculator'],
  },
  {
    slug: 'canada-income-tax-calculator',
    country: 'canada', flag: '🇨🇦',
    title: 'Canada Income Tax Calculator',
    metaTitle: 'Canada Income Tax Calculator 2025 — Federal + Ontario',
    metaDescription: 'Calculate your Canadian income tax for 2025. Includes federal tax, Ontario provincial tax, CPP, and EI contributions.',
    h1: 'Canada Income Tax Calculator 2025',
    intro: 'Calculate your federal and provincial income tax in Canada. This calculator covers federal tax, Ontario provincial tax, Canada Pension Plan (CPP), and Employment Insurance (EI) for 2025.',
    calculatorType: 'income',
    inputs: [
      { id: 'grossSalary', label: 'Annual Gross Income', type: 'number', placeholder: '75000', prefix: 'CA$' },
      { id: 'province', label: 'Province', type: 'select', options: ['ontario'] },
    ],
    faqs: [
      { q: 'How does Canadian income tax work?', a: 'Canada has a federal income tax and each province has its own income tax. The rates are progressive — you pay higher percentages as your income rises.' },
      { q: 'What is the basic personal amount for 2025?', a: 'The federal basic personal amount for 2025 is $15,705. This reduces your federal tax owing.' },
      { q: 'What is CPP?', a: 'The Canada Pension Plan (CPP) is mandatory. Employees contribute 5.95% of earnings between $3,500 and $68,500.' },
    ],
    relatedSlugs: ['canada-take-home-pay-calculator', 'canada-ontario-tax-calculator'],
  },
  {
    slug: 'canada-take-home-pay-calculator',
    country: 'canada', flag: '🇨🇦',
    title: 'Canada Take-Home Pay Calculator',
    metaTitle: 'Canada Take-Home Pay Calculator 2025 — Salary After Tax',
    metaDescription: 'See your Canadian take-home pay for 2025. Includes federal tax, Ontario provincial tax, CPP, and EI deductions.',
    h1: 'Canada Take-Home Pay Calculator 2025',
    intro: 'See exactly what you take home after all deductions — federal income tax, Ontario provincial tax, CPP, and EI. Includes monthly breakdown.',
    calculatorType: 'salary',
    inputs: [
      { id: 'grossSalary', label: 'Annual Gross Salary', type: 'number', placeholder: '65000', prefix: 'CA$' },
    ],
    faqs: [
      { q: 'What deductions come out of a Canadian paycheque?', a: 'Standard deductions include federal income tax, provincial income tax, Canada Pension Plan (CPP) contributions, and Employment Insurance (EI) premiums.' },
    ],
    relatedSlugs: ['canada-income-tax-calculator', 'canada-ontario-tax-calculator'],
  },
  {
    slug: 'canada-ontario-tax-calculator',
    country: 'canada', flag: '🇨🇦',
    title: 'Ontario Income Tax Calculator',
    metaTitle: 'Ontario Income Tax Calculator 2025 — Provincial + Federal',
    metaDescription: 'Calculate Ontario income tax for 2025. Shows both federal and Ontario provincial tax rates with full breakdown.',
    h1: 'Ontario Income Tax Calculator 2025',
    intro: 'Calculate your combined federal and Ontario provincial income tax for 2025. Ontario has five tax brackets — this calculator shows exactly how much you pay at each level.',
    calculatorType: 'province',
    inputs: [
      { id: 'grossSalary', label: 'Annual Gross Income', type: 'number', placeholder: '80000', prefix: 'CA$' },
    ],
    faqs: [
      { q: 'What are the Ontario income tax rates for 2025?', a: 'Ontario has five brackets: 5.05% up to $51,446; 9.15% up to $102,894; 11.16% up to $150,000; 12.16% up to $220,000; 13.16% above.' },
      { q: 'Does Ontario have a surtax?', a: 'Yes. Ontario charges a surtax if your Ontario tax exceeds $5,554 (20% surtax) or $7,108 (36% surtax on the excess).' },
    ],
    relatedSlugs: ['canada-income-tax-calculator', 'canada-take-home-pay-calculator'],
  },
  {
    slug: 'australia-income-tax-calculator',
    country: 'australia', flag: '🇦🇺',
    title: 'Australia Income Tax Calculator',
    metaTitle: 'Australia Income Tax Calculator 2024-25 — Free & Accurate',
    metaDescription: 'Calculate your Australian income tax for 2024-25. See your income tax, Medicare levy, LITO offset, and take-home pay instantly.',
    h1: 'Australia Income Tax Calculator 2024-25',
    intro: 'Calculate your Australian income tax, Medicare levy, and Low Income Tax Offset for 2024-25. Includes employer superannuation contributions.',
    calculatorType: 'income',
    inputs: [
      { id: 'grossSalary', label: 'Annual Gross Income', type: 'number', placeholder: '85000', prefix: 'A$' },
    ],
    faqs: [
      { q: 'What is the tax-free threshold in Australia?', a: 'The tax-free threshold is $18,200. If you earn less than this, you pay no income tax.' },
      { q: 'What is the Medicare levy?', a: 'The Medicare levy is a 2% tax on your taxable income. It funds Australia\'s public health system.' },
      { q: 'What is the Low Income Tax Offset (LITO)?', a: 'LITO is a tax reduction for lower earners. The maximum offset is $700 for income up to $37,500, phasing out at $45,000.' },
    ],
    relatedSlugs: ['australia-take-home-pay-calculator', 'australia-superannuation-calculator'],
  },
  {
    slug: 'australia-take-home-pay-calculator',
    country: 'australia', flag: '🇦🇺',
    title: 'Australia Take-Home Pay Calculator',
    metaTitle: 'Australia Take-Home Pay Calculator 2024-25 — Salary After Tax',
    metaDescription: 'See your Australian take-home pay for 2024-25. Includes income tax, Medicare levy, LITO, and monthly net salary.',
    h1: 'Australia Take-Home Pay Calculator 2024-25',
    intro: 'Find out exactly how much you take home after income tax and the Medicare levy. Includes your monthly net pay and employer superannuation.',
    calculatorType: 'salary',
    inputs: [
      { id: 'grossSalary', label: 'Annual Gross Salary', type: 'number', placeholder: '70000', prefix: 'A$' },
    ],
    faqs: [
      { q: 'Does superannuation reduce my take-home pay?', a: 'No. Employer superannuation contributions (11.5%) are paid on top of your salary and do not reduce your take-home pay.' },
    ],
    relatedSlugs: ['australia-income-tax-calculator', 'australia-superannuation-calculator'],
  },
  {
    slug: 'australia-superannuation-calculator',
    country: 'australia', flag: '🇦🇺',
    title: 'Australia Superannuation Calculator',
    metaTitle: 'Australia Superannuation Calculator 2024-25 — Employer Super',
    metaDescription: 'Calculate your Australian superannuation for 2024-25. Find your employer super contributions at 11.5%.',
    h1: 'Australia Superannuation Calculator 2024-25',
    intro: 'Calculate your superannuation contributions for 2024-25. The employer superannuation guarantee is 11.5% — find out how much super your employer contributes.',
    calculatorType: 'super',
    inputs: [
      { id: 'grossSalary', label: 'Annual Gross Salary', type: 'number', placeholder: '80000', prefix: 'A$' },
    ],
    faqs: [
      { q: 'What is the superannuation rate for 2024-25?', a: 'The Superannuation Guarantee (SG) rate for 2024-25 is 11.5%.' },
      { q: 'What is the concessional contributions cap?', a: 'The concessional contributions cap for 2024-25 is $30,000, including employer and salary-sacrifice contributions.' },
    ],
    relatedSlugs: ['australia-income-tax-calculator', 'australia-take-home-pay-calculator'],
  },
  {
    slug: 'germany-income-tax-calculator',
    country: 'germany', flag: '🇩🇪',
    title: 'Germany Income Tax Calculator',
    metaTitle: 'Germany Income Tax Calculator 2025 — Einkommensteuer',
    metaDescription: 'Calculate your German income tax (Einkommensteuer) for 2025. Includes solidarity surcharge, health, pension, and unemployment insurance.',
    h1: 'Germany Income Tax Calculator 2025',
    intro: 'Calculate your German income tax using the official progressive formula for 2025. Includes solidarity surcharge and social security contributions.',
    calculatorType: 'income',
    inputs: [
      { id: 'grossSalary', label: 'Annual Gross Income', type: 'number', placeholder: '60000', prefix: '€' },
      { id: 'hasChildren', label: 'Have Children?', type: 'select', options: ['No', 'Yes'] },
    ],
    faqs: [
      { q: 'How is German income tax calculated?', a: 'Germany uses a progressive formula — tax increases gradually from 14% at €11,785 to 42% at €66,761 and 45% above €277,826.' },
      { q: 'What is the solidarity surcharge?', a: 'The Solidaritätszuschlag is an additional 5.5% tax on income tax. Since 2021, most taxpayers are exempt — only those with income tax above €18,130 pay it.' },
      { q: 'What social contributions does Germany have?', a: 'German employees pay pension insurance (9.3%), health insurance (7.3% + 1.8%), unemployment insurance (1.3%), and nursing care insurance (1.7%).' },
    ],
    relatedSlugs: ['germany-take-home-pay-calculator', 'germany-vat-calculator'],
  },
  {
    slug: 'germany-take-home-pay-calculator',
    country: 'germany', flag: '🇩🇪',
    title: 'Germany Take-Home Pay Calculator',
    metaTitle: 'Germany Take-Home Pay Calculator 2025 — Nettolohn',
    metaDescription: 'Calculate your German Nettolohn for 2025. Shows income tax, solidarity surcharge, and all social insurance deductions.',
    h1: 'Germany Take-Home Pay Calculator 2025 (Nettolohn)',
    intro: 'See your German net salary (Nettolohn) after all deductions — income tax, solidarity surcharge, pension, health, unemployment, and nursing care insurance.',
    calculatorType: 'salary',
    inputs: [
      { id: 'grossSalary', label: 'Annual Gross Salary', type: 'number', placeholder: '55000', prefix: '€' },
      { id: 'hasChildren', label: 'Have Children?', type: 'select', options: ['No', 'Yes'] },
    ],
    faqs: [
      { q: 'What is a typical German tax rate?', a: 'For a single person earning €50,000, the effective combined rate is typically 35–40%. Take-home is around €30,000–€32,500 per year.' },
    ],
    relatedSlugs: ['germany-income-tax-calculator', 'germany-vat-calculator'],
  },
  {
    slug: 'germany-vat-calculator',
    country: 'germany', flag: '🇩🇪',
    title: 'Germany VAT Calculator',
    metaTitle: 'Germany VAT Calculator 2025 — Mehrwertsteuer',
    metaDescription: 'Calculate German VAT (Mehrwertsteuer) for 2025. Add or remove 19% standard or 7% reduced VAT from any price.',
    h1: 'Germany VAT Calculator 2025 (Mehrwertsteuer)',
    intro: 'Add or remove German VAT (Mehrwertsteuer) from any price. Germany\'s standard VAT rate is 19%, with a reduced rate of 7% for food, books, and public transport.',
    calculatorType: 'vat',
    inputs: [
      { id: 'amount', label: 'Amount', type: 'number', placeholder: '100', prefix: '€' },
      { id: 'vatRate', label: 'VAT Rate', type: 'select', options: ['19% Standard', '7% Reduced'] },
      { id: 'direction', label: 'Calculate', type: 'select', options: ['Add VAT', 'Remove VAT'] },
    ],
    faqs: [
      { q: 'What is the German VAT rate?', a: 'Germany has two VAT rates: the standard rate of 19% applies to most goods. The reduced rate of 7% applies to food, books, newspapers, and public transport.' },
    ],
    relatedSlugs: ['germany-income-tax-calculator', 'germany-take-home-pay-calculator'],
  },
];

export const COUNTRIES = [
  { id: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
  { id: 'usa', name: 'United States', flag: '🇺🇸' },
  { id: 'canada', name: 'Canada', flag: '🇨🇦' },
  { id: 'australia', name: 'Australia', flag: '🇦🇺' },
  { id: 'germany', name: 'Germany', flag: '🇩🇪' },
] as const;
