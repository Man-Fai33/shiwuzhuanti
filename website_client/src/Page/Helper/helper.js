
import URL from "./url"

export const helper = {
    //Upload Async
    AsyncUploadImage: async (image) => {
        try {

            let url = URL.Url.UpLoad
            let response = await fetch(url, {
                method: 'POST',
                body: image
            })

            let responseJson = await response.json();

            return responseJson;
        } catch (error) {

        }
    },

    // user Async
    AsyncUserByEmailPass: async (email, password) => {
        try {
            let jsonBody = JSON.stringify({
                email: email,
                password: password
            })
            console.log(jsonBody);
            let url = URL.Url.CheckLogin
            let response = await fetch(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "post",
                body: jsonBody
            })
            let responseJson = await response.json();
            // if(responseJson.status == "success"){

            // }

            return responseJson;
        } catch (error) {

            let msg = {};
            msg.status = 'fail'
            msg.message = 'Network Error'
            return msg;

        }
    },
    AsyncUserByID: async (id) => {

    },
    AsyncUsers: async () => {
        let url = URL.Url.User
        let response = await fetch(url, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'get',
        })
        let responseJson = await response.json();

        return responseJson;
    },
    AsyncMarketCreate: async (data) => {
        console.log(data)
        try {
            let jsonBody = JSON.stringify({

                market: data.market
            })

            let url = URL.Url.Market
            let response = await fetch(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',

                },
                method: "post",
                body: jsonBody
            })
            let respJson = await response.json();
            return respJson;

        } catch (e) {
            console.log(e)
            let msg = {};
            msg.status = 'fail'
            msg.message = 'Network Error'
            return msg;
        }
    },
    AsyncUserCreate: async (userData) => {
        console.log(userData)
        try {
            let jsonBody = JSON.stringify({
                requesterid: null,

                user: userData.user
            })
            console.log(jsonBody)
            let url = URL.Url.User
            let response = await fetch(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "post",
                body: jsonBody
            })
            let respJson = await response.json();
            return respJson;

        } catch (e) {
            console.log(e)
            let msg = {};
            msg.status = 'fail'
            msg.message = 'Network Error'
            return msg;
        }
    },
    AsyncFeedbackCreate: async (feedback) => {
        try {
            let jsonBody = JSON.stringify({
                requesterid: null,
                feedback: feedback.feedback
            })
            console.log(jsonBody)
            let url = URL.Url.FeedBack
            let response = await fetch(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "post",
                body: jsonBody
            })
            let respJson = await response.json();
            return respJson;
        } catch (e) {
            console.log(e)
            let msg = {};
            msg.status = 'fail'
            msg.message = 'Network Error'
            return msg;
        }
    },
    AsyncBulletinCreate: async (bulletin) => {
        try {
            let jsonBody = JSON.stringify({
                requesterid: null,
                bulletin: bulletin.bulletin
            })
            console.log(jsonBody)
            let url = URL.Url.Bulletin
            let response = await fetch(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "post",
                body: jsonBody
            })
            let respJson = await response.json();
            return respJson;
        } catch (e) {
            console.log(e)
            let msg = {};
            msg.status = 'fail'
            msg.message = 'Network Error'
            return msg;
        }
    },
    AsyncUserEdit: async (userData) => {
        try {
            let jsonBody = JSON.stringify({
                user: userData
            })
            console.log(jsonBody)
            let url = URL.Url.User
            let response = await fetch(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'PUT',
                body: jsonBody
            })
            let responseJson = await response.json();
            return responseJson;
        } catch (e) {
            let msg = {};
            msg.status = 'fail'
            msg.message = 'Network Error'
            return msg;
        }
    },
    AsyncCommentCreate: async (comment) => {
        try {
            let jsonBody = JSON.stringify({
                comment: comment
            })
            console.log(jsonBody)
            let url = URL.Url.Comment
            let response = await fetch(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'post',
                body: jsonBody
            })
            let responseJson = await response.json();
            return responseJson;
        } catch (e) {
            let msg = {};
            msg.status = 'fail'
            msg.message = 'Network Error'
            return msg;
        }
    },
    AsyncComments: async () => {
        let url = URL.Url.Comment
        let response = await fetch(url, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'get',
        })
        let responseJson = await response.json();

        return responseJson;
    },

    AsyncFeedBackAll: async () => {
        let url = URL.Url.FeedBack
        let response = await fetch(url, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

            },
            method: 'get',
        })
        let responseJson = await response.json();

        return responseJson;
    },
    AsyncMarketData: async () => {
        let url = URL.Url.Market
        let response = await fetch(url, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

            },
            method: 'get',
        })
        let responseJson = await response.json();

        return responseJson;
    },
    AsyncShopData: async () => {
        let url = URL.Url.Shop
        let response = await fetch(url, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

            },
            method: 'get',
        })
        let responseJson = await response.json();

        return responseJson;
    },
    AsyncShopOne: async (id) => {
        let url = URL.Url.Shop
        let response = await fetch(url + "/" + id, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

            },
            method: 'get',
        })
        let responseJson = await response.json();

        return responseJson;
    },
    AsyncBulletin: async () => {
        let url = URL.Url.Bulletin

        let response = await fetch(url, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

            },
            method: 'get',
        })
        let responseJson = await response.json();

        return responseJson;
    },
    AsyncMarketOne: async (id) => {
        let url = URL.Url.Market

        let response = await fetch(url + id, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

            },
            method: 'post',
        })
        let responseJson = await response.json();

        return responseJson;
    },
    AsyncFoodOne: async (id) => {
        let url = URL.Url.Food

        let response = await fetch(url + id, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

            },
            method: 'get',
        })
        let responseJson = await response.json();

        return responseJson;
    },
    AsyncEditFood: async (id, food) => {
        let url = URL.Url.Food
        let jsonBody = JSON.stringify({

            food: food
        })

        let response = await fetch(url + id, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

            },
            method: 'put',
            body: jsonBody
        })
        let responseJson = await response.json();
        console.log(responseJson)
        return responseJson;
    },
    AsyncEditShop: async (id, shop) => {
        let url = URL.Url.Shop
        let jsonBody = JSON.stringify({

            shop: shop
        })

        let response = await fetch(url + "/" + id, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',

            },
            method: 'put',
            body: jsonBody
        })
        let responseJson = await response.json();
        return responseJson;
    },
    AsyncFood: async () => {
        let url = URL.Url.Food

        let response = await fetch(url, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'get',
        })
        let responseJson = await response.json();

        return responseJson;
    },
    AsyncCreateShop: async (shop) => {

        try {
            let jsonBody = JSON.stringify({
                shop: shop
            })

            let url = URL.Url.Shop
            let response = await fetch(url, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "post",
                body: jsonBody
            })
            let respJson = await response.json();
            return respJson;

        } catch (e) {
            console.log(e)
            let msg = {};
            msg.status = 'fail'
            msg.message = 'Network Error'
            return msg;
        }

    },

    AsyncTrackVisit: async (path = window.location.pathname) => {
        try {
            let visitorId = localStorage.getItem('visitor_id');
            if (!visitorId) {
                visitorId = 'v_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
                localStorage.setItem('visitor_id', visitorId);
            }
            const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
            const res = await fetch(URL.Url.Analytics + '/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ visitorId, path, isMobile })
            });
            return await res.json();
        } catch (e) {
            return { status: 'fail' };
        }
    },

    AsyncGetAnalyticsStats: async () => {
        try {
            const res = await fetch(URL.Url.Analytics + '/stats');
            return await res.json();
        } catch (e) {
            return { status: 'fail' };
        }
    },

    // 完整的後台全端管理 CRUD 支援
    AsyncMarketUpdate: async (id, marketData) => {
        try {
            const res = await fetch(`${URL.Url.Market}${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ market: marketData })
            });
            return await res.json();
        } catch (e) {
            return { status: 'fail', message: e.message };
        }
    },

    AsyncMarketDelete: async (id) => {
        try {
            const res = await fetch(`${URL.Url.Market}${id}`, { method: 'DELETE' });
            return await res.json();
        } catch (e) {
            return { status: 'fail', message: e.message };
        }
    },

    AsyncShopUpdate: async (id, shopData) => {
        try {
            const res = await fetch(`${URL.Url.Shop}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ shop: shopData })
            });
            return await res.json();
        } catch (e) {
            return { status: 'fail', message: e.message };
        }
    },

    AsyncShopDelete: async (id) => {
        try {
            const res = await fetch(`${URL.Url.Shop}/${id}`, { method: 'DELETE' });
            return await res.json();
        } catch (e) {
            return { status: 'fail', message: e.message };
        }
    },

    AsyncFoodUpdate: async (id, foodData) => {
        try {
            const res = await fetch(`${URL.Url.Food}${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ food: foodData })
            });
            return await res.json();
        } catch (e) {
            return { status: 'fail', message: e.message };
        }
    },

    AsyncFoodDelete: async (id) => {
        try {
            const res = await fetch(`${URL.Url.Food}${id}`, { method: 'DELETE' });
            return await res.json();
        } catch (e) {
            return { status: 'fail', message: e.message };
        }
    },

    AsyncUserAll: async () => {
        try {
            const res = await fetch(URL.Url.User);
            return await res.json();
        } catch (e) {
            return { status: 'fail', message: e.message };
        }
    },

    AsyncUserDelete: async (id) => {
        try {
            const res = await fetch(`${URL.Url.User}/${id}`, { method: 'DELETE' });
            return await res.json();
        } catch (e) {
            return { status: 'fail', message: e.message };
        }
    },

    AsyncBulletinDelete: async (id) => {
        try {
            const res = await fetch(`${URL.Url.Bulletin}${id}`, { method: 'DELETE' });
            return await res.json();
        } catch (e) {
            return { status: 'fail', message: e.message };
        }
    },

    AsyncSyncTrigger: async () => {
        try {
            const res = await fetch(URL.Url.Sync + '/trigger', { method: 'POST' });
            return await res.json();
        } catch (e) {
            return { status: 'fail', message: e.message };
        }
    },

    AsyncSyncStatus: async () => {
        try {
            const res = await fetch(URL.Url.Sync + '/status');
            return await res.json();
        } catch (e) {
            return { status: 'fail', message: e.message };
        }
    },

    // ==========================================
    // 系統運維、Docker 容器與動態排程 API
    // ==========================================
    AsyncSystemStatus: async () => {
        try {
            const res = await fetch(URL.Url.System + '/status');
            return await res.json();
        } catch (e) {
            return { status: 'fail', message: e.message };
        }
    },

    AsyncSystemSchedulers: async () => {
        try {
            const res = await fetch(URL.Url.System + '/schedulers');
            return await res.json();
        } catch (e) {
            return { status: 'fail', message: e.message };
        }
    },

    AsyncSchedulerToggle: async (jobId) => {
        try {
            const res = await fetch(`${URL.Url.System}/schedulers/${jobId}/toggle`, {
                method: 'POST'
            });
            return await res.json();
        } catch (e) {
            return { status: 'fail', message: e.message };
        }
    },

    AsyncSchedulerUpdate: async (jobId, data) => {
        try {
            const res = await fetch(`${URL.Url.System}/schedulers/${jobId}/update`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await res.json();
        } catch (e) {
            return { status: 'fail', message: e.message };
        }
    },

    AsyncSchedulerTrigger: async (jobId) => {
        try {
            const res = await fetch(`${URL.Url.System}/schedulers/${jobId}/trigger`, {
                method: 'POST'
            });
            return await res.json();
        } catch (e) {
            return { status: 'fail', message: e.message };
        }
    },

    AsyncSystemLogs: async (limit = 100) => {
        try {
            const res = await fetch(`${URL.Url.System}/logs?limit=${limit}`);
            return await res.json();
        } catch (e) {
            return { status: 'fail', message: e.message };
        }
    },

    AsyncSystemLogsClear: async () => {
        try {
            const res = await fetch(`${URL.Url.System}/logs/clear`, {
                method: 'POST'
            });
            return await res.json();
        } catch (e) {
            return { status: 'fail', message: e.message };
        }
    },

    AsyncSystemBackupExportUrl: () => {
        return `${URL.Url.System}/backup/export`;
    },

    AsyncSystemBackupImport: async (backupData) => {
        try {
            const res = await fetch(`${URL.Url.System}/backup/import`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(backupData)
            });
            return await res.json();
        } catch (e) {
            return { status: 'fail', message: e.message };
        }
    },

    AsyncSystemDatabaseSeed: async () => {
        try {
            const res = await fetch(`${URL.Url.System}/database/seed`, {
                method: 'POST'
            });
            return await res.json();
        } catch (e) {
            return { status: 'fail', message: e.message };
        }
    },

    // ==========================================
    // 智慧防爬蟲與惡意請求防禦 (Anti-Crawler & Bot Shield)
    // ==========================================
    AsyncAntiCrawlerStats: async () => {
        try {
            const res = await fetch(`${URL.Url.System}/anticrawler/stats`);
            return await res.json();
        } catch (e) {
            return { status: 'fail', message: e.message };
        }
    },

    AsyncAntiCrawlerUpdateSettings: async (settings) => {
        try {
            const res = await fetch(`${URL.Url.System}/anticrawler/settings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });
            return await res.json();
        } catch (e) {
            return { status: 'fail', message: e.message };
        }
    },

    AsyncAntiCrawlerBlockIp: async (ip, reason, durationMinutes) => {
        try {
            const res = await fetch(`${URL.Url.System}/anticrawler/ip/block`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ip, reason, durationMinutes })
            });
            return await res.json();
        } catch (e) {
            return { status: 'fail', message: e.message };
        }
    },

    AsyncAntiCrawlerUnblockIp: async (ip) => {
        try {
            const res = await fetch(`${URL.Url.System}/anticrawler/ip/unblock`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ip })
            });
            return await res.json();
        } catch (e) {
            return { status: 'fail', message: e.message };
        }
    },

    AsyncAntiCrawlerWhitelistIp: async (ip) => {
        try {
            const res = await fetch(`${URL.Url.System}/anticrawler/ip/whitelist`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ip })
            });
            return await res.json();
        } catch (e) {
            return { status: 'fail', message: e.message };
        }
    }

}

export const functions = {
    loginChecker: (role) => {
        if (role === "user") {

        }

    }
}



export default {
    helper, functions
}