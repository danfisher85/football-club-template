// Assembles the pages in src/pages into dist/ and copies images and scripts next to them.
// Pages pull in shared pieces with <!-- @include path key="value" -->; {{key}} in the included
// file is replaced by the value, and a value may itself be a {{key}} passed on from further out.
// No dependencies: `node build.mjs`, or `node build.mjs --watch` (which also runs the Tailwind CLI in watch mode).
import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync, watch } from 'node:fs';
import { spawn } from 'node:child_process';
import { join } from 'node:path';

const SRC = 'src';
const DIST = 'dist';
const INCLUDE = /<!--\s*@include\s+(\S+)((?:\s+[a-z-]+="[^"]*")*)\s*-->/g;

function render(file, vars = {}, depth = 0) {
  if (depth > 10) throw new Error(`Includes nested too deep at ${file}`);
  const html = readFileSync(join(SRC, file), 'utf8').replace(INCLUDE, (_, path, attrs) => {
    const local = { ...vars };
    for (const [, key, value] of attrs.matchAll(/([a-z-]+)="([^"]*)"/g)) local[key] = value;
    return render(path, local, depth + 1);
  });
  return html.replace(/\{\{([a-z-]+)\}\}/g, (_, key) => vars[key] ?? '');
}

function build() {
  mkdirSync(join(DIST, 'assets'), { recursive: true });
  // Start from a clean set of pages, so a page removed from src/pages disappears from dist too.
  for (const old of readdirSync(DIST).filter((f) => f.endsWith('.html'))) rmSync(join(DIST, old));
  for (const page of readdirSync(join(SRC, 'pages')).filter((f) => f.endsWith('.html'))) {
    writeFileSync(join(DIST, page), render(join('pages', page)));
  }
  cpSync(join(SRC, 'img'), join(DIST, 'assets', 'img'), { recursive: true });
  cpSync(join(SRC, 'js'), join(DIST, 'assets', 'js'), { recursive: true });
  console.log(`Built ${new Date().toLocaleTimeString()}`);
}

build();

if (process.argv.includes('--watch')) {
  let timer;
  watch(SRC, { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(build, 100);
  });
  spawn('npx', ['tailwindcss', '-i', 'src/css/input.css', '-o', 'dist/assets/css/style.css', '--watch'], { stdio: 'inherit', shell: true });
}
