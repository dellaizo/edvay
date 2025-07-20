fetch('./data/events.json')
  .then(response => response.json())
  .then(events => {
    const container = document.getElementById('events-list');
    events.forEach(event => {
      const card = document.createElement('div');
      card.className = 'event-card';
      card.innerHTML = `
        <h3>${event.title}</h3>
        <p>${event.date} — ${event.location}</p>
      `;
      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Ошибка при загрузке мероприятий:', error);
  });