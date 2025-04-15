const root_url = process.env.REACT_APP_API_URL || "https://btt.hesto2.com";
export interface Tokens {
  access_token: string;
  token_type: string;
  expiry_date: number;
  scope: string;
  refresh_token: string;
}

export const getUser = async (
  credential: string
): Promise<{ email: string }> => {
  const result = await fetch(makeRoute("/me", credential));
  return await result.json();
};

export const getTokens = async (code: string): Promise<Tokens> => {
  const result = await fetch(
    `${root_url}/oauth/token?code=${code}&redirect_uri=${encodeURIComponent(
      window.location.origin
    )}`
  );
  return await result.json();
};

export const refreshToken = async (refreshToken: string): Promise<Tokens> => {
  const result = await fetch(
    `${root_url}/oauth/refresh?refresh_token=${refreshToken}`
  );
  return await result.json();
};

export const setConfig = async (config: any, credential: string) => {
  await fetch(makeRoute("/config", credential), {
    method: "POST",
    body: JSON.stringify(config),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return config;
};
export const getConfig = async (credential: string): Promise<any> => {
  const result = await fetch(makeRoute("/config", credential));
  return await result.json();
};

const makeRoute = (route: string, credential: string) =>
  `${root_url}${route}?token=${credential}`;
