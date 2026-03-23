import { mkdir, copyFile, writeFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import {
  KNOWLEDGE_DIR, KNOWY_CONFIG, CORE_FILES, SUBDIRS,
  PACKAGE_ROOT, VERSION
} from './constants.js';

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

export async function scaffoldKnowledge(projectRoot, language = 'en') {
  const knowledgeDir = join(projectRoot, KNOWLEDGE_DIR);
  const report = { created: [], skipped: [] };

  // Create .knowledge/ and subdirectories
  await mkdir(knowledgeDir, { recursive: true });
  for (const sub of SUBDIRS) {
    await mkdir(join(knowledgeDir, sub), { recursive: true });
  }

  // Copy core files from language-specific templates (never overwrite)
  for (const file of CORE_FILES) {
    const dest = join(knowledgeDir, file);
    if (await exists(dest)) {
      report.skipped.push(file);
    } else {
      // Try language-specific template first, fallback to English
      let src = join(PACKAGE_ROOT, 'templates', language, `${file}.tmpl`);
      if (!await exists(src)) {
        src = join(PACKAGE_ROOT, 'templates', 'en', `${file}.tmpl`);
      }
      await copyFile(src, dest);
      report.created.push(file);
    }
  }

  // Create .knowy.json
  const configPath = join(projectRoot, KNOWY_CONFIG);
  if (await exists(configPath)) {
    report.skipped.push(KNOWY_CONFIG);
  } else {
    await writeFile(configPath, JSON.stringify({
      version: VERSION,
      language,
      createdAt: new Date().toISOString(),
      tools: []
    }, null, 2) + '\n');
    report.created.push(KNOWY_CONFIG);
  }

  return report;
}
