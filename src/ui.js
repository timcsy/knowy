import { createInterface } from 'node:readline';
import { t } from './i18n.js';

function createRL() {
  return createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

function question(rl, prompt) {
  return new Promise(resolve => rl.question(prompt, resolve));
}

/**
 * Ask a yes/no question. Returns true for yes.
 */
export async function confirm(message, defaultYes = true) {
  const rl = createRL();
  const hint = defaultYes ? '(Y/n)' : '(y/N)';
  const answer = await question(rl, `${message} ${hint} `);
  rl.close();
  const a = answer.trim().toLowerCase();
  if (a === '') return defaultYes;
  return a === 'y' || a === 'yes';
}

/**
 * Multi-select from a list of choices.
 * choices: [{ id, name, checked }]
 * Returns array of selected ids.
 */
export async function multiSelect(message, choices, lang = 'en') {
  const rl = createRL();
  const selected = new Set(choices.filter(c => c.checked).map(c => c.id));

  console.log(`\n${message}`);

  for (let i = 0; i < choices.length; i++) {
    const mark = selected.has(choices[i].id) ? '◉' : '◯';
    console.log(`  ${mark} ${i + 1}. ${choices[i].name}`);
  }

  const togglePrompt = t(lang, 'ui.toggle');
  const answer = await question(rl, `\n${togglePrompt}`);
  rl.close();

  const input = answer.trim();
  if (input === '') return [...selected];

  const nums = input.split(/[,\s]+/).map(Number).filter(n => !isNaN(n));
  for (const n of nums) {
    const idx = n - 1;
    if (idx >= 0 && idx < choices.length) {
      const id = choices[idx].id;
      if (selected.has(id)) selected.delete(id);
      else selected.add(id);
    }
  }

  return [...selected];
}

/**
 * Single-select from a list of choices. Returns selected id.
 */
export async function select(message, choices) {
  const rl = createRL();

  console.log(`\n${message}`);
  for (let i = 0; i < choices.length; i++) {
    const marker = choices[i].checked ? '→' : ' ';
    console.log(`  ${marker} ${i + 1}. ${choices[i].name}`);
  }

  const answer = await question(rl, `\n> `);
  rl.close();

  const num = parseInt(answer.trim(), 10);
  if (num >= 1 && num <= choices.length) {
    return choices[num - 1].id;
  }

  // Default to checked item or first item
  const defaultChoice = choices.find(c => c.checked) || choices[0];
  return defaultChoice.id;
}
