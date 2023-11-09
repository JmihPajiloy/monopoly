export function getTimestamp() {
  const now = new Date();
  const ss = now.getSeconds().toString().padStart(2, "0");
  const mm = now.getMinutes().toString().padStart(2, "0");
  const hh = now.getHours().toString().padStart(2, "0");
  return`[${hh}:${mm}:${ss}]`
}



export function getMessageID() {
  return new Date().getMilliseconds()
}

const length = 89
for (let i = 0; i < length; i++) {}

