const BIN_ID = "DEINE_BIN_ID";   // Hier deine Bin-ID einfügen
const API_KEY = "DEIN_API_KEY";  // Hier deinen JSONBin API-Key einfügen

async function getStats() {
  const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
    headers: { "X-Master-Key": API_KEY }
  });
  const data = await res.json();
  return data.record;
}

async function updateStats(chosenClass) {
  const stats = await getStats();

  stats.totalGames = (stats.totalGames || 0) + 1;

  if (!stats.classes) stats.classes = {};
  if (!stats.classes[chosenClass]) stats.classes[chosenClass] = 0;
  stats.classes[chosenClass] += 1;

  await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY
    },
    body: JSON.stringify(stats)
  });
}
