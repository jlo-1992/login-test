type Token = {
  access_token: string;
  refresh_token: string;
};

type Credentials = {
  email: string;
  password: string;
};

export const getToken = (credentials: Credentials) => {
  return $fetch<Token>(`/api/login`, {
    method: "POST",
    body: {
      email: credentials.email,
      password: credentials.password,
    },
  });
};

interface User {
  id: number | string;
  name: string;
  email: string;
}

export const getUser = (token: string) => {
  return $fetch<User>(`/api/`, {
    method: "GET",
  });
};
