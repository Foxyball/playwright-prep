import { test, expect } from "@playwright/test";

// Note: Ask Toni where are secrets stored, and how to use them in tests. Is it in an .env file ?

test("Simple API request", { tag: "@api-example" }, async ({ request }) => {
  const response = await apiLogin(request);

  expect(response.ok()).toBeTruthy();

  // get the body of the response
  const data = await response.json();
  console.log(data);

  expect(data.Title).toBe("Spider-Man: Brand New Day");
  expect(data.Genre).toContain("Action");

  // just testing if statements
  data.Metascore > 50
    ? console.log("Metascore is greater than 50")
    : console.log("Metascore is less than or equal to 50");
});

/**
 * T0D0: the key should be hidden, but this is an open source, so whatever
 * @param {string} request
 * @returns {string} response
 */
// get movies for 2026
function apiLogin(request) {
  const API_KEY = "6d66bad6";
  const baseUrl = "http://www.omdbapi.com/?apikey=" + API_KEY + "&y=2026&t=spider man";

  return request.get(baseUrl);
}
