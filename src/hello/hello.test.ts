import { hello } from "hello/hello";

describe("Cool", () => {
  it("Is cool", async () => {
    const result = await hello(2);

    expect(result).toBe(4);
  });
});
