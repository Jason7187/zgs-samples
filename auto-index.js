const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('======== 开始扫描并自动同步 index.json ========');

const majorsDir = path.join(__dirname, 'majors');
const indexPath = path.join(__dirname, 'index.json');

// 1. 读取 index.json
let indexData = { 专业列表: [], 默认专业: 'default.json' };
try {
    if (fs.existsSync(indexPath)) {
        indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    }
} catch (e) {
    console.error('读取 index.json 失败，请检查格式：', e.message);
    process.exit(1);
}

let hasUpdate = false;

// 2. 扫描 majors 文件夹
const files = fs.readdirSync(majorsDir).filter(f => f.endsWith('.json') && f !== 'default.json');

for (const file of files) {
    const majorName = file.replace('.json', '');
    
    // 检查是否已经在 index.json 里
    const exists = indexData.专业列表.find(item => item.文件名 === file);
    if (!exists) {
        console.log(`[发现新专业] ${majorName}，正在自动加入映射...`);
        
        // 尝试读取 JSON 内部的专业名称
        let fullMajorName = majorName + '专业';
        try {
            const jsonContent = JSON.parse(fs.readFileSync(path.join(majorsDir, file), 'utf8'));
            if (jsonContent.专业信息 && jsonContent.专业信息.专业名称) {
                fullMajorName = jsonContent.专业信息.专业名称;
            }
        } catch (e) {
            console.warn(`  -> 警告：读取 ${file} 失败，将使用文件名作为别名。`);
        }

        // 追加到专业列表
        indexData.专业列表.push({
            专业名称: majorName,
            文件名: file,
            别名: [majorName, fullMajorName, fullMajorName.replace('专业', '')]
        });
        hasUpdate = true;
        console.log(`  -> 已添加：${majorName}，别名：${majorName}, ${fullMajorName}`);
    }
}

// 3. 如果有更新，写回 index.json 并推送
if (hasUpdate) {
    fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 4), 'utf8');
    console.log('\n[成功] index.json 已更新。正在提交到 GitHub...');
    
    try {
        execSync('git add .', { stdio: 'inherit' });
        execSync('git commit -m "feat: auto update index mapping"', { stdio: 'inherit' });
        execSync('git pull origin main --rebase', { stdio: 'inherit' });
        execSync('git push origin main', { stdio: 'inherit' });
        console.log('\n===========================================');
        console.log(' 全部完成！已成功推送到 GitHub。');
        console.log('===========================================');
    } catch (err) {
        console.error('\n[错误] Git 操作失败。如果你开了代理，请检查网络。');
    }
} else {
    console.log('所有专业均已在 index.json 中映射，无需更新。');
}