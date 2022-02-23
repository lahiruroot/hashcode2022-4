import { runSimulation } from "runSimulation";
import { readFile, writeFile, printHeader } from "./utils";

test.only("exampleInput", async () => {
  const testName = expect.getState().currentTestName;
  const input = await readFile(testName);
  printHeader("Input", testName);
  process.stdout.write(input + "\n");

  printHeader("Debug", testName);
  const result = await runSimulation(input, { apa: 0 });

  const resultName = `${testName}.Result`;
  printHeader("Result", testName);
  process.stdout.write(result + "\n");

  printHeader("End", testName);
  await writeFile(result, resultName);
});
