import fs from 'node:fs';

const commitMsgFile = process.argv[2];
if (!commitMsgFile) {
  process.exit(0);
}

const msg = fs.readFileSync(commitMsgFile, 'utf8').trim();

// Skip automated or merge commits
if (msg.startsWith('Merge ') || msg.startsWith('Revert ')) {
  process.exit(0);
}

const pattern =
  /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([a-zA-Z0-9_\-.]+\))?: .{1,100}/;

if (!pattern.test(msg)) {
  console.error('\n❌ Invalid commit message format.');
  console.error('Commit messages must follow Conventional Commits:');
  console.error('  <type>(<scope>): <subject>');
  console.error('Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert');
  console.error(`Received:\n  ${msg}\n`);
  process.exit(1);
}
