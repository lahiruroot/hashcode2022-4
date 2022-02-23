import { promises } from "fs";

export const readFile = (fileName: string) =>
  promises.readFile(__dirname + `/${fileName}`, "utf8");

export const writeFile = (result: string, fileName = "output") =>
  promises.writeFile(__dirname + `/${fileName}`, result);

const formatOutputSection = (header: string, testName: string) =>
  `======== ${header}: ${testName} ============\n`;

export const printHeader = (header: string, testName: string) =>
  process.stdout.write(formatOutputSection(header, testName));
