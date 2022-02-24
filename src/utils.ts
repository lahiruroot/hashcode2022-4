import { promises } from "fs";
import { resolve } from "path";

export const readFile = (fileName: string) =>
  promises.readFile(resolve(__dirname, `../inputs/${fileName}`), "utf8");

export const writeFile = (result: string, fileName = "output") =>
  promises.writeFile(resolve(__dirname, `../results/${fileName}`), result);

const formatOutputSection = (header: string, testName: string) =>
  `======== ${header}: ${testName} ============\n`;

export const printHeader = (header: string, testName: string) =>
  process.stdout.write(formatOutputSection(header, testName));
