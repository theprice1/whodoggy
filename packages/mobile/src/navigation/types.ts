// packages/mobile/src/navigation/types.ts

export type RootStackParamList = {
  // other screens...
  QRCodeScanner: undefined; // no params for scanner itself
  SearchMicrochip: { microchipId: string };
};
