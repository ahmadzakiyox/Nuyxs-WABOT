const { facebookdlv2, youtubedl, tiktokdl, savefrom, twitterdl } = require('@bochilteam/scraper');
const fs = require('fs');
const { getBuffer } = require('../myfunc');

exports.download = async (link, hisoka, m, command) => {
    hisoka.sendMessage(m.from, { text: '*_Proses Download...._*' }, { quoted: m })
    if (command == 'ytmp4' || command == 'youtubemp4') {
        youtubedl(link).then(async (res) => {
            console.log(res);
            if (res.video['480p'] != undefined) {
                var captios = `*YOUTUBE MP4*\n\n_Judul_ : ${res.title}\n\n_Resolusi_ : ${res.video['480p'].quality}\n\n_Size_ : ${res.video['480p'].fileSizeH}`
                var uri = await res.video['480p'].download()
                hisoka.sendMessage(m.from, { video: { url: uri }, caption: captios }, { quoted: m })
            } else if (res.video['360p'] != undefined) {
                var captios = `*YOUTUBE MP4*\n\n_Judul_ : ${res.title}\n\n_Resolusi_ : ${res.video['360p'].quality}\n\n_Size_ : ${res.video['360p'].fileSizeH}`
                var uri = await res.video['360p'].download()
                hisoka.sendMessage(m.from, { video: { url: uri }, caption: captios }, { quoted: m })
            } else if (res.video['720p'] != undefined) {
                var captios = `*YOUTUBE MP4*\n\n_Judul_ : ${res.title}\n\n_Resolusi_ : ${res.video['720p'].quality}\n\n_Size_ : ${res.video['720p'].fileSizeH}`
                var uri = await res.video['720p'].download()
                hisoka.sendMessage(m.from, { video: { url: uri }, caption: captios }, { quoted: m })
            }
        }).catch(err => {
            hisoka.sendMessage(m.from, { text: '_*Proses Download Gagal....*_\n\nSilahkan kirim link yang valid.' }, { quoted: m })
        })
    } else if (command == 'ytmp3' || command == 'youtubemp3') {
        youtubedl(link).then(async (res) => {
            console.log(res.audio);
            if (res.audio['128kbps'] != undefined) {
                var captios = `*YOUTUBE MP3*\n\n_Judul_ : ${res.title}\n\n_Resolusi_ : ${res.audio['128kbps'].quality}\n\n_Size_ : ${res.audio['128kbps'].fileSizeH}`
                var mp3 = await res.audio['128kbps'].download();
                var buf = await getBuffer(mp3)
                fs.writeFileSync('./lagu.mp3', buf)
                hisoka.sendMessage(m.from, { document: { url: 'lagu.mp3' }, mimetype: 'audio/mpeg', fileName: `${res.title}.mp3`, caption: captios }, { quoted: m })
                setTimeout(function () {
                    fs.unlinkSync('lagu.mp3')
                }, 10000)
            } else {
                hisoka.sendMessage(m.from, { text: 'Mp3 tidak tersedia dilink ini.' }, { quoted: m })
            }
        }).catch(err => {
            hisoka.sendMessage(m.from, { text: '_*Proses Download Gagal....*_\n\nSilahkan kirim link yang valid.' }, { quoted: m })
        })
    } else if (command == 'fb' || command == 'facebook') {
        facebookdlv2(link).then(async (res) => {
            if (res.result[0].quality == '720p') {
                hisoka.sendMessage(m.from, { video: { url: res.result[1].url }, caption: '*_FACEBOOK DOWNLOAD_*\n\n_Resolusi_ : ' + res.result[1].quality }, { quoted: m })
            } else if (res.result[0].quality == '360p') {
                hisoka.sendMessage(m.from, { video: { url: res.result[0].url }, caption: '*_FACEBOOK DOWNLOAD_*\n\n_Resolusi_ : ' + res.result[0].quality }, { quoted: m })
            } else {
                hisoka.sendMessage(m.from, { video: { url: res.result[0].url }, caption: '*_FACEBOOK DOWNLOAD_*\n\n_Resolusi_ : ' + res.result[0].quality }, { quoted: m })
            }

        }).catch(err => {
            hisoka.sendMessage(m.from, { text: '_*Proses Download Gagal....*_\n\nSilahkan kirim link yang valid.' }, { quoted: m })
        })
    } else if (command == 'ig' || command == 'instagram') {
        savefrom(link).then(async (res) => {
            console.log(res[0].url);
            var captios = `*INSTAGRAM*\n\n_Judul_ : ${res.title}\n\n_Resolusi_ : ${res.medias[0].quality}\n\n_Size_ : ${res.medias[0].formattedSize}`
            hisoka.sendMessage(m.from, { video: { url: res[0].url[0].url }, caption: '*_Done..._*' }, { quoted: m })
        }).catch(err => {
            hisoka.sendMessage(m.from, { text: '_*Proses Download Gagal....*_\n\nSilahkan kirim link yang valid.' }, { quoted: m })
        })
    } else if (command == 'tt' || command == 'tiktok') {
        tiktokdl(link).then(async (res) => {
            console.log(res);
            var captions = `*TIKTOK*\n\n_nickname_ : ${res.author.nickname}`
            hisoka.sendMessage(m.from, { video: { url: res.video.no_watermark_hd }, caption: captions }, { quoted: m })
        }).catch(err => {
            hisoka.sendMessage(m.from, { text: '_*Proses Download Gagal....*_\n\nSilahkan kirim link yang valid.' }, { quoted: m })
        })
    } else if (command == 'twit' || command == 'twitter') {
        twitterdl(link).then(async (res) => {
            console.log(res);
            hisoka.sendMessage(m.from, { video: { url: res[0].url }, caption: `*TWITTER*\n\n_Resolusi_ : ${res[0].quality}` }, { quoted: m })
        }).catch(err => {
            hisoka.sendMessage(m.from, { text: '_*Proses Download Gagal....*_\n\nSilahkan kirim link yang valid.' }, { quoted: m })
        })
    }


}
exports.artinama = async (query, hisoka, m) => {
    artinama(query).then((res) => {
        hisoka.sendMessage(m.from, { text: res }, { quoted: m })
    })
}