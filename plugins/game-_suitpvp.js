let handler = m => m
handler.before = async function (m) {
this.suit = this.suit ? this.suit : {}
if (db.data.users[m.sender].suit < 0) db.data.users[m.sender].suit = 0
let room = Object.values(this.suit).find(room => room.id && room.status && [room.p, room.p2].includes(m.sender))
if (room) {
let win = ''
let tie = false
if (m.sender == room.p2 && /^(acc(ept)?|terima|aceptar|gas|aceptare?|nao|gamau|rechazar|ga(k.)?bisa)/i.test(m.text) && m.isGroup && room.status == 'wait') {
if (/^(tolak|gamau|rechazar|ga(k.)?bisa)/i.test(m.text)) {
let textno = `*[ā] @${room.p2.split`@`[0]} ššššššÆš¤ šš” š„š«š„, šš” ššŖššš¤šØ šØš ššš£ššš”š*`
m.reply(textno, null, {mentions: this.parseMention(textno)})
delete this.suit[room.id]
return !0 }
room.status = 'play'
room.asal = m.chat
clearTimeout(room.waktu)
let textplay = `š® šš¼ššš - ššš - šš¼ššš š®\n\nāā šš” ššŖššš¤šØ šš¤š¢ššš£šÆš, š”ššØ š¤š„ššš¤š£ššØ ššš£ šØššš¤ šš£š«šššššØ š š”š¤šØ šššš©šØ š„š§šš«ššš¤šØ šš @${room.p.split`@`[0]} š® @${room.p2.split`@`[0]}\n\nā ššš”ššššš¤š£šš£ šŖš£š š¤š„ššš¤š£ šš£ šØšŖšØ šššš© š„š§šš«ššš¤, š§ššØš„ššš©šš«šš¢šš£š©š\n*ā¢ šš”šššš§ š¤š„ššš¤š£ wa.me/${conn.user.jid.split`@`[0]}*`
m.reply(textplay, m.chat, {mentions: this.parseMention(textplay)})
let imgplay = `https://www.merca2.es/wp-content/uploads/2020/05/Piedra-papel-o-tijera-0003318_1584-825x259.jpeg`    
if (!room.pilih) this.sendHydrated(room.p, 'šš¤š§ ššš«š¤š§ šØšš”ššššš¤š£š šŖš£š šš š”ššØ šØšššŖššš£š©ššØ š¤š„ššš¤š£ššØ', `Ganador +${room.poin}XP\nPerdedor ${room.poin_lose}XP`, imgplay, null, null, null, null, [['PIEDRA šæ', 'Piedra'], ['PAPEL š', 'Papel'], ['TIJERA āļø', 'Tijera']], m)
if (!room.pilih2) this.sendHydrated(room.p2, 'šš¤š§ ššš«š¤š§ šØšš”ššššš¤š£š šŖš£š šš š”ššØ šØšššŖššš£š©ššØ š¤š„ššš¤š£ššØ', `Ganador +${room.poin}XP\nPerdedor ${room.poin_lose}XP`, imgplay, null, null, null, null, [['PIEDRA šæ', 'Piedra'], ['PAPEL š', 'Papel'], ['TIJERA āļø', 'Tijera']], m)                             
room.waktu_milih = setTimeout(() => {
if (!room.pilih && !room.pilih2) this.sendButton(m.chat, `[ā] ššš£ššŖš£ ššŖšššš¤š§ š©š¤š¢š¤ š”š šš£ššššš©šš«š šš šš¢š„ššÆšš§ šš” ššŖššš¤, šš” š„š«š„ šØš šš ššš£ššš”ššš¤`, wm, null, [['OK', '.ok']], m)
else if (!room.pilih || !room.pilih2) {
win = !room.pilih ? room.p2 : room.p 
let textnull = `*[ā] @${(room.pilih ? room.p2 : room.p).split`@`[0]}  šš¤ šš”ššššØš©š š£šš£ššŖš£š š¤š„ššš¤š£, ššš£ ššš” š„š«š„*`
this.sendButton(m.chat, textnull, wm, null, [['ok', '.ok']], m, { mentions: this.parseMention(textnull)})
db.data.users[win == room.p ? room.p : room.p2].exp += room.poin
db.data.users[win == room.p ? room.p : room.p2].exp += room.poin_bot
db.data.users[win == room.p ? room.p2 : room.p].exp -= room.poin_lose
}
delete this.suit[room.id]
return !0
}, room.timeout)}
let jwb = m.sender == room.p
let jwb2 = m.sender == room.p2
let g = /tijera/i
let b = /piedra/i
let k = /papel/i
let reg = /^(tijera|piedra|papel)/i
if (jwb && reg.test(m.text) && !room.pilih && !m.isGroup) {
room.pilih = reg.exec(m.text.toLowerCase())[0]
room.text = m.text
m.reply(`*[ ā ] šššØ šš”ššššš¤ ${m.text}, šššš§ššØš šš” šš§šŖš„š¤ š® ${room.pilih2 ? `ššš«ššØš š”š¤šØ š§ššØšŖš”š©ššš¤šØ*` : 'ššØš„šš§š š”š¤šØ š§ššØšŖš”š©ššš¤šØ*'}`)
if (!room.pilih2) this.reply(room.p2, '*[ā]  šš” š¤š„š¤š£šš£š©š šš šš”ššššš¤, ššØ š©šŖ š©šŖš§š£š¤ šš šš”šššš§!!*', 0)}
if (jwb2 && reg.test(m.text) && !room.pilih2 && !m.isGroup) {
room.pilih2 = reg.exec(m.text.toLowerCase())[0]
room.text2 = m.text
m.reply(`*[ ā ] šššØ šš”ššššš¤ ${m.text}, šššš§ššØš šš” šš§šŖš„š¤ š® ${room.pilih ? `ššš«ššØš š”š¤šØ š§ššØšŖš”š©ššš¤šØ*` : 'ššØš„šš§š š”š¤šØ š§ššØšŖš”š©ššš¤*'}`)
if (!room.pilih) this.reply(room.p, '*[ā] šš” š¤š„š¤š£šš£š©š šš šš”ššššš¤, ššØ š©šŖ š©šŖš§š£š¤ šš šš”šššš§!!*', 0)}
let stage = room.pilih
let stage2 = room.pilih2
if (room.pilih && room.pilih2) {
clearTimeout(room.waktu_milih)
if (b.test(stage) && g.test(stage2)) win = room.p
else if (b.test(stage) && k.test(stage2)) win = room.p2
else if (g.test(stage) && k.test(stage2)) win = room.p
else if (g.test(stage) && b.test(stage2)) win = room.p2
else if (k.test(stage) && b.test(stage2)) win = room.p
else if (k.test(stage) && g.test(stage2)) win = room.p2
else if (stage == stage2) tie = true 
this.reply(room.asal, `
*š ššššššš¼šæšš šæšš ššš š*${tie ? '\n*āā šššš¼šš!!*' : ''}

*@${room.p.split`@`[0]} (${room.text}) ${tie ? '' : room.p == win ? ` šš¼ šš¼šš¼šæš š„³ +${room.poin}XP*` : ` šš¼ ššššæššæš š¤” ${room.poin_lose}XP*`}
*@${room.p2.split`@`[0]} (${room.text2}) ${tie ? '' : room.p2 == win ? ` šš¼ šš¼šš¼šæš š„³ +${room.poin}XP*` : ` šš¼ ššššæššæš š¤” ${room.poin_lose}XP*`}
`.trim(), m, { mentions: [room.p, room.p2] } )
if (!tie) {
db.data.users[win == room.p ? room.p : room.p2].exp += room.poin
db.data.users[win == room.p ? room.p : room.p2].exp += room.poin_bot
db.data.users[win == room.p ? room.p2 : room.p].exp += room.poin_lose
}
delete this.suit[room.id]}}
return !0
}
handler.exp = 0
export default handler
function random(arr) {
return arr[Math.floor(Math.random() * arr.length)]}









