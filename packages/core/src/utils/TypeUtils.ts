export type CaipAddress = `${string}:${string}:${string}`;

export type CaipNetworkId = `${string}:${string}`;

export interface CaipNetwork {
  id: CaipNetworkId;
  name?: string;
  imageId?: string;
  imageUrl?: string;
}

export interface LinkingRecord {
  redirect: string;
  href: string;
}

export type ProjectId = string;

export type Platform = 'mobile' | 'web' | 'qrcode' | 'unsupported';

export type ConnectorType = 'EXTERNAL' | 'WALLET_CONNECT';

export interface Connector {
  id: string;
  type: ConnectorType;
  name?: string;
  imageId?: string;
  explorerId?: string;
}

export type CaipNamespaces = Record<
  string,
  {
    chains: CaipNetworkId[];
    methods: string[];
    events: string[];
  }
>;

export type SdkVersion = `react-native-${string}`;

// -- ApiController Types -------------------------------------------------------
export interface WcWallet {
  id: string;
  name: string;
  homepage?: string;
  image_id?: string;
  image_url?: string;
  order?: number;
  mobile_link?: string | null;
  desktop_link?: string | null;
  webapp_link?: string | null;
  app_store?: string | null;
  play_store?: string | null;
}

export interface ApiGetWalletsRequest {
  page: number;
  entries: number;
  search?: string;
  include?: string[];
  exclude?: string[];
}

export interface ApiGetWalletsResponse {
  data: WcWallet[];
  count: number;
}

export type ThemeMode = 'dark' | 'light';

export interface ThemeVariables {
  '--w3m-font-family'?: string;
  '--w3m-accent'?: string;
  '--w3m-color-mix'?: string;
  '--w3m-color-mix-strength'?: number;
  '--w3m-font-size-master'?: string;
  '--w3m-border-radius-master'?: string;
  '--w3m-z-index'?: number;
}

// -- BlockchainApiController Types ---------------------------------------------
export interface BlockchainApiIdentityRequest {
  caipChainId: CaipNetworkId;
  address: string;
}

export interface BlockchainApiIdentityResponse {
  avatar: string;
  name: string;
}

// -- OptionsController Types ---------------------------------------------------
export interface Token {
  address: string;
  image?: string;
}

export type Tokens = Record<CaipNetworkId, Token>;

export type CustomWallet = Pick<
  WcWallet,
  | 'id'
  | 'name'
  | 'homepage'
  | 'image_url'
  | 'mobile_link'
  | 'desktop_link'
  | 'webapp_link'
  | 'app_store'
  | 'play_store'
>;