import { audio } from './audio.js';
import { theme } from './theme.js';
import { comment } from './comment.js';
import { storage } from './storage.js';
import { request, HTTP_GET } from './request.js';

export const util = (() => {

    const opacity = (id, speed = 0.01) => {
        const element = document.getElementById(id);
        let op = parseInt(element.style.opacity);

        let clear = null;
        clear = setInterval(() => {
            if (op > 0) {
                element.style.opacity = op.toString();
                op -= speed;
            } else {
                clearInterval(clear);
                clear = null;
                element.remove();
            }
        }, 10);
    };

    const escapeHtml = (unsafe) => {
        return unsafe
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    };

    const disableButton = (button, message = 'Loading..') => {

        button.disabled = true;
        let tmp = button.innerHTML;
        button.innerHTML = message;

        const restore = () => {
            button.innerHTML = tmp;
            button.disabled = false;
        };

        return {
            restore,
        };
    };

    const animate = (svg, timeout, classes) => {
        let handler = null;
        handler = setTimeout(() => {
            svg.classList.add(classes);
            handler = null;
        }, timeout);
    };


    const guest = () => {
        const name = (new URLSearchParams(window.location.search)).get('to');

        if (!name) {
            
            const reqeustMsg = `<div class="card-body border rounded-4 shadow p-3 m-3 aos-init aos-animate" data-aos="fade-left" data-aos-duration="1500" > <h1 class="sectionEng ft-crimsonpro mb-0" >Message</h1> <h1 class="sectionHead ft-opti" >メッセージ</h1> <p class="ft-opti mt-3 mb-4" style="font-size: 1rem;">
            当日は5階クロークにお荷物お預けいただき<br>
            受付のお時間になりましたら<br>
            9階の受付までお越しくださいませ<br><br>

            お着替えは4階更衣空をご利用ください<br><br>

            お車でお越しの場合は<br>
            ホテル併設の駐車場予約が可能ですので<br>
            前日までに新郎新婦へ申し付けください
            </p> </div>`


            const receptionTime = `
            <h1 class="ft-opti" style="font-size: 1.1rem;font-weight:bold">受付</h1>
            <p>14:30　7階 ー 木漏日</p>
            `
            document.getElementById('reception-time').innerHTML =　receptionTime
            document.getElementById('req-message').innerHTML = reqeustMsg;
            document.getElementById('family-reception').style.display = "none"
            document.getElementById('family-photo').style.display = "none"
            return;
        }else if(name=="family"){
            const receptionTime = `
            <h1 class="ft-opti" style="font-size: 1.1rem;font-weight:bold">受付</h1>
            <p>14:00　7階 ー 木漏日</p>
            `
            const reqeustMsg = `<div class="card-body border rounded-4 shadow p-3 m-3 aos-init aos-animate" data-aos="fade-left" data-aos-duration="1500" > <h1 class="sectionEng ft-crimsonpro mb-0" >Message</h1> <h1 class="sectionHead ft-opti" >メッセージ</h1> <p class="ft-opti mt-3 mb-4" style="font-size: 1rem;">
            親戚の皆様<br><br>
            13:30から親戚待機室（5階）<br>
            をご利用いただけます<br>
            15:30に親戚の集合写真撮影があります（6階）</p></div>`

            const familyReception = `
            <h1 class="ft-opti" style="font-size: 1.1rem;font-weight:bold">親戚控え室</h1>
            <p>13:30　5階</p>
            `
            const familyPhoto = `
            <h1 class="ft-opti" style="font-size: 1.1rem;font-weight:bold">親族団体撮影</h1>
            <p>15:30　6階 ー Studio</p>
            `
            document.getElementById('reception-time').innerHTML =　receptionTime
            document.getElementById('req-message').innerHTML = reqeustMsg;
            document.getElementById('family-reception').innerHTML = familyReception;
            document.getElementById('family-photo').innerHTML = familyPhoto;
        }else if(name=="natsuki"){
            const receptionTime = `
            <h1 class="ft-opti" style="font-size: 1.1rem;font-weight:bold">受付</h1>
            <p>14:30　7階 ー 木漏日</p>
            `

            const reqeustMsg = `<div class="card-body border rounded-4 shadow p-3 m-3 aos-init aos-animate" data-aos="fade-left" data-aos-duration="1500" > <h1 class="sectionEng ft-crimsonpro mb-0" >REQUEST</h1> <h1 class="sectionHead ft-opti" >お願い</h1> <p class="ft-opti mt-3 mb-4" style="font-size: 1rem;">
            夏樹へ<br>
            結婚式には、ぜひ夏樹に友人代表として<br>
            スピーチをお願いしたいと思っています<br>
            特別な日に夏樹の温かい言葉で<br>
            祝福していただけたら嬉しいです<br>
            どうぞよろしくお願いします！<br>
            </p> </div>`

            document.getElementById('reception-time').innerHTML =　receptionTime
            document.getElementById('req-message').innerHTML = reqeustMsg;
            document.getElementById('family-reception').style.display = "none"
            document.getElementById('family-photo').style.display = "none"
        }else if(name=="kachi"){

            const receptionTime = `
            <h1 class="ft-opti" style="font-size: 1.1rem;font-weight:bold">受付</h1>
            <p>14:30　7階 ー 木漏日</p>
            `

            const reqeustMsg = `<div class="card-body border rounded-4 shadow p-3 m-3 aos-init aos-animate" data-aos="fade-left" data-aos-duration="1500" > <h1 class="sectionEng ft-crimsonpro mb-0" >REQUEST</h1> <h1 class="sectionHead ft-opti" >お願い</h1> <p class="ft-opti mt-3 mb-4" style="font-size: 1rem;">
            可知さん<br>
            結婚式には、ぜひ乾杯をお願いしたいと思っています<br>
            特別な日に可知さんの温かい言葉で<br>
            祝福していただけたら嬉しいです<br>
            どうぞよろしくお願いします！<br>
            </p> </div>`

            document.getElementById('reception-time').innerHTML =　receptionTime
            document.getElementById('req-message').innerHTML = reqeustMsg;
            document.getElementById('family-reception').style.display = "none"
            document.getElementById('family-photo').style.display = "none"
        }

        // const div = document.createElement('div');
        // div.classList.add('m-2');
        // div.innerHTML = `<p class="mt-0 mb-1 mx-0 p-0">${guest.getAttribute('data-message')}</p><h2 class="">${escapeHtml(name)}</h2>`;

        // guest.appendChild(div);
    };

    const show = () => {
        guest();
        opacity('loading', 0.025);
        window.scrollTo(0, 0);
    };

    const modal = (element) => {

        const backgroundImage = element.style.backgroundImage;
        // url() 포맷에서 URL을 추출
        const urlMatch = backgroundImage.match(/url\("(.+)"\)/);
        const imageUrl = urlMatch ? urlMatch[1] : '';

        
        document.getElementById('show-modal-image').src = imageUrl;
        (new bootstrap.Modal('#modal-image')).show();
    };

    const countDownDate = () => {
        const until = document.getElementById('count-down').getAttribute('data-time').replace(' ', 'T');
        const count = (new Date(until)).getTime();

        setInterval(() => {
            const distance = Math.abs(count - (new Date()).getTime());

            document.getElementById('day').innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
            document.getElementById('hour').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            document.getElementById('minute').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById('second').innerText = Math.floor((distance % (1000 * 60)) / 1000);
        }, 1000);
    };

    const copy = async (button, message, timeout = 1500) => {
        try {
            await navigator.clipboard.writeText(button.getAttribute('data-copy'));
        } catch {
            alert('Failed to copy');
            return;
        }

        button.disabled = true;
        let tmp = button.innerText;
        button.innerText = message;

        let clear = null;
        clear = setTimeout(() => {
            button.disabled = false;
            button.innerText = tmp;

            clearTimeout(clear);
            clear = null;
            return;
        }, timeout);
    };

    const animation = () => {
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const colors = ["#FFC0CB", "#FF1493", "#C71585"];

        const randomInRange = (min, max) => {
            return Math.random() * (max - min) + min;
        };

        const heart = confetti.shapeFromPath({
            path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z',
            matrix: [0.03333333333333333, 0, 0, 0.03333333333333333, -5.566666666666666, -5.533333333333333]
        });

        (function frame() {
            const timeLeft = animationEnd - Date.now();

            colors.forEach((color) => {
                confetti({
                    particleCount: 1,
                    startVelocity: 0,
                    ticks: Math.max(50, 75 * (timeLeft / duration)),
                    origin: {
                        x: Math.random(),
                        y: Math.abs(Math.random() - (timeLeft / duration)),
                    },
                    zIndex: 1057,
                    colors: [color],
                    shapes: [heart],
                    drift: randomInRange(-0.5, 0.5),
                    gravity: randomInRange(0.5, 1),
                    scalar: randomInRange(0.5, 1),
                });
            });

            if (timeLeft > 0) {
                requestAnimationFrame(frame);
            }
        })();
    };

    const storeConfig = async (token) => {
        storage('session').set('token', token);

        const config = storage('config');
        return await request(HTTP_GET, '/api/config')
            .token(token)
            .then((res) => {
                for (let [key, value] of Object.entries(res.data)) {
                    config.set(key, value);
                }

                return res.code;
            });
    };
    const send = async (button) =>{

        var form = document.getElementById('phonenumber').value;
    
        console.log(form);
        button.disabled = true;
        confetti({
            origin: { y: 1 },
            zIndex: 1057
        });

        theme.check();
        AOS.init();
        audio.play();
        document.querySelector('body').style.overflowY = 'scroll';

        if (localStorage.getItem('alertClosed')) {
            document.getElementById('information').style.display = 'none';
        }
        countDownDate();
        audio.showButton();
        document.getElementById('button-theme').style.display = 'block';

        const token = document.querySelector('body').getAttribute('data-key');
        const status = await storeConfig(token);
        if (status === 200) {
            animation();
            comment.comment();
        }
        event.preventDefault(); 

    }
    const open = async (button) => {
        button.disabled = true;
        confetti({
            origin: { y: 1 },
            zIndex: 1057
        });

        theme.check();
        AOS.init();
        audio.play();
        document.querySelector('body').style.overflowY = 'scroll';

        if (localStorage.getItem('alertClosed')) {
            document.getElementById('information').style.display = 'none';
        }

        opacity('welcome', 0.025);
        countDownDate();
        audio.showButton();
        document.getElementById('button-theme').style.display = 'block';

        const token = document.querySelector('body').getAttribute('data-key');
        const status = await storeConfig(token);
        if (status === 200) {
            animation();
            comment.comment();
        }
    };

    return {
        open,
        send,
        copy,
        show,
        modal,
        opacity,
        animate,
        animation,
        escapeHtml,
        countDownDate,
        disableButton,
    }
})();