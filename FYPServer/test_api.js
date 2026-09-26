const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:7788';

async function request(method, path, body = null, headers = {}) {
    return new Promise((resolve, reject) => {
        const url = new URL(path, BASE_URL);
        const options = {
            hostname: url.hostname,
            port: url.port,
            path: url.pathname + url.search,
            method: method,
            headers: { ...headers }
        };

        let requestBody = null;
        if (body && !(body instanceof Buffer)) {
            requestBody = JSON.stringify(body);
            options.headers['Content-Type'] = 'application/json';
            options.headers['Content-Length'] = Buffer.byteLength(requestBody);
        } else if (body instanceof Buffer) {
            requestBody = body;
        }

        const req = http.request(options, (res) => {
            let data = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                let parsed = null;
                try {
                    parsed = JSON.parse(data);
                } catch (e) {
                    parsed = data;
                }
                resolve({ statusCode: res.statusCode, headers: res.headers, data: parsed });
            });
        });

        req.on('error', (e) => reject(e));
        if (requestBody) req.write(requestBody);
        req.end();
    });
}

async function runTests() {
    console.log('=== STARTING FULL SYSTEM API INTEGRATION TESTS ===\n');
    let passed = 0;
    let failed = 0;

    function assert(condition, message, details = '') {
        if (condition) {
            console.log(`[PASS] ${message}`);
            passed++;
        } else {
            console.error(`[FAIL] ${message} ${details ? JSON.stringify(details) : ''}`);
            failed++;
        }
    }

    try {
        // 1. Root check
        const root = await request('GET', '/');
        assert(root.statusCode === 200, 'GET / returns 200 OK');

        // 2. User registration
        const testEmail = `test_${Date.now()}@example.com`;
        const regRes = await request('POST', '/users/user', {
            user: {
                username: '測試用戶',
                email: testEmail,
                password: 'password123',
                role: 'User',
                phone: '0912345678',
                gender: true,
                introduction: '測試簡介'
            }
        });
        assert(regRes.data.status === 'success' && regRes.data.user && regRes.data.user._id, 'POST /users/user creates new user', regRes.data);
        const userId = regRes.data.user ? regRes.data.user._id : null;

        // 3. User duplicate email check
        const dupRes = await request('POST', '/users/user', {
            user: {
                username: '重複用戶',
                email: testEmail,
                password: 'password123',
                role: 'User',
                phone: '0987654321'
            }
        });
        assert(dupRes.data.status === 'fail' && dupRes.data.message === 'Email already existed', 'POST /users/user rejects duplicate email', dupRes.data);

        // 4. User login check
        const loginRes = await request('POST', '/users/user/emailPass', {
            email: testEmail,
            password: 'password123'
        });
        assert(loginRes.data.status === 'success' && loginRes.data.user && loginRes.data.user.email === testEmail, 'POST /users/user/emailPass login succeeds', loginRes.data);

        // 5. User list
        const userListRes = await request('GET', '/users/user');
        assert(userListRes.data.status === 'success' && Array.isArray(userListRes.data.users), 'GET /users/user returns user list');

        // 6. User update
        if (userId) {
            const updateRes = await request('PUT', '/users/user', {
                user: {
                    _id: userId,
                    username: '測試用戶_已更新',
                    email: testEmail,
                    password: 'password123',
                    role: 'User',
                    phone: '0912345678'
                }
            });
            assert(updateRes.data.status === 'success' && updateRes.data.user.username === '測試用戶_已更新', 'PUT /users/user updates user name');
        }

        // 7. Market creation
        const marketName = `士林夜市測試_${Date.now()}`;
        const marketRes = await request('POST', '/market', {
            market: {
                name: marketName,
                nameen: 'Shilin Night Market Test',
                marketLocation: 'Taipei',
                positionGuidelines: '捷運劍潭站',
                brief: '知名夜市',
                introduction: '台北著名觀光夜市',
                rating: 4.8,
                lat: 25.088,
                lng: 121.524,
                marketIcon: 'http://localhost:7788/images/test.jpg'
            }
        });
        assert(marketRes.data.status === 'success' && marketRes.data.market && marketRes.data.market._id, 'POST /market creates night market', marketRes.data);
        const marketId = marketRes.data.market ? marketRes.data.market._id : null;

        // 8. Market duplicate check
        const dupMarket = await request('POST', '/market', {
            market: { 
                name: marketName,
                nameen: 'Duplicate',
                marketLocation: 'Taipei',
                marketIcon: 'test.jpg'
            }
        });
        assert(dupMarket.data.status === 'fail', 'POST /market rejects duplicate name');

        // 9. Market list
        const marketList = await request('GET', '/market');
        assert(marketList.data.status === 'success' && Array.isArray(marketList.data.market) && marketList.data.market.length > 0, 'GET /market lists markets');

        // 10. Market get by id (GET & POST)
        if (marketId) {
            const mGet = await request('GET', `/market/${marketId}`);
            assert(mGet.data.status === 'success' && mGet.data.market.name === marketName, 'GET /market/:id fetches market');

            const mPost = await request('POST', `/market/${marketId}`);
            assert(mPost.data.status === 'success' && mPost.data.market.name === marketName, 'POST /market/:id fetches market (compatibility)');
        }

        // 11. Shop creation
        const shopManager = `manager_${Date.now()}`;
        const shopRes = await request('POST', '/shops', {
            shop: {
                shopName: '豪大大雞排',
                shopYeShi: marketName,
                shopNumber: 'A01',
                shopType: '美食',
                shopLocation: '第 1 攤位',
                shopManager: shopManager,
                shopManagerID: userId || 'test_uid',
                shopIntroduction: '超大塊炸雞排，酥脆多汁',
                shopShortIntroduction: '招牌大雞排',
                rating: 4.7,
                food: [
                    { foodName: '大雞排', foodPrice: 90, foodType: ['炸物'], foodInfo: '招牌雞排' },
                    { foodName: '甜不辣', foodPrice: 40, foodType: ['炸物'], foodInfo: '手工甜不辣' }
                ]
            }
        });
        assert(shopRes.data.status === 'success' && shopRes.data.shop && shopRes.data.shop._id, 'POST /shops creates shop with foods', shopRes.data);
        const shopId = shopRes.data.shop ? shopRes.data.shop._id : null;

        // 12. Shop list & get by id
        const shopList = await request('GET', '/shops');
        assert(shopList.data.status === 'success' && Array.isArray(shopList.data.shop), 'GET /shops lists shops');

        if (shopId) {
            const sGet = await request('GET', `/shops/${shopId}`);
            assert(sGet.data.status === 'success' && sGet.data.shop.shopName === '豪大大雞排', 'GET /shops/:id fetches shop');

            const sPut = await request('PUT', `/shops/${shopId}`, {
                shop: { _id: shopId, shopName: '豪大大雞排_旗艦店' }
            });
            assert(sPut.data.status === 'success' && sPut.data.shop.shopName === '豪大大雞排_旗艦店', 'PUT /shops/:id updates shop');
        }

        // 13. Food creation & get
        const foodRes = await request('POST', '/foods', {
            food: {
                foodName: '珍珠奶茶',
                foodPrice: 60,
                foodType: ['飲料'],
                foodInfo: '台灣經典珍珠奶茶',
                rating: 4.9
            }
        });
        assert(foodRes.data.status === 'success' && foodRes.data.food && foodRes.data.food._id, 'POST /foods creates food', foodRes.data);
        const foodId = foodRes.data.food ? foodRes.data.food._id : null;

        const foodList = await request('GET', '/foods');
        assert(foodList.data.status === 'success' && Array.isArray(foodList.data.food), 'GET /foods lists foods');

        if (foodId) {
            const fGet = await request('GET', `/foods/${foodId}`);
            assert(fGet.data.status === 'success' && fGet.data.food.foodName === '珍珠奶茶', 'GET /foods/:id fetches food');

            const fPut = await request('PUT', `/foods/${foodId}`, {
                food: { _id: foodId, foodPrice: 65 }
            });
            assert(fPut.data.status === 'success' && fPut.data.food.foodPrice === 65, 'PUT /foods/:id updates food');
        }

        // 14. Comment creation & list
        const commentRes = await request('POST', '/comment', {
            comment: {
                ownerId: userId || 'anonymous',
                ownerName: '測試用戶',
                shop: shopId || 'default_shop',
                comment: '這家真的很好吃，強烈推薦！',
                date: new Date()
            }
        });
        assert(commentRes.data.status === 'success' && commentRes.data.comment && commentRes.data.comment._id, 'POST /comment creates comment', commentRes.data);

        const commentList = await request('GET', '/comment');
        assert(commentList.data.status === 'success' && Array.isArray(commentList.data.comment), 'GET /comment lists comments');

        // 15. Bulletin creation & list
        const bulletinRes = await request('POST', '/bulletin', {
            bulletin: {
                title: '夜市防疫規範與營業時間公告',
                context: '請各位遊客配戴口罩，保持社交距離。',
                owner: '管理處'
            }
        });
        assert(bulletinRes.data.status === 'success' && bulletinRes.data.bulletin && bulletinRes.data.bulletin._id, 'POST /bulletin creates bulletin', bulletinRes.data);

        const bulletinList = await request('GET', '/bulletin');
        assert(bulletinList.data.status === 'success' && Array.isArray(bulletinList.data.bulletin), 'GET /bulletin lists bulletins');

        // 16. Feedback creation & list
        const feedbackRes = await request('POST', '/feedback', {
            feedback: {
                owner: '訪客王小明',
                id: userId || 'test_user',
                contact: '0912345678',
                email: 'visitor@example.com',
                opinion: '希望能增加更多停車場資訊！',
                isMember: 'true'
            }
        });
        assert(feedbackRes.data.status === 'success' && feedbackRes.data.feedback && feedbackRes.data.feedback._id, 'POST /feedback creates feedback', feedbackRes.data);

        const feedbackList = await request('GET', '/feedback');
        assert(feedbackList.data.status === 'success' && Array.isArray(feedbackList.data.feedback), 'GET /feedback lists feedback');

        // 17. Image upload and serve test
        const boundary = '----WebKitFormBoundaryABC123Test';
        const dummyImage = Buffer.from([0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46]); // JPEG header
        const postDataHeader = Buffer.from(
            `--${boundary}\r\n` +
            `Content-Disposition: form-data; name="Image"; filename="test_pixel.jpg"\r\n` +
            `Content-Type: image/jpeg\r\n\r\n`
        );
        const postDataFooter = Buffer.from(`\r\n--${boundary}--\r\n`);
        const multipartBody = Buffer.concat([postDataHeader, dummyImage, postDataFooter]);

        const uploadRes = await request('POST', '/upload', multipartBody, {
            'Content-Type': `multipart/form-data; boundary=${boundary}`,
            'Content-Length': multipartBody.length
        });
        assert(uploadRes.data.status === 'success' && uploadRes.data.filename, 'POST /upload uploads image file', uploadRes.data);

        if (uploadRes.data.filename) {
            const imgRes = await request('GET', `/images/${uploadRes.data.filename}`);
            assert(imgRes.statusCode === 200, `GET /images/${uploadRes.data.filename} serves uploaded image`);
        }

        // 18. Cleanup temporary test market
        if (marketId) {
            const delRes = await request('DELETE', `/market/${marketId}`);
            assert(delRes.data.status === 'success', 'DELETE /market/:id cleans up test market');
        }

    } catch (e) {
        console.error('Test runner encountered an error:', e);
        failed++;
    }

    console.log(`\n=== TEST SUMMARY: ${passed} PASSED, ${failed} FAILED ===\n`);
    process.exit(failed > 0 ? 1 : 0);
}

runTests();
