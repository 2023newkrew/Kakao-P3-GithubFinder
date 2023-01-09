import "@styles/style.scss";

async function aa() {
  const response = await (await fetch(`https://api.github.com/users/ksnd0297`)).json();
  console.log(response);
}
