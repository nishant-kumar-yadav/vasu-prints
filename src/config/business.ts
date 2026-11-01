export const PLACEHOLDER = '__PLACEHOLDER__' as const;

export const business = {
  brandName: 'VasuPrint',
  legalName: PLACEHOLDER, // e.g. "VasuPrint" sole proprietorship / Pvt Ltd name
  ownerNames: [PLACEHOLDER],
  phoneDisplay: PLACEHOLDER, // "+91 98xxxxxx10"
  phoneE164: PLACEHOLDER, // "+9198xxxxxx10"
  whatsappE164: PLACEHOLDER, // digits only for wa.me, e.g. "9198xxxxxx10"
  email: PLACEHOLDER, // public business email
  address: {
    line1: PLACEHOLDER,
    line2: '',
    city: PLACEHOLDER,
    state: PLACEHOLDER,
    pin: PLACEHOLDER,
    country: 'India',
  },
  mapsUrl: PLACEHOLDER,
  gstin: PLACEHOLDER,
  businessHours: PLACEHOLDER, // "Mon–Sat, 10:00–19:00 IST"
  jurisdictionCity: PLACEHOLDER, // courts for Terms §governing law
} as const;
