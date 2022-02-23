export const runSimulation = async (
  input: string,
  params: RunSimulationParams
) => {
  const model = parse(input);
  console.debug("Parsed input", JSON.stringify(model, null, 2));

  const result = run(model, params);
  console.info("Run Result", JSON.stringify(result, null, 2));

  return toOutput(result);
};

const toOutput = (result: ReturnType<typeof run>) => {
  return result.foo.map((x) => x).join("\n");
};

const parse = (input: string): Model => {
  return {
    some: input
      .split("\n")
      .filter(Boolean)
      .map((row, i) => ({ row, i })),
  };
};

const run = (model: Model, {}: RunSimulationParams) => {
  const time = 10;

  const bar = Array(time)
    .fill("")
    .map((_, i) => i + 1)
    .reduce((prev, curr) => ({ ...prev, [`time ${curr}`]: curr }), {});

  const result = { bar, foo: model.some.map((x) => x.row) };
  return result;
};

interface RunSimulationParams {}

interface Model {
  some: {
    row: string;
  }[];
}
