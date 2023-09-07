document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('crud-form');
    const dataContainer = document.getElementById('data');

    // Получение данных из JSON-файла
    function fetchData() {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                dataContainer.innerHTML = '';
                data.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.innerHTML = `<strong>${item.name}</strong> (${item.email}) <button data-id="${item.id}" class="delete">Удалить</button>`;
                    dataContainer.appendChild(itemDiv);
                });
            });
    }

    // Создание новой записи
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                const newItem = {
                    id: data.length + 1,
                    name: name,
                    email: email
                };

                data.push(newItem);

                return fetch('data.json', {
                    method: 'POST', // Используем POST для создания
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            })
            .then(() => {
                fetchData(); // Обновляем отображение данных
                form.reset();
            });
    });

    // Удаление записи
    dataContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete')) {
            const id = e.target.getAttribute('data-id');

            fetch('data.json')
                .then(response => response.json())
                .then(data => {
                    const newData = data.filter(item => item.id !== parseInt(id));

                    return fetch('data.json', {
                        method: 'POST', // Используем POST для обновления
                        body: JSON.stringify(newData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                })
                .then(() => {
                    fetchData(); // Обновляем отображение данных
                });
        }
    });


    // Загрузка данных при запуске приложения
    fetchData();
});
