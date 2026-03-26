const fs = require('fs');
const newProds = JSON.parse(fs.readFileSync('./synced-products.json', 'utf8'));

let dataStr = fs.readFileSync('./src/lib/data.ts', 'utf8');

// Find where REAL_PRODUCTS starts
const realProdIndex = dataStr.indexOf('export const REAL_PRODUCTS = [');

let topHalf = dataStr.substring(0, realProdIndex);

const syncedString = JSON.stringify(newProds, null, 2).replace(/"([a-zA-Z0-9_]+)":/g, '$1:');

let newContent = topHalf + `export const REAL_PRODUCTS = [
  { id: '7036101361736', title: 'Women\\'s Wide Leg Casual Black Pant || Hip Hop Pant', price: '280.00', category: 'Womens Archive', src: RAW_WOMEN_IMAGES[0] },
  { id: '7036101918792', title: 'Women\\'s Casual Black Straight Fit Pants', price: '280.00', category: 'Womens Archive', src: RAW_WOMEN_IMAGES[1] },
  { id: '7036101951560', title: 'Women\\'s High Waist Wide Leg Casual Pants (Light Grey)', price: '280.00', category: 'Womens Archive', src: RAW_WOMEN_IMAGES[2] },
  { id: '7036421341256', title: 'Men\\'s Caudray Fabric Stylish Pants (Grey, Pack of 1)', price: '250.00', category: 'Mens Archive', src: RAW_MEN_IMAGES[0] },
  { id: '7036421439560', title: 'Men\\'s Dark Green Loose Fit Corduroy Cargo Style Trouser', price: '250.00', category: 'Mens Archive', src: RAW_MEN_IMAGES[1] },
  { id: '7036421505096', title: 'Men\\'s Brown Loose Fit Corduroy Cargo Style Trouser', price: '250.00', category: 'Mens Archive', src: RAW_MEN_IMAGES[2] },
  { id: '7036457713736', title: 'Men\\'s Brown Loose Fit Corduroy Cargo Style Trouser (Copy)', price: '250.00', category: 'Mens Archive', src: RAW_MEN_IMAGES[3] },
  ...${syncedString}
];

export const MEN_COLLECTION = REAL_PRODUCTS.filter(p => p.category === 'Mens Archive' || (p.category === 'Uncategorized' && p.title.includes('Men')));

export const WOMEN_COLLECTION = REAL_PRODUCTS.filter(p => p.category === 'Womens Archive' || (p.category === 'Uncategorized' && p.title.includes('Women')));

export const ALL_PRODUCTS = [...MEN_COLLECTION, ...WOMEN_COLLECTION];
`;

fs.writeFileSync('./src/lib/data.ts', newContent);
console.log('Saved to data.ts!');
