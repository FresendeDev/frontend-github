function titleComponent() {
  const elemH1 = document.createElement("h1");
  elemH1.innerHTML = "ola mundo";
  return elemH1;
}

document.body.appendChild(titleComponent());
