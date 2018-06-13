import * as functions from 'firebase-functions';

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const roll = functions.https.onRequest((req, res) => {
  console.log(req.body);
  const target: number = req.body.target;
  const pool: number = req.body.pool;
  const results = Array.from(Array(pool), _ => random(1, 10));
  const botchCount = results.filter(n => n === 1).length;
  const successCount = results.filter(n => n >= target).length - botchCount;
  const isBotch = successCount < 0;
  res.send(
    `Results: [${results.join(', ')}] : ${
      successCount > 0
        ? `${successCount} successes!`
        : isBotch
          ? 'Botched!'
          : 'Failed!'
    }`,
  );
});
