const basicFetchOptions = {
  method: "GET",
  credentials: "include",
};

export const deleteOptions = {
  method: "DELETE",
  credentials: "include",
};

export const getPostOptions = (body) => ({
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export const getPatchOptions = (body) => ({
  method: "PATCH",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export const fetchHandler = async (url, options = basicFetchOptions) => {
  try {
    const res = await fetch(url, options);
    if (!res.ok)
      return [null, { status: res.status, statusText: res.statusText }];
    if (res.status === 204) return [true, null];

    const data = await res.json();
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

export const formatTimestamp = (timestamp) => {
  const currentDate = new Date();
  const requestDate = new Date(timestamp);
  const timeDiff = currentDate - requestDate;

  const minutes = Math.floor(timeDiff / (1000 * 60));
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  }

  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  return `${days} day${days !== 1 ? "s" : ""} ago`;
};
