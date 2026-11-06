const fs = require('fs');
const fileName = process.argv[2];
const aliasStr = process.argv[3];
if (!fileName || !aliasStr) process.exit(1);
const aliasArray = aliasStr.split(',').map(s => s.trim());
try {
    const index = JSON.parse(fs.readFileSync('index.json', 'utf8'));
    const existing = index.专业列表.find(item => item.文件名 === fileName + '.json');
    if (existing) { existing.别名 = aliasArray; } 
    else {
        index.专业列表.push({ 专业名称: fileName, 文件名: fileName + '.json', 别名: aliasArray });
    }
    fs.writeFileSync('index.json', JSON.stringify(index, null, 4), 'utf8');
    console.log('index.json updated.');
} catch (e) { process.exit(1); }