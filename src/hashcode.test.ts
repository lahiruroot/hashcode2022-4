import { promises } from "fs";

export const hello = async (value: number) => {
  const result = await promises.readFile(__dirname + "/input.txt", "utf8");
  await promises.writeFile(__dirname + "/output.txt", "this is some output");
  console.debug(result);
  return value * 2;
};

describe("Cool", () => {
  it("Is cool", async () => {
    const result = await hello(2);

    expect(result).toBe(4);
  });
});
