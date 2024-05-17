document.getElementById('getLocationBtn').addEventListener('click', function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
                document.getElementById('locationOutput').innerHTML = "Геолокация не поддерживается этим браузером.";
            }
        });

        function showPosition(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var accuracy = position.coords.accuracy;
            document.getElementById('locationOutput').innerHTML = "Широта: " + latitude + "<br>Долгота: " + longitude + "<br>Точность: " + accuracy + " метров";

            // Запрос на обратное геокодирование
            var apiKey = '37a459aba6cc4c2284684057687cff3b';
            var geocodingUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

            fetch(geocodingUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.results.length > 0) {
                        var address = data.results[0].formatted;
                        document.getElementById('addressOutput').innerHTML = "Адрес: " + address;
                    } else {
                        document.getElementById('addressOutput').innerHTML = "Не удалось получить адрес.";
                    }
                })
                .catch(error => {
                    document.getElementById('addressOutput').innerHTML = "Произошла ошибка: " + error;
                });
        }

        function showError(error) {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    document.getElementById('locationOutput').innerHTML = "Пользователь отказал в запросе на геолокацию.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    document.getElementById('locationOutput').innerHTML = "Информация о местоположении недоступна.";
                    break;
                case error.TIMEOUT:
                    document.getElementById('locationOutput').innerHTML = "Запрос на получение местоположения превысил лимит времени.";
                    break;
                case error.UNKNOWN_ERROR:
                    document.getElementById('locationOutput').innerHTML = "Произошла неизвестная ошибка.";
                    break;
            }
        }
