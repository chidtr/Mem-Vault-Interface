const ACCESS_TOKEN = "access_token";
const EXPIRE = "expire";

const getUserInfo = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/info`, {
    method: "get",
    headers: {
      authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  });

  return await res.json();
};

const getSpaces = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/spaces`, {
    method: "get",
    headers: {
      authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  });

  return await res.json();
};

export { getUserInfo, ACCESS_TOKEN, EXPIRE, getSpaces };
