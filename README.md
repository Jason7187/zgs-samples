# zgs-samples

「职业规划大赛闯关助手」远程样本库。

脚本从本仓库 `main` 分支读取专业数据，**修改本仓库内容后用户刷新页面即生效**，脚本本身无需更新。

---

## 远程地址格式

```text
https://raw.githubusercontent.com/Jason7187/zgs-samples/main/
```

---

## 已支持专业

| 专业 | 文件 |
|---|---|
| 预防医学 | `majors/预防医学.json` |
| 通用兜底 | `majors/default.json` |

---

## 脚本如何加载

1. 请求 `index.json`
2. 用归一化后的用户专业名在「别名」中匹配
3. 只加载**匹配到的那一个**专业文件 + `default.json` 兜底（失败时）
4. 与专业总数无关，加载耗时恒定

---

## 目录结构

```text
zgs-samples/
├── AGENTS.md
├── README.md
├── index.json
└── majors/
    ├── default.json
    ├── 预防医学.json
    └── ...（新增专业只加文件 + index.json 加一行）
```

---

## 新增专业（3 步）

### 第 1 步：新建专业文件

复制 `majors/预防医学.json` 为 `majors/口腔医学.json`，把所有内容改成口腔医学版本。

字段清单与约束见 `AGENTS.md` 第 5、6 节。

### 第 2 步：修改 index.json

在「专业列表」追加一行：

```json
{
    "专业名称": "口腔医学",
    "文件名": "口腔医学.json",
    "别名": ["口腔医学", "口腔医学专业", "口腔医学技术", "口腔修复工艺"]
}
```

### 第 3 步：提交

```bash
git checkout -b feat/口腔医学
git add majors/口腔医学.json index.json
git commit -m "feat: 新增口腔医学专业样本"
git push origin feat/口腔医学
```

在 GitHub 网页创建 PR → 自审 → Merge。

---

## 本地验证

提交前检查所有 JSON 是否合法、字段是否齐全：

```bash
node -e "
const fs = require('fs'), path = require('path');
const fields = ['专业信息','榜样名单','榜样分析模板','生涯愿景','专业探索','职业探索','职业方向列表','锚定职业池','书目样本','实践方式','信息整理模板','目标锚定领悟','技能库','成就故事','能力盘点领悟','技能提升模板','技能提升领悟'];
const dir = path.join(process.cwd(),'majors');
let fail = 0;
for (const f of fs.readdirSync(dir).filter(x=>x.endsWith('.json'))) {
    try {
        const c = JSON.parse(fs.readFileSync(path.join(dir,f),'utf8'));
        const miss = fields.filter(k=>!(k in c));
        if (miss.length) { console.log('[FAIL]', f, '缺失:', miss.join(',')); fail++; }
        else console.log('[PASS]', f);
    } catch (e) { console.log('[FAIL]', f, e.message); fail++; }
}
process.exit(fail?1:0);
"
```

---

## 注意事项

- JSON 必须 UTF-8 无 BOM
- 长文本 150~250 字，短文本按 `AGENTS.md` 约束
- 禁止 emoji、禁止乱码、禁止占位符残留（`榜样分析模板` 除外）
- 详细字段约束见 `AGENTS.md` 第 6 节

---

## 分支与提交

- 分支：`feat/新专业名`、`fix/修正`、`chore/维护`
- commit 前缀：`feat:`、`fix:`、`chore:`
- 一次 PR 只改一个专业或一个主题