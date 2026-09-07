import { cpSync, existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve, relative } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'dist');
const manifest = resolve(root, '.pages-files.json');
if (!existsSync(resolve(output, 'index.html'))) throw new Error('Lancer astro build avant de préparer GitHub Pages.');
const files = readdirSync(output, { recursive: true, withFileTypes: true }).filter(e => e.isFile()).map(e => relative(output, resolve(e.parentPath, e.name))).sort();
const protectedPaths = ['src', 'public', 'scripts', 'docs', '.git', '.github', '.openai', 'node_modules', 'package.json', 'package-lock.json', 'astro.config.mjs', 'README.md', 'CLAUDE.md', 'tsconfig.json'];
function safePath(path) {
  const target = resolve(root, path);
  if (!target.startsWith(root + '/') || protectedPaths.some(p => path === p || path.startsWith(p + '/'))) throw new Error(`Chemin de publication invalide : ${path}`);
  return target;
}
const previous = existsSync(manifest) ? JSON.parse(readFileSync(manifest, 'utf8')) : [];
for (const path of previous) if (!files.includes(path)) rmSync(safePath(path), { force: true });
for (const path of files) cpSync(resolve(output, path), safePath(path), { recursive: true });
writeFileSync(resolve(root, '.nojekyll'), '');
writeFileSync(manifest, JSON.stringify(files, null, 2) + '\n');
console.log(`${files.length} fichiers préparés à la racine pour GitHub Pages.`);
