const BASE_PATH = "/api/v1/";

async function callApi(endpoint, method = 'GET', body = null) {
    const log = document.getElementById('responseLog');
    
    // Al usar una ruta relativa, el navegador asume la misma IP/Hostname de la EC2 Pública
    const url = `${BASE_PATH}${endpoint}`;

    log.innerText = `>> Consultando Proxy Nginx: ${method} ${url}...`;

    const options = {
        method: method,
        headers: { 'Content-Type': 'application/json' }
    };

    if (body) options.body = JSON.stringify(body);

    try {
        const response = await fetch(url, options);
        
        // Verificamos si la respuesta es exitosa
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        
        const data = await response.json();
        log.innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        log.innerText = `Error de conexión:\n1. Revisa que Spring Boot esté corriendo en la red privada.\n2. Revisa el Security Group de la capa privada.\n\nDetalle: ${error.message}`;
    }
}