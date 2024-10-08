async function main() {
  const res = await fetch("http://localhost:3000/api/get_balance", {
    body: JSON.stringify({
      address: "0x8832117053D800DAbD52bC492F9ABf2289689e3e",
      chainId: 1337,
    }),
  });
    const data = await res.json();
    console.log("This is cunt: ", data);
}
main();
