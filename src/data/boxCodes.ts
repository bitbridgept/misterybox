import { v4 as uuidv4 } from 'uuid';

export interface BoxCode {
  code: string;
  type: 'basic' | 'premium';
  used: boolean;
  createdAt: string;
}

// Fixed box codes
export const boxCodes: BoxCode[] = [
  {
    code: 'BASIC-12345678',
    type: 'basic',
    used: false,
    createdAt: new Date().toISOString()
  },
  {
    code: 'BASIC-87654321',
    type: 'basic',
    used: false,
    createdAt: new Date().toISOString()
  },
  {
    code: 'BASIC-11223344',
    type: 'basic',
    used: false,
    createdAt: new Date().toISOString()
  },
  {
    code: 'BASIC-44332211',
    type: 'basic',
    used: false,
    createdAt: new Date().toISOString()
  },
  {
    code: 'PREMIUM-ABCD1234',
    type: 'premium',
    used: false,
    createdAt: new Date().toISOString()
  },
  {
    code: 'PREMIUM-1234ABCD',
    type: 'premium',
    used: false,
    createdAt: new Date().toISOString()
  },
  {
    code: 'PREMIUM-WXYZ9876',
    type: 'premium',
    used: false,
    createdAt: new Date().toISOString()
  },
  {
    code: 'PREMIUM-9876WXYZ',
    type: 'premium',
    used: false,
    createdAt: new Date().toISOString()
  }
];

export const validateBoxCode = (code: string): BoxCode | null => {
  const boxCode = boxCodes.find(bc => bc.code === code && !bc.used);
  return boxCode || null;
};

// Function to mark a box code as used
export const markBoxCodeAsUsed = (code: string): void => {
  const boxCode = boxCodes.find(bc => bc.code === code);
  if (boxCode) {
    boxCode.used = true;
  }
};

// Function to get all valid box codes
export const getValidBoxCodes = (): BoxCode[] => {
  return boxCodes.filter(bc => !bc.used);
};