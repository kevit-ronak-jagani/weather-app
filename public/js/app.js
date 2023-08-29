console.log("Client side js loaded");

async function fetchData(location) {
    try {
        const res = await fetch("http://localhost:3000/weather?address=" + location)
        const data = await res.json();
        if (!data.error) {
            m1.textContent = data.location;
            m2.textContent = data.forecast;
        }
        else {
            m1.textContent = data.error;
        }
    }
    catch (err) {
        console.log(err);
    }
}

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const m1 = document.querySelector("#message1");
const m2 = document.querySelector("#message2");


weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const loc = search.value;
    m1.textContent = "Loading...";
    m2.textContent = "";

    fetchData(loc);
})