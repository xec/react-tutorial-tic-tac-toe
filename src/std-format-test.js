const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
[1, 2, 3].forEach(async (num) => {
  await waitFor(50);
  console.log(num);
});
console.log('Done');