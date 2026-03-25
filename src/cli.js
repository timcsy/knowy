import { VERSION } from './constants.js';
import { resolveLanguage, detectLanguage, normalizeLanguage, t } from './i18n.js';

function buildHelp(lang) {
  return `
knowy v${VERSION} — ${t(lang, 'cli.help.tagline')}

${t(lang, 'cli.help.usage')}:
  knowy <command>

${t(lang, 'cli.help.commands')}:
  init        ${t(lang, 'cli.help.init')}
  update      ${t(lang, 'cli.help.update')}
  setup-mcp   ${t(lang, 'cli.help.setupMcp')}

${t(lang, 'cli.help.options')}:
  --help, -h       ${t(lang, 'cli.help.help')}
  --version, -v    ${t(lang, 'cli.help.version')}
`.trim();
}

export async function run(args) {
  const cmd = args[0];
  const lang = await resolveLanguage(process.cwd()).catch(() => normalizeLanguage(detectLanguage()));

  if (!cmd || cmd === '--help' || cmd === '-h') {
    console.log(buildHelp(lang));
    return;
  }

  if (cmd === '--version' || cmd === '-v') {
    console.log(VERSION);
    return;
  }

  if (cmd === 'init') {
    const { init } = await import('./commands/init.js');
    await init(process.cwd());
    return;
  }

  if (cmd === 'update') {
    const { update } = await import('./commands/update.js');
    await update(process.cwd());
    return;
  }

  if (cmd === 'setup-mcp') {
    const { setupMcp } = await import('./commands/setup-mcp.js');
    await setupMcp();
    return;
  }

  const unknownMsg = t(lang, 'cli.unknownCommand');
  console.error(typeof unknownMsg === 'function' ? unknownMsg(cmd) : `Unknown command: ${cmd}`);
  console.log(buildHelp(lang));
  process.exitCode = 1;
}
