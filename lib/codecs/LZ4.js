const type = 99
const LZ4 = require('lz4');
let mpdec = null;

function init(mpd) {
  mpdec = mpd;
}

function decode (buf) {
  if(buf[0] != 210)
    return false;
  const outlen = buf[1] << 24 | buf[2] << 16 | buf[3] << 8 | buf[4];
  const out = Buffer.alloc(outlen);
  const outsize = LZ4.decodeBlock(buf.slice(5), out);  
  return mpdec(out);
}

module.exports = { type, decode, init}
