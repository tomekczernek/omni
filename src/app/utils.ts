export function delayText(func: (e: React.ChangeEvent<HTMLInputElement>) => void, timeout: number = 300){
    let timer;
    return (...text) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, text); }, timeout);
    };
  }
  
