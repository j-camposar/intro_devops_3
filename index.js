const BASE_PATH = "/api/v1/";

window.onload = function() {
    const savedIP = localStorage.getItem('server_ip');
    const statusMsg = document.getElementById('statusMsg');
    const dashboard = document.getElementById('dashboard');

    if (savedIP) {
        statusMsg.innerHTML = `✅ Conectado a: <strong>http://${savedIP}${BASE_PATH}</strong>`;
        statusMsg.style.color = "#27ae60";
        dashboard.style.display = "grid"; // Mostrar botones
    } else {
        statusMsg.innerHTML = "❌ IP no configurada. Por favor, ingresa una para continuar.";
        statusMsg.style.color = "#e74c3c";
    }
};

function saveConfig() {
    const ip = document.getElementById('ipInput').value.trim();
    if (ip) {
        localStorage.setItem('server_ip', ip);
        window.location.reload(); // Reinicia para aplicar cambios
    }
}

async function callApi(endpoint, method = 'GET', body = null) {
    const ip = localStorage.getItem('server_ip');
    const log = document.getElementById('responseLog');
    const url = `http://${ip}${BASE_PATH}${endpoint}`;

    log.innerText = `Consultando: ${method} ${url}...`;

    const options = {
        method: method,
        headers: { 'Content-Type': 'application/json' }
    };

    if (body) options.body = JSON.stringify(body);

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        log.innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        log.innerText = `Error: No se pudo conectar a la API. \nDetalle: ${error.message}`;
    }
}