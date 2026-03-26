# Knowie

[English](README.md)

**你的 AI 讀得懂程式碼。Knowie 教它讀懂你的想法。**

---

## 問題

你請 AI 加一個功能。它寫出能跑的程式碼——但違反了你的架構。你請它修 bug。它挑了你上個月試過且失敗的方案。

**你的 AI 不知道你知道的事。** 它不知道你的原則、你的路線圖、或你踩過的坑。

## 解法

三份檔案。就這樣。

```
knowledge/
  principles.md    ← 你相信什麼、為什麼
  vision.md        ← 你要去哪裡、怎麼去
  experience.md    ← 你用血淚學到的事
```

你的 AI 在每次任務前讀取它們。現在它的建議會跟你的專案對齊——不只是程式碼。

## 30 秒開始

```bash
npx knowie init
```

完成。Knowie 建好檔案、偵測你的 AI 工具（支援 25+ 種）、全部連結好。

> 用 AI 工具？它可以幫你做：`npx knowie init --yes`

## 差別在哪

**沒有 Knowie：**
> 「加快取」→ AI 選 Redis，因為最熱門。但你的原則 #2 說「核心功能不用外部依賴」。

**有了 Knowie：**
> 「加快取」→ AI 讀了你的原則，選了 in-memory，並引用 experience.md 中快取導致資料過期的教訓。

## 運作方式

| 檔案 | 回答的問題 | 更新頻率 |
|------|-----------|----------|
| `principles.md` | 什麼規則引導我們？ | 很少 |
| `vision.md` | 我們要往哪走？ | 里程碑後 |
| `experience.md` | 我們學到了什麼？ | 意外發生後 |

三個子目錄存放詳細內容：

| 目錄 | 放什麼 | 蒸餾到 |
|------|--------|--------|
| `research/` | 探索、實驗 | → principles.md |
| `design/` | 架構決策 | → vision.md |
| `history/` | 事件記錄 | → experience.md |

## Skills

如果你的 AI 工具支援 skill（如 Claude Code），Knowie 提供四個指令：

| Skill | 做什麼 |
|-------|--------|
| `/knowie init` | 引導式對話，幫你填寫知識文件 |
| `/knowie update` | 檢查文件結構，建議改進 |
| `/knowie judge` | 17 項健康檢查：一致性、連貫性、與實際程式碼對齊 |
| `/knowie next` | 規劃下一步，以原則為根基、以經驗為指引 |

**`/knowie judge`** 是核心循環。它會抓到願景和經驗矛盾、原則和程式碼不符、或文件已經過時的問題。🟢 健康、🟡 張力、🔴 衝突——附具體引用和行動建議。

## 支援你的工具

Knowie 自動連結 **25+ 種 AI 工具和規格工具**：

**AI 工具：** Claude Code、Cursor、Windsurf、GitHub Copilot、Codex、Gemini、Kiro、Amazon Q、Cline、Roo Code、Kilo Code、Aider、Continue、Augment、Amp、Devin、Warp、Zed、OpenCode、Qodo、JetBrains AI、Tabnine、Replit、Bolt.new

**規格工具：** Speckit、OpenSpec、Kiro Specs

**標準：** AGENTS.md（跨工具標準，60k+ repos 採用）

`knowie init` 偵測你有什麼，自動注入 `knowledge/` 的引用。不用手動設定。

## MCP Server

支援 MCP（Model Context Protocol）的 AI 工具：

```bash
npx knowie setup-mcp
```

讓你的 AI 直接使用 `knowie_init`、`knowie_update`、`knowie_judge` 和 `knowie_next`。

<details>
<summary>手動 MCP 設定</summary>

```json
{
  "mcpServers": {
    "knowie": {
      "command": "npx",
      "args": ["-y", "knowie", "--", "knowie-mcp"]
    }
  }
}
```
</details>

## 更新

```bash
npx knowie update
```

更新 skills 和模板，不動知識文件。自動偵測新增的 AI 工具。加 `--yes` 全自動。

## 設計原則

- **純 Markdown** —— `knowledge/` 跟任何工具都能搭配，或不搭配也行。沒有專屬格式。
- **無 npm 依賴** —— 只用 Node.js 內建模組。安裝秒完成。
- **不鎖定** —— Knowie 連結你的工具，不是反過來。
- **AI 原生** —— `--yes` 旗標零互動操作。你的 AI 可以直接安裝和更新 Knowie。

## 為什麼是三份檔案？

這個結構對應到知識的最小單位——*判斷（judgment）*：

- **原則** = 什麼是正確的（規範）
- **願景** = 正在建造什麼（構造）
- **經驗** = 我們所處的脈絡（處境）

每一個都只有在與另外兩個的關係中才有意義。`/knowie judge` 驗證它們是否對齊。`/knowie next` 利用三者規劃連貫的下一步。

源自[三視角主義（triperspectivalism）](https://en.wikipedia.org/wiki/Triperspectivalism)和型別論中的判斷（Γ ⊢ t : A）。

## 授權

MIT
