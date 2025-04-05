import path from "path";

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(" --file ")}`;

const config = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand, "prettier --write"],
  "*.{json,md,yml,yaml}": ["prettier --write"],
};

export default config;
