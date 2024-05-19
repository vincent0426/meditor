const isValidUrl = (str: string) => {
  try {
    new URL(str);
    return true;
  } catch (e) {
    return false;
  }
};

export const getUrlFromString = (str: string) => {
  if (isValidUrl(str)) {
    return str;
  } else {
    throw new Error("Invalid URL");
  }
};