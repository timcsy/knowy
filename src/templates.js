import { readdir, copyFile, mkdir, access } from 'node:fs/promises';
import { join } from 'node:path';
import { KNOWLEDGE_DIR, TEMPLATES_DIR, PACKAGE_ROOT } from './constants.js';

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

export async function installTemplates(projectRoot, language = 'en') {
  const destDir = join(projectRoot, KNOWLEDGE_DIR, TEMPLATES_DIR);
  await mkdir(destDir, { recursive: true });

  const installed = [];

  // Install language-specific templates, fallback to English
  let srcDir = join(PACKAGE_ROOT, 'templates', language);
  if (!await exists(srcDir)) {
    srcDir = join(PACKAGE_ROOT, 'templates', 'en');
  }

  const files = await readdir(srcDir);
  for (const file of files) {
    if (!file.endsWith('.tmpl')) continue;
    await copyFile(join(srcDir, file), join(destDir, file));
    installed.push(file);
  }

  return installed;
}
