import { readFile, writeFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { KNOWLEDGE_DIR, KNOWIE_CONFIG, VERSION } from '../constants.js';
import { scaffoldKnowledge } from '../scaffold.js';
import { installTemplates } from '../templates.js';
import { installSkills } from '../skills.js';
import { detectTools } from '../adapters/detect.js';
import { getToolById, TOOL_REGISTRY } from '../adapters/registry.js';
import { injectHandshake } from '../adapters/handshake.js';
import { confirm, multiSelect, select } from '../ui.js';
import { detectLanguage, normalizeLanguage, t } from '../i18n.js';

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

const LANGUAGE_CHOICES = [
  { id: 'en', name: 'English' },
  { id: 'zh-TW', name: '繁體中文' },
];

export async function init(projectRoot) {
  // Detect language
  const detectedLang = normalizeLanguage(detectLanguage());
  let lang = detectedLang;

  console.log(`\n🧠 knowie v${VERSION}\n`);

  // 1. Language selection
  const msg = t(lang, 'cli.init.langDetected');
  console.log(typeof msg === 'function' ? msg(lang) : msg);

  const langChoices = LANGUAGE_CHOICES.map(c => ({
    ...c,
    checked: c.id === detectedLang,
  }));
  lang = await select(t(lang, 'cli.init.selectLanguage'), langChoices);

  // 2. Check if .knowledge/ already exists
  const knowledgeExists = await exists(join(projectRoot, KNOWLEDGE_DIR));
  if (knowledgeExists) {
    console.log(t(lang, 'cli.init.exists'));
    const proceed = await confirm(t(lang, 'cli.init.continue'));
    if (!proceed) {
      console.log(t(lang, 'cli.init.aborted'));
      return;
    }
  }

  // 3. Scaffold .knowledge/
  console.log('');
  const scaffoldReport = await scaffoldKnowledge(projectRoot, lang);
  for (const f of scaffoldReport.created) console.log(t(lang, 'cli.init.created')(f));
  for (const f of scaffoldReport.skipped) console.log(t(lang, 'cli.init.skipped')(f));

  // 4. Install templates
  const templates = await installTemplates(projectRoot, lang);
  console.log(t(lang, 'cli.init.templates')(templates.length));

  // 5. Detect tools
  const { detected } = await detectTools(projectRoot);
  if (detected.length > 0) {
    const names = detected.map(id => getToolById(id)?.name).filter(Boolean);
    console.log(`\n${t(lang, 'cli.init.detected')(names.join(', '))}`);
  }

  // 6. Build selection choices
  const aiTools = TOOL_REGISTRY.filter(t => t.category === 'ai');
  const specTools = TOOL_REGISTRY.filter(t => t.category === 'spec');
  const standardTools = TOOL_REGISTRY.filter(t => t.category === 'standard');

  const choices = [
    ...standardTools.map(t => ({
      id: t.id,
      name: t.name,
      checked: true,
    })),
    ...aiTools.map(t => ({
      id: t.id,
      name: t.name,
      checked: detected.includes(t.id),
    })),
    ...specTools.map(t => ({
      id: t.id,
      name: `${t.name} (spec tool)`,
      checked: detected.includes(t.id),
    })),
  ];

  const selectedIds = await multiSelect(t(lang, 'cli.init.selectTools'), choices, lang);

  // 7. Handshake
  const handshaked = [];
  const writtenFiles = new Set();

  for (const id of selectedIds) {
    const tool = getToolById(id);
    if (!tool) continue;

    for (const target of tool.targets) {
      if (writtenFiles.has(target.file)) continue;
      const result = await injectHandshake(projectRoot, target);
      writtenFiles.add(target.file);
      const msgKey = `cli.init.handshake.${result.action}`;
      console.log(t(lang, msgKey)(result.file, tool.name));
    }
  }

  // 8. Install skills
  const skills = await installSkills(projectRoot);
  console.log(`\n${t(lang, 'cli.init.skills')(skills.length)}`);

  // 9. Update .knowie.json
  const configPath = join(projectRoot, KNOWIE_CONFIG);
  let config;
  try {
    config = JSON.parse(await readFile(configPath, 'utf-8'));
  } catch {
    config = { version: VERSION, createdAt: new Date().toISOString() };
  }
  config.version = VERSION;
  config.language = lang;
  config.tools = selectedIds;
  config.updatedAt = new Date().toISOString();
  await writeFile(configPath, JSON.stringify(config, null, 2) + '\n');

  // 10. Summary
  console.log(`\n${t(lang, 'cli.init.done')}\n`);
  console.log(`${t(lang, 'cli.init.nextStep')}\n`);
}
