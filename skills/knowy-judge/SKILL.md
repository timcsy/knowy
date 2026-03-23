---
name: knowy-judge
description: Cross-check knowledge files for consistency and coherence
user-invokable: true
argument-hint: "[scope: file name, file pair, or event description]"
---

# Knowy Judge

Verify that the three knowledge files (principles, vision, experience) are consistent with each other and internally coherent.

## User Input

```text
$ARGUMENTS
```

## Workflow

### 1. Read knowledge files

Read all three core files:
- `.knowledge/principles.md`
- `.knowledge/vision.md`
- `.knowledge/experience.md`

Also scan `.knowledge/research/`, `.knowledge/design/`, `.knowledge/history/` for additional context.

### 2. Determine scope

Parse `$ARGUMENTS` to decide what to check:

- **No arguments**: full check (all 11 sections below)
- **Single file** (e.g., "experience"): that file's internal coherence + its 4 directional cross-references
- **File pair** (e.g., "principles vision"): the 2 directional cross-references for that pair
- **Event description** (e.g., "just finished the auth system"): impact analysis on all three files

### 3. Execute checks

#### Internal Coherence (3 checks)

For each file, check:
- Are there contradictions within the file?
- Are sections logically ordered?
- Are there outdated or redundant entries?

#### Cross-references (6 directional checks)

Each direction asks a different question:

| Direction | Question |
|-----------|----------|
| Principles → Vision | Can the vision be derived from the principles? |
| Vision → Principles | Does the vision require principles that aren't stated? |
| Principles → Experience | Do the principles predict the patterns we've observed? |
| Experience → Principles | Does any experience challenge or extend the principles? |
| Vision → Experience | Does experience support or contradict the planned direction? |
| Experience → Vision | Are there lessons that suggest opportunities not yet in the vision? |

#### Overall (1 check)

Synthesize all findings:
- Where is the most pressure? (which file needs the most attention)
- Is the knowledge system generally healthy or in need of significant work?

#### Beyond Scope (1 check)

Look for content that doesn't belong in this project's knowledge:
- Lessons that are about a different project or domain
- Principles that are too generic to be useful
- Vision items that belong in a separate project

### 4. Format output

```markdown
## Knowledge Health Check

### Internal Coherence
🟢 Principles — consistent.
🟡 Vision — roadmap phase 3 and phase 5 have overlapping scope.
   Phase 3 (line 45): "Implement caching layer"
   Phase 5 (line 67): "Add performance optimization including caching"
   → Consider merging these phases or clarifying the distinction.
🟢 Experience — consistent.

### Cross-references
🟢 Principles → Vision — vision is derivable from principles.
🟡 Vision → Principles — vision mentions "progressive disclosure" but
   principles don't include a related principle.
   → Consider adding a principle about progressive complexity, or
     clarify why this is a tactical choice rather than a principle.
🟢 Principles → Experience — principles predict observed patterns.
🟢 Experience → Principles — no challenges to existing principles.
🔴 Vision → Experience — vision plans to use server-side rendering,
   but experience recorded that SSR caused hydration issues.
   Vision line 34: "Phase 2: migrate to SSR for SEO"
   Experience line 12: "SSR hydration mismatches caused 3-day debug cycle"
   → Update vision to address this known risk, or clarify why the
     context is different this time.
🟢 Experience → Vision — no missed opportunities.

### Overall
🟡 Generally healthy. Main pressure is on vision.md — one conflict
   with experience and one internal overlap need attention.

### Beyond Scope
🟢 All content is relevant to this project.

## Suggested Actions
1. Resolve SSR conflict between vision and experience
2. Clarify or merge overlapping roadmap phases
3. Consider adding progressive disclosure principle
```

### 5. Event-based analysis (when $ARGUMENTS describes an event)

When the user provides an event (e.g., "just finished the auth system"):

```markdown
## Post-feature Check: Auth System

### Impact on Experience
🟡 Worth distilling — the OAuth token refresh logic behaved
   differently than expected.
   → Suggest adding a lesson to experience.md

### Impact on Vision
🟢 Roadmap milestone completed as planned.

### Impact on Principles
🟢 No challenge to existing principles.

### Suggested Actions
1. Add to experience.md: OAuth token refresh lesson
2. Update vision.md: mark auth milestone as complete
```

## Display Rules

- 🟢 **Consistent**: one line, no details needed
- 🟡 **Tension**: expand with specific quotes (file + line reference), explain the tension, suggest resolution
- 🔴 **Inconsistent**: expand with specific quotes, explain the conflict, suggest concrete action
- Always quote the specific text from the knowledge files that supports your finding
- End with a numbered list of suggested actions, ordered by priority

## Guidelines

- Use the user's language for all output
- Be specific — always quote the relevant text from knowledge files
- Distinguish between true contradictions (🔴) and tensions worth watching (🟡)
- Don't flag stylistic differences as inconsistencies
- Focus on substance: does the knowledge system help the team make good decisions?
- Never modify files automatically — only suggest changes
