const operate = ['+', '-', '*', '/'];
const square = ['', '^2', '^0.5'];
const triangle = ['', 'sin', 'cos', 'tan'];

export function exercise(total, type) {
  let temp = [];

  for (let i = 0; i < total; ++i) {
    let exercise = '';
    let length = Math.floor(Math.random() * 5 + 1);
    length = length === 1 ? 2 : length;
    for (let j = 0; j < length; ++j) {
      if (type === 3) {
        exercise += triangle[Math.floor(Math.random() * 4)];
      }
      exercise += Math.floor(Math.random() * 100 + 1);
      if (type === 2) {
        exercise += square[Math.floor(Math.random() * 3)];
      }
      if (j !== length - 1) {
        exercise += operate[Math.floor(Math.random() * 4)];
      }
    }
    temp.push(exercise);
  }

  return temp;
}