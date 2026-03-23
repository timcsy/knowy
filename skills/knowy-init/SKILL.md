---
name: knowy-init
description: AI-guided creation of project knowledge files (.knowledge/)
user-invokable: true
argument-hint: "[topic or file to focus on]"
---

# Knowy Init

Help the user create or populate their project knowledge files through interactive conversation.

## User Input

```text
$ARGUMENTS
```

## Workflow

### 1. Read current state

- Read `.knowledge/principles.md`, `.knowledge/vision.md`, `.knowledge/experience.md`
- Read `.knowledge/.templates/` to understand suggested structure
- Identify which files are empty or still contain only template comments

### 2. Determine scope

- If `$ARGUMENTS` specifies a file (e.g., "principles"): focus on that file
- If `$ARGUMENTS` specifies a subdirectory file (e.g., "design/auth-system"): help create that file
- If `$ARGUMENTS` is empty: assess all three core files and start with whichever needs the most work

### 3. Interactive conversation

Ask the user questions to draw out their knowledge. Adapt your questions to the file being created:

**For principles.md:**
- "What is the single most important belief behind this project?"
- "What rules would you never break, even under deadline pressure?"
- "Can you trace that rule back to a deeper principle?"

**For vision.md:**
- "What problem does this project solve?"
- "Where is the project right now — what works and what doesn't?"
- "What are the next 2-3 milestones?"

**For experience.md:**
- "What surprised you during development?"
- "What would you do differently if you started over?"
- "What patterns have you noticed across multiple features?"

**For subdirectory files (research/, design/, history/):**
- Read existing core files for context
- Ask about the specific topic
- Suggest a filename following the directory's purpose

### 4. Draft content

Based on the conversation:
- Draft the content in the user's language
- Follow the structure from the templates (but use real content, not placeholders)
- For principles: show derivation chains (which principle follows from which)
- For vision: be concrete about current state and milestones
- For experience: use the pattern/event/takeaway format

### 5. Confirm and write

- Present the draft to the user
- Ask for feedback and iterate if needed
- Only write to files after explicit user confirmation
- Never overwrite existing content without showing what will change

## Guidelines

- Use the user's language for all output
- Keep language practical and clear — avoid academic jargon
- Reference existing content in other knowledge files when relevant
- For subdirectory files, suggest how the content might eventually be distilled into the parent core file
- If the user seems unsure, offer concrete examples from common project types
