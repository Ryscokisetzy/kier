import fetch from 'node-fetch';
import fs from 'fs';
import { faker } from '@faker-js/faker';
import * as cheerio from 'cheerio';


const checkIfEmailAvail = (email) => new Promise((resolve, reject) => {
    fetch('https://mover-api-prod.over.network/auth/check/email', {
        method: 'POST',
        headers: {
            'Host': 'mover-api-prod.over.network',
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'User-Agent': 'OverMobile/159 CFNetwork/1408.0.4 Darwin/22.5.0',
            'Client-Version': '1.0.4',
            'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'Content-Length': '30',
            'Accept-Encoding': 'gzip, deflate'
        },
        body: JSON.stringify({
            'email': email
        })
    })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(err => reject(err))
});

const registerApps = (email) => new Promise((resolve, reject) => {
    fetch('https://mover-api-prod.over.network/auth/request', {
        method: 'POST',
        headers: {
            'Host': 'mover-api-prod.over.network',
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'User-Agent': 'OverMobile/159 CFNetwork/1408.0.4 Darwin/22.5.0',
            'Client-Version': '1.0.4',
            'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'Content-Length': '258',
            'Accept-Encoding': 'gzip, deflate'
        },
        body: JSON.stringify({
            'email': email,
            'agreement': {
                'agree_push_alert': true,
                'agree_push_daily_reward': false,
                'agree_marketing': false,
                'agree_marketing_at': null,
                'agree_push_marketing': false,
                'agree_email_marketing': false,
                'push_alert_permission': 'denied'
            },
            'language': 'en'
        })
    })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(err => reject(err))
});

const checkVerified = (verifier) => new Promise((resolve, reject) => {
    fetch('https://mover-api-prod.over.network/auth/signin', {
        method: 'POST',
        headers: {
            'Host': 'mover-api-prod.over.network',
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'User-Agent': 'OverMobile/159 CFNetwork/1408.0.4 Darwin/22.5.0',
            'Client-Version': '1.0.4',
            'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'Content-Length': '566',
            'Accept-Encoding': 'gzip, deflate'
        },
        body: JSON.stringify({
            'timezone': 'Asia/Jakarta',
            'language': 'en',
            'device_os': 'ios',
            'verifier': verifier
        })
    })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(err => reject(err))
});

const dynamicEdit = (bearer, params, value) => new Promise((resolve, reject) => {
    fetch(`https://mover-api-prod.over.network/user/${params}/${value}`, {
        method: 'POST',
        headers: {
            'Host': 'mover-api-prod.over.network',
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': 'OverMobile/159 CFNetwork/1408.0.4 Darwin/22.5.0',
            'Client-Version': '1.0.4',
            'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'Content-Length': '0',
            'Authorization': 'Bearer ' + bearer
        }
    })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(err => reject(err))
});

const dynamicParamsPost = (bearer, params, method = 'POST') => new Promise((resolve, reject) => {
    fetch(`https://mover-api-prod.over.network${params}`, {
        method: method,
        headers: {
            'Host': 'mover-api-prod.over.network',
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip, deflate',
            'User-Agent': 'OverMobile/159 CFNetwork/1408.0.4 Darwin/22.5.0',
            'Client-Version': '1.0.4',
            'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'Content-Length': '0',
            'Authorization': 'Bearer ' + bearer
        }
    })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(err => reject(err))
});

const claimFriends = (bearer, code) => new Promise((resolve, reject) => {
    fetch('https://mover-api-prod.over.network/mission/1/claim', {
        method: 'POST',
        headers: {
            'Host': 'mover-api-prod.over.network',
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Content-Length': '21',
            'Accept-Encoding': 'gzip, deflate',
            'Client-Version': '1.0.4',
            'User-Agent': 'OverMobile/159 CFNetwork/1408.0.4 Darwin/22.5.0',
            'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'Authorization': 'Bearer ' + bearer
        },
        body: JSON.stringify({
            'code': code
        })
    })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(err => reject(err))
});

const getNewToken = (accessToken, refreshToken) => new Promise((resolve, reject) => {
    fetch('https://mover-api-prod.over.network/auth/refresh', {
        method: 'POST',
        headers: {
            'Host': 'mover-api-prod.over.network',
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'User-Agent': 'OverMobile/159 CFNetwork/1408.0.4 Darwin/22.5.0',
            'Client-Version': '1.0.4',
            'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'Content-Length': '300',
            'Accept-Encoding': 'gzip, deflate',
            'Cookie': 'AWSALB=FxbymCOK2EJd4znyIUmBc+LfPFdNJSmpLnWSVzL/fQksQzd6RqI5BdsZgY2zEzoItz6Cl1MSUBX4u9qHs6vGumW4vwLBmW6l75L5i61HGyD3Uf/slZV/OYzaK7RG; AWSALBCORS=FxbymCOK2EJd4znyIUmBc+LfPFdNJSmpLnWSVzL/fQksQzd6RqI5BdsZgY2zEzoItz6Cl1MSUBX4u9qHs6vGumW4vwLBmW6l75L5i61HGyD3Uf/slZV/OYzaK7RG'
        },
        body: JSON.stringify({
            'access_token': accessToken,
            'refresh_token': bearerToken
        })
    })
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(err => reject(err))
});


const getEmailRandom = (email, domain) => new Promise((resolve, reject) => {
    fetch(`https://generator.email/`, {
        method: "get",
        headers: {
            accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
            "accept-encoding": "gzip, deflate, br"
        }
    })
        .then(res => res.text())
        .then(text => {
            const $ = cheerio.load(text);
            const result = [];
            $('.e7m.tt-suggestions').find('div > p').each(function (index, element) {
                result.push($(element).text());
            });
            resolve(result);
        })
        .catch(err => reject(err));
});

const randstr = length =>
    new Promise((resolve, reject) => {
        var text = "";
        var possible =
            "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        resolve(text);
    });

const functionGetLink = (email, domain) => new Promise((resolve, reject) => {
    fetch(`https://generator.email/${domain}/${email}`, {
        method: "get",
        headers: {
            accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
            "accept-encoding": "gzip, deflate, br",
            cookie: `_ga=GA1.2.659238676.1567004853; _gid=GA1.2.273162863.1569757277; embx=%5B%22${email}%40${domain}%22%2C%22hcycl%40nongzaa.tk%22%5D; _gat=1; io=io=tIcarRGNgwqgtn40O${randstr(3)}; surl=${domain}%2F${email}`,
            "upgrade-insecure-requests": 1,
            "user-agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36"
        }
    })
        .then(res => res.text())
        .then(text => {
            const $ = cheerio.load(text);
            const src = $("#m_4844619468105536842stb-container > tbody > tr > td > div > table:nth-child(4) > tbody > tr:nth-child(1) > td > table > tbody > tr > td > table:nth-child(1) > tbody > tr > td > a").attr('href');
            resolve(src);
        })
        .catch(err => reject(err));
});


const emailConfirm = (url) => new Promise((resolve, reject) => {
    fetch(url, {
        method: 'GET',
        redirect: 'manual'
    })
        .then(res => {
            resolve(res.headers.raw()['location'])
        })
        .catch(err => reject(err))
});



(async () => {

    while (true) {
        const domainList = await getEmailRandom();
        const domain = domainList[Math.floor(Math.random() * domainList.length)];
        const firstName = faker.person.firstName().replace(/["']/g, "");
        const lastName = faker.person.lastName().replace(/["']/g, "");
        const email = `${firstName}${lastName}${await randstr(5)}@${domain}`.toLowerCase();
        const name = firstName + await randstr(5);
        const inviteCode = 'VI62HC2FYZ';

        const emailAvailCheck = await checkIfEmailAvail(email);
        if (emailAvailCheck.code === 0) {
            if (emailAvailCheck.data.is_signup === false) {
                const registerResult = await registerApps(email);
                if (registerResult.code === 0) {
                    console.log('Success registering Account : ' + email)
                    const verifierToken = registerResult.data.verifier;

                    console.log('Getting confirmation link...')
                    let linkConfirm;
                    do {
                        linkConfirm = await functionGetLink(email.split('@')[0], email.split('@')[1]);
                    } while (!linkConfirm);
                    console.log('Success : ' + linkConfirm)
                    console.log('Confirming email.....')

                    const resultFirstLocation = await emailConfirm(linkConfirm);
                    if (resultFirstLocation.length > 0) {
                        const resultSecondLocation = await emailConfirm(resultFirstLocation[0]);
                        if (resultSecondLocation.length > 0) {
                            const resultThirdLocation = await emailConfirm(resultSecondLocation[0]);
                            console.log('Success confirming email!')
                        } else {
                            console.log('Failed confirming email!')
                        }
                    } else {
                        console.log('Failed confirming email!')
                    }


                    let checkVerifiedResult;
                    do {
                        checkVerifiedResult = await checkVerified(verifierToken);
                    } while (!checkVerifiedResult.data);

                    console.log('Email confirmed!')

                    // verified
                    const bearerToken = checkVerifiedResult.data.access_token;

                    const editName = await dynamicEdit(bearerToken, 'name', name);
                    if (editName.code === 0) {
                        console.log(`Success edit name!`)
                    } else {
                        console.log(`Failed edit name!`)
                    }

                    const inviteCodeResult = await dynamicEdit(bearerToken, 'invite_code', inviteCode);
                    if (inviteCodeResult.code === 0) {
                        console.log(`Success input invite code!`)
                    } else {
                        console.log(`Failed input invite code!`)
                    }

                    const userClaimInvite = await dynamicParamsPost(bearerToken, '/user/claim/invite');
                    if (userClaimInvite.code === 0) {
                        console.log(`Success user claim!`)
                    } else {
                        console.log(`Failed user claim!`)
                    }

                    const eventClick = await dynamicParamsPost(bearerToken, '/event/1/click');
                    if (eventClick.code === 0) {
                        console.log(`Success event click claim!`)
                    } else {
                        console.log(`Failed event click claim!`)
                    }

                    const dailyClaim = await dynamicParamsPost(bearerToken, '/daily/claim');
                    if (dailyClaim.code === 0) {
                        console.log(`Success daily claim, reward : ${dailyClaim.data.reward}`);
                    } else {
                        console.log(`Failed daily claim!`)
                    }

                    console.log(`Total point : ${dailyClaim.data.point}`);
                    console.log(`Claim your friends manually via apps!`)
                    fs.appendFileSync('./account_registered.txt', email+'\n');

                    // for claiming account utama
                    // const getNewTokenData = await getNewToken();
                    // const accessToken = getNewTokenData.data.access_token;
                    // const claimableFriends = await dynamicParamsPost(accessToken, '/mission/1/claimable_friends', 'GET');
                    // if (claimableFriends.code === 0) {
                    //     if (claimableFriends.data.friends.length > 0) {
                    //         claimableFriends.data.friends.map(async data => {
                    //             const resultClaim = await claimFriends(accessToken, data.code);
                    //             if (resultClaim.code === 0) {
                    //                 console.log('Success claim friends : ' + data.name);
                    //             } else {
                    //                 console.log('Failed claim friends : ' + data.name);
                    //             }
                    //         });
                    //     } else {
                    //         console.log(`Claimable friends not found on first account!`)
                    //     }
                    // } else {
                    //     console.log(`Failed get claimable friends for first account!`)
                    // };

                } else {
                    // gagal register
                    console.log('Failed to register!')
                }
            } else {
                // sudah terdaftar
                console.log('Email has been registered!')
            }
        } else {
            // gagal check email
            console.log('Failed check email!')
        }
        console.log('')
    }

})();