import { runSimulation } from "runSimulation";
import { readFile, writeFile, printHeader } from "./utils";

test("a_an_example.in.txt", async () => {
  const testName = expect.getState().currentTestName;
  const input = await readFile(testName);
  printHeader("Input", testName);
  //process.stdout.write(input + "\n");

  printHeader("Debug", testName);
  const result = await runSimulation(input, { apa: 0 });

  const resultName = `${testName}.Result`;
  printHeader("Result", testName);
  //process.stdout.write(result + "\n");

  printHeader("End", testName);
  await writeFile(result, resultName);
});

test("b_better_start_small.in.txt", async () => {
  const testName = expect.getState().currentTestName;
  const input = await readFile(testName);
  printHeader("Input", testName);
  //process.stdout.write(input + "\n");

  printHeader("Debug", testName);
  const result = await runSimulation(input, { apa: 0 });

  const resultName = `${testName}.Result`;
  printHeader("Result", testName);
  //process.stdout.write(result + "\n");

  printHeader("End", testName);
  await writeFile(result, resultName);
});

test("c_collaboration.in.txt", async () => {
  const testName = expect.getState().currentTestName;
  const input = await readFile(testName);
  printHeader("Input", testName);
  //process.stdout.write(input + "\n");

  printHeader("Debug", testName);
  const result = await runSimulation(input, { apa: 0 });

  const resultName = `${testName}.Result`;
  printHeader("Result", testName);
  //process.stdout.write(result + "\n");

  printHeader("End", testName);
  await writeFile(result, resultName);
});

test("d_dense_schedule.in.txt", async () => {
  const testName = expect.getState().currentTestName;
  const input = await readFile(testName);
  printHeader("Input", testName);
  //process.stdout.write(input + "\n");

  printHeader("Debug", testName);
  const result = await runSimulation(input, { apa: 0 });

  const resultName = `${testName}.Result`;
  printHeader("Result", testName);
  //process.stdout.write(result + "\n");

  printHeader("End", testName);
  await writeFile(result, resultName);
});

test("e_exceptional_skills.in.txt", async () => {
  const testName = expect.getState().currentTestName;
  const input = await readFile(testName);
  printHeader("Input", testName);
  //process.stdout.write(input + "\n");

  printHeader("Debug", testName);
  const result = await runSimulation(input, { apa: 0 });

  const resultName = `${testName}.Result`;
  printHeader("Result", testName);
  //process.stdout.write(result + "\n");

  printHeader("End", testName);
  await writeFile(result, resultName);
});

test("f_find_great_mentors.in.txt", async () => {
  const testName = expect.getState().currentTestName;
  const input = await readFile(testName);
  printHeader("Input", testName);
  //process.stdout.write(input + "\n");

  printHeader("Debug", testName);
  const result = await runSimulation(input, { apa: 0 });

  const resultName = `${testName}.Result`;
  printHeader("Result", testName);
  //process.stdout.write(result + "\n");

  printHeader("End", testName);
  await writeFile(result, resultName);
}, 30000);
