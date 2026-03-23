---
name: knowy-next
description: Plan the next step based on project knowledge
user-invokable: true
argument-hint: "[direction or feature area to explore]"
---

# Knowy Next

Help the user decide and plan what to work on next, grounded in the project's principles, vision, and experience.

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

Also check `.knowledge/design/` for relevant design documents.

### 2. Determine direction

**If `$ARGUMENTS` provides a direction** (e.g., "error handling", "mobile support"):
- Locate it in the vision roadmap
- Check prerequisites — are prior milestones complete?
- Find relevant experience entries (lessons, pitfalls)
- Find relevant design documents

**If `$ARGUMENTS` is empty**:
- Look at the vision roadmap for the next incomplete milestone
- Consider experience lessons that might affect priority
- Suggest the most logical next step

### 3. Converge

Through conversation with the user, converge on:

- **Feature name**: short, descriptive
- **One-line description**: what it delivers
- **Roadmap position**: which phase/milestone it belongs to
- **Scope**: what's included and what's explicitly excluded
- **From principles**: how this feature follows from or serves the project's principles
- **From experience**: relevant lessons that should inform the implementation
- **Risks**: based on experience, what could go wrong

### 4. Output

Present a concise feature brief:

```markdown
## Next: [Feature Name]

**Description**: [One-line description]

**Roadmap**: [Phase/milestone reference]

**Scope**:
- ✅ [Included]
- ✅ [Included]
- ❌ [Explicitly excluded]

**Grounded in principles**:
- [Which principle(s) this serves and how]

**Informed by experience**:
- [Relevant lesson(s) and how to apply them]

**Risks**:
- [Known risk from experience + mitigation]
```

### 5. Suggest next action

After presenting the feature brief, scan the project for spec/planning tools:

- Check `.claude/skills/` for spec-related skills (e.g., `speckit-specify`, `speckit-plan`)
- Check `.specify/` for Speckit
- Check `openspec/` for OpenSpec
- Check `.kiro/specs/` for Kiro Specs

**If a spec tool is found**: suggest the specific command.
  Example: "You can now use `/speckit-specify` to create a detailed specification for this feature."

**If no spec tool is found**: give a generic prompt.
  "You can now use your preferred specification tool to flesh out the details, or start implementing directly."

## Guidelines

- Use the user's language for all output
- Keep the feature brief concise — it's a starting point, not a full spec
- Ground every recommendation in the knowledge files — don't invent principles or cite non-existent experience
- If the roadmap is empty or unclear, help the user think through priorities rather than guessing
- Never auto-invoke other skills — only suggest them
- If the user's direction conflicts with principles or experience, flag it clearly but let them decide
