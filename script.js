// Inicializa o mapa centralizado em uma coordenada padrão (São Paulo)
const map = L.map('map').setView([-23.55052, -46.633308], 13);

// Carrega os blocos de mapa gratuitos do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

let alertCount = 0;

// Tenta pegar a geolocalização do usuário via navegador
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      map.setView([latitude, longitude], 15);

      L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup('📍 <b>Sua localização atual</b>')
        .openPopup();
    },
    () => {
      console.log('Permissão de geolocalização negada ou indisponível.');
    }
  );
}

// Escuta cliques no mapa para inserir alertas estilo Waze
map.on('click', (e) => {
  const selectedAlert = document.getElementById('alertType').value;
  const { lat, lng } = e.latlng;

  // Cria um marcador com popup contendo o alerta selecionado
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(`<b>Alerta Reportado:</b><br>${selectedAlert}`)
    .openPopup();

  // Incrementa o contador de alertas
  alertCount++;
  document.getElementById('alertCount').innerText = alertCount;
});
