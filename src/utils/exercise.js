const {ipcRenderer} = window.electron;

const operate = ['+', '-', '*', '/'];
const square = ['', '^2', '^0.5'];
const triangle = ['', 'sin', 'cos', 'tan'];
const brackets = ['', '(', ')'];

export function exercise(total, type, name) {
  ipcRenderer.send('check', {
    name,
    type
  });
  return new Promise((resolve => {
    ipcRenderer.on('check-reply', ((event, args) => {
      let temp = [];

      for (let i = 0; i < total;) {
        let isBracket = false;
        let exercise = '';
        let length = Math.floor(Math.random() * 5 + 1);
        length = length === 1 ? 2 : length;
        for (let j = 0; j < length; ++j) {
          if (type === 3) {
            exercise += triangle[Math.floor(Math.random() * 4)];
          }
          if (length >= 3 && !isBracket && j !== length - 1 && j !== 0) {
            let flag = Math.floor(Math.random() * 2);
            if (flag === 1) {
              isBracket = true;
              exercise += brackets[flag];
            }
          }
          exercise += Math.floor(Math.random() * 100 + 1);
          if (type === 2) {
            exercise += square[Math.floor(Math.random() * 3)];
          }
          if (j !== length - 1) {
            exercise += operate[Math.floor(Math.random() * 4)];
          }
        }

        if (isBracket) {
          exercise += brackets[2];
        }

        if (!args.includes(exercise)) {
          temp.push(exercise);
          i++;
        }
      }

      resolve(temp);
    }));
  }));
}