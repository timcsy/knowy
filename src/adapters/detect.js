import { access, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { TOOL_REGISTRY } from './registry.js';

async function checkDetect(projectRoot, check) {
  const fullPath = join(projectRoot, check.path);
  try {
    const s = await stat(fullPath);
    if (check.type === 'file') return s.isFile();
    if (check.type === 'dir') return s.isDirectory();
    return false;
  } catch {
    return false;
  }
}

/**
 * Scan the project for installed AI/spec tools.
 * Returns { detected: string[], available: string[] }
 *   detected  — tool ids whose config files exist
 *   available — all tool ids that could be selected
 */
export async function detectTools(projectRoot) {
  const detected = [];

  for (const tool of TOOL_REGISTRY) {
    if (tool.detect.length === 0) continue;
    for (const check of tool.detect) {
      if (await checkDetect(projectRoot, check)) {
        detected.push(tool.id);
        break;
      }
    }
  }

  const available = TOOL_REGISTRY.map(t => t.id);
  return { detected, available };
}
