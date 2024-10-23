export const FetchCartsByIdUser = async (setCarts, user_token) => {
  try {
    if (!user_token) {
      return;
    }
    const response = await fetch(`http://localhost:5050/carts/cartUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user_token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.data) {
      setCarts(data.data);
    } else {
      console.warn("No data found:", data);
    }
  } catch (error) {
    console.error("Error fetching API:", error);
  }
};
