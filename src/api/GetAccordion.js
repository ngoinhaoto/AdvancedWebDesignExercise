// https://awd-2023.azurewebsites.net/Accordions

async function GetAccordion() {
  const response = await fetch(
    "https://awd-2023.azurewebsites.net/Accordions",
    {
      headers: {
        "Content-Type": "application/json",
        "student-name": "idk",
      },
    }
  );

  const data = await response.json();

  return data;
}

export default GetAccordion;
