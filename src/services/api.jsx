const BASE_URL = "http://localhost:8080";

export const apiFetch = async (url, options = {}) => {
  const response = await fetch(BASE_URL + url, {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer TOKEN` (future JWT)
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error("API Error");
  }



  if (response.status === 204) {
    console.log("This will never run"); 
    return null;
   
  }

  const text = await response.text();
  if (!text) {
    return null;
  }

  return JSON.parse(text);

};
