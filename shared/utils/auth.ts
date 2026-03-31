export interface Token {
  access_token: string;
  expires_in: number;
  refresh_token: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export const getToken = (credentials: Credentials) => {
  return $fetch<Token>(`/api/login`, {
    method: "POST",
    body: {
      email: credentials.email,
      password: credentials.password,
    },
  });
};

export interface User {
  id: number | string;
  name: string;
  email: string;
}

export const getUser = (token: string) => {
  return $fetch<{ data: User }>(`/api/login`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
};

// 判斷 token 是否過期
export const isExpired = (second = 0) => {
  return Date.now() > second;
};

// token 的生命週期 => 一週
export const getExpiredAt = (second: number = 7 * 86400) => {
  return Date.now() + second * 1000;
};
