# zgs-samples

职业规划大赛闯关助手 - 远程样本库。修改任意 JSON 文件后提交即可生效（用户刷新页面）。

## 文件说明
| 文件 | 结构 | 用途 |
|------|------|------|
| role-models.json | `[{name, position, unit}]` | 生涯榜样 |
| majors.json | `[{major_name, courses}]` | 专业模板 |
| careers.json | `[{job, major, profession, interviewer}]` | 职业方向探索记录 |
| skills.json | `{knowledge[], migrate[], selfManage[]}` | 技能词库 |
| promote-ways.json | `[{match[], name, behavior, expect_result, need_resource}]` | 技能提升模板 |
| anchored-jobs.json | `[string]` | 锚定职业池 |
| job-books.json | `[{name, experience}]` | 书目样本 |
| practice-modes.json | `[string]` | 实践方式池 |

## 约束
- 所有 JSON 必须 UTF-8 无 BOM，无注释。
- 修改后提交到 `main` 分支即可。
