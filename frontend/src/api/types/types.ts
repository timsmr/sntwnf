export type UserInfo = {
  name: string;
  username: string;
  preferences: string;
  password: string;
};

export type LobbyInfo = {
  name: string;
};

export type HostInfo = {
  lobby: string;
  user: number | null;
  is_host: boolean;
};

export type GivingToResp = {
  id: number;
  username: string;
  name: string;
  preferences: string;
};
