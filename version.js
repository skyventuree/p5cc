const VERSION = '3.1.3.3';

document.getElementById('version-number').innerHTML = VERSION;

if (!document.cookie.includes('version')) document.cookie = `version=0;path=/`;

const VCBOOL = /version=([^;]+)/.test(document.cookie) || false;
const VCINFO = document.cookie.split(';').find(e => e.includes('version=')).split('=')[1];

if (VCBOOL === false || VCINFO !== VERSION) {
    console.warn('Version mismatch! Show update infomation.');
    
    document.cookie = `version=${VERSION}; max-age=31536000`;
    document.getElementById('notice-bg').style.display = 'block';
    document.getElementById('notice-bg').addEventListener('click', function() {
    });
}

document.getElementById('notice-bg').style.display = 'none';

