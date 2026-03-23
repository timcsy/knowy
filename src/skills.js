import { readdir, copyFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { SKILLS_SOURCE, SKILLS_TARGET, SKILL_NAMES } from './constants.js';

/**
 * Install Claude Code skills into the project.
 * Always overwrites (managed files).
 */
export async function installSkills(projectRoot) {
  const installed = [];

  for (const name of SKILL_NAMES) {
    const srcDir = join(SKILLS_SOURCE, name);
    const destDir = join(projectRoot, SKILLS_TARGET, name);
    await mkdir(destDir, { recursive: true });

    const skillFile = 'SKILL.md';
    await copyFile(join(srcDir, skillFile), join(destDir, skillFile));
    installed.push(name);
  }

  return installed;
}
