/**
 * MongoDB 雙向資料同步腳本 (Local <-> Remote Tailscale 港一)
 * 用法:
 *   node scripts/syncMongo.js to-remote  # 將本機資料同步至遠端
 *   node scripts/syncMongo.js to-local   # 將遠端資料同步至本機
 */

const path = require('path');
const mongoose = require('mongoose');

const fs = require('fs');
const dotenv = require('dotenv');

// 讀取根目錄 .env
const rootEnvPath = path.resolve(__dirname, '../../.env');
let rootEnv = {};
if (fs.existsSync(rootEnvPath)) {
  rootEnv = dotenv.parse(fs.readFileSync(rootEnvPath));
}

// 讀取 FYPServer/.env
const serverEnvPath = path.resolve(__dirname, '../.env');
let serverEnv = {};
if (fs.existsSync(serverEnvPath)) {
  serverEnv = dotenv.parse(fs.readFileSync(serverEnvPath));
}

const LOCAL_URI = process.env.LOCAL_MONGODB_URI || serverEnv.LOCAL_MONGODB_URI || 'mongodb://127.0.0.1:27017/fyp';
const REMOTE_URI = process.env.REMOTE_MONGODB_URI || rootEnv.MONGODB_URI || 'mongodb://fyp_app:JsmP6WSIacwqvhM4kyyTyn-jwsH-zeOM@100.112.67.7:27017/fyp?authSource=admin';

const direction = process.argv[2] || 'to-remote';

async function syncDatabases() {
  console.log('========================================================');
  console.log('🔄 MongoDB 資料庫同步工具');
  console.log('========================================================');
  console.log(`📌 同步方向: ${direction === 'to-remote' ? '本機 (Local) ➔ 遠端 (Tailscale 港一)' : '遠端 (Tailscale 港一) ➔ 本機 (Local)'}`);
  console.log(`  - Local URI : ${LOCAL_URI}`);
  console.log(`  - Remote URI: ${REMOTE_URI.replace(/\/\/.*@/, '//***:***@')}`);
  console.log('========================================================\n');

  let localConn, remoteConn;
  try {
    console.log('⏳ 正在連線本機與遠端 MongoDB...');
    localConn = await mongoose.createConnection(LOCAL_URI).asPromise();
    console.log('  ✅ 本機 MongoDB 連線成功');

    remoteConn = await mongoose.createConnection(REMOTE_URI).asPromise();
    console.log('  ✅ 遠端 MongoDB 連線成功');

    const sourceConn = direction === 'to-remote' ? localConn : remoteConn;
    const targetConn = direction === 'to-remote' ? remoteConn : localConn;
    const sourceName = direction === 'to-remote' ? '本機' : '遠端';
    const targetName = direction === 'to-remote' ? '遠端' : '本機';

    const collections = await sourceConn.db.listCollections().toArray();
    console.log(`\n📦 找到來源庫 (${sourceName}) 共 ${collections.length} 個 Collection:`);

    let totalSynced = 0;

    for (const colInfo of collections) {
      const colName = colInfo.name;
      if (colName.startsWith('system.')) continue;

      const sourceCol = sourceConn.db.collection(colName);
      const targetCol = targetConn.db.collection(colName);

      const docs = await sourceCol.find({}).toArray();
      const count = docs.length;

      if (count === 0) {
        console.log(`  - [${colName}] 0 筆資料，略過`);
        continue;
      }

      console.log(`  - [${colName}] 來源共有 ${count} 筆資料，開始同步至 ${targetName}...`);
      
      // 清理目標 collection 舊資料避免衝突
      await targetCol.deleteMany({});

      // 批次寫入
      if (docs.length > 0) {
        await targetCol.insertMany(docs);
      }

      console.log(`    ✅ [${colName}] ${count} 筆資料已同步完成`);
      totalSynced += count;
    }

    console.log('\n========================================================');
    console.log(`🎉 同步完成！共計同步 ${totalSynced} 筆文件至 ${targetName} 資料庫！`);
    console.log('========================================================');
  } catch (error) {
    console.error('❌ 同步失敗:', error.message);
  } finally {
    if (localConn) await localConn.close();
    if (remoteConn) await remoteConn.close();
    process.exit(0);
  }
}

syncDatabases();
