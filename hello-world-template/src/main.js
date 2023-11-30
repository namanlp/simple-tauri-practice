
const { invoke } = window.__TAURI__.tauri;

let greetInputEl;
let greetMsgEl;


async function greet() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  greetMsgEl.textContent = await invoke("greet", { name: greetInputEl.value });
}

invoke('say_hello')

async function say_hello(){

  document.querySelector("#say-hello").style.color = "#00ffff";
  invoke('say_hello');
}

window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");
  document.querySelector("#greet-form").addEventListener("submit", (e) => {
    e.preventDefault();
    greet();
  });

  document.querySelector("#say-hello").addEventListener("click", (e) =>{
    document.querySelector("#say-hello").textContent = "HELLO WORLD, this is amazing ";
    e.preventDefault();
    say_hello();
  });

});
