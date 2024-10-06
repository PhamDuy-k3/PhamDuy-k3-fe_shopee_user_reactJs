export const FetchCartsByIdUser = async (setCarts, id_user) => {
  try {
    if (!id_user) {
      return;
    }
    const response = await fetch(
      `http://localhost:5050/carts/?id_user=${id_user}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.data) {
      setCarts(data.data);
      console.log(data.data);
    } else {
      console.warn("No data found:", data);
    }
  } catch (error) {
    console.error("Error fetching API:", error);
  }
};
