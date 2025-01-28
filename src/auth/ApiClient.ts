const root_url = "https://btt.hesto2.com";
export const getUser = async (
  credential: string
): Promise<{ email: string }> => {
  const result = await fetch(makeRoute("/me", credential));
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
