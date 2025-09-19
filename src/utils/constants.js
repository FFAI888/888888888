// src/utils/constants.js  v0.14
export const TOKENS = [
  { name: "USDT", address: "0x55d398326f99059ff775485246999027b3197955", decimals: 18 },
  { name: "CRC", address: "0x5b2fe2b06e714b7bea4fd35b428077d850c48087", decimals: 18 },
  { name: "RongChain", address: "0x0337a015467af6605c4262d9f02a3dcd8b576f7e", decimals: 18 },
];

export const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)"
];
