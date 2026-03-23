import { VERSION } from './constants.js';

const HELP = `
knowy v${VERSION} — Give your AI a structured project brain

Usage:
  knowy <command>

Commands:
  init        Scaffold .knowledge/ structure and connect AI tools
  update      Update skills, templates, and tool connections
  setup-mcp   Configure MCP server for your AI tool

Options:
  --help, -h       Show this help message
  --version, -v    Show version number
`.trim();

export async function run(args) {
  const cmd = args[0];

  if (!cmd || cmd === '--help' || cmd === '-h') {
    console.log(HELP);
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

  console.error(`Unknown command: ${cmd}`);
  console.log(HELP);
  process.exitCode = 1;
}
