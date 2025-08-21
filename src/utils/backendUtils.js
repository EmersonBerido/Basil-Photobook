export async function getDatabaseEntries()
{
  let data = [];
  await fetch("https://basil-photobook.onrender.com/entries")
      .then(res => res.json())
      .then(entries => data = entries)
      .catch(err => console.error("Unable to connect to backend", err))

  return data;
}