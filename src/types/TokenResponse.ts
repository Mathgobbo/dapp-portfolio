import { TokenMetadataResponse } from "alchemy-sdk";

export type TokenResponse = TokenMetadataResponse & { balance: string };
