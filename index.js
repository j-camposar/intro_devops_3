const BASE_PATH = "/api/v1/";


async function callApi(endpoint, method = 'GET', body = null) {
    const consoleBox = document.getElementById('console');
    
    // Al no poner IP ni HTTP, el navegador usa la misma IP de donde descargó el HTML
    const url = `/api/v1/${endpoint}`; 

    consoleBox.innerText = `>> Enviando petición interna a: ${url}...`;

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: body ? JSON.stringify(body) : null
        });
        const data = await response.json();
        consoleBox.innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        consoleBox.innerText = `Error: ${error.message}`;
    }
}