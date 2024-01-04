// わからなかったため、chatGPTを利用して解いた
export function convertNewline(str) {
    // LFをCR+LFに、CR+LFをLFに変換
    return str.replace(/\r?\n/g, (match) => (match === '\n' ? '\r\n' : '\n'));
  }  