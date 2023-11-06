export async function fetchTasksFromServer() {
  try {
    const response = await fetch(
      "https://4f74729f-451e-4a98-843e-686bfd957549.mock.pstmn.io/tasks"
    );
    if (!response.ok) {
      throw new Error("Network response isnt okay");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}
