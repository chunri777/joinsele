import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const outputDirectory = path.resolve('dist/client');
const basePath = (process.env.GITHUB_PAGES_BASE_PATH ?? '').replace(/\/$/, '');

if (!basePath.startsWith('/') || basePath === '/') {
  throw new Error('GITHUB_PAGES_BASE_PATH must be a non-root path.');
}

const generatedFiles = [];

async function collectGeneratedFiles(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await collectGeneratedFiles(filePath);
    } else if (filePath.endsWith('.html') || filePath.endsWith('.rsc')) {
      generatedFiles.push(filePath);
    }
  }
}

await collectGeneratedFiles(outputDirectory);

const rootFontPath = '/_next/static/_vinext_fonts/';
const pagesFontPath = `${basePath}${rootFontPath}`;
const unprefixedFontPattern = /["'(]\/_next\/static\/_vinext_fonts\//;
let rewrittenFontReferences = 0;

for (const filePath of generatedFiles) {
  const source = await readFile(filePath, 'utf8');
  const occurrences = source.split(rootFontPath).length - 1;
  const output = source.replaceAll(rootFontPath, pagesFontPath);

  rewrittenFontReferences += occurrences;
  if (output !== source) await writeFile(filePath, output);
}

if (rewrittenFontReferences === 0) {
  throw new Error('No vinext font references were found in the static export.');
}

for (const filePath of generatedFiles) {
  const output = await readFile(filePath, 'utf8');
  if (
    unprefixedFontPattern.test(output) ||
    output.includes('"/favicon.svg"')
  ) {
    throw new Error(`Unprefixed Pages asset reference remains in ${filePath}.`);
  }
}
