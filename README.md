# St1xee Music

![Java Version](https://img.shields.io/badge/Java-19-blue)
![Spring Boot Version](https://img.shields.io/badge/Spring%20Boot-3.0.5-green)
![MySQL Version](https://img.shields.io/badge/MySQL-8.0.32-blue)

St1xee Music - це музичний сервіс, який надає користувачам можливість слухати музику, відкривати нових артистів та створювати власні плейлисти. Сервіс також пропонує функціонал для артистів, де вони можуть завантажувати свої альбоми та треки. Сервіс схожий на популярні музичній сервіси такі, як Spotify.

## Структура проекту
Проект має наступну структуру пакетів:  

ャ `api`: контролери для обробки запитів API.  

ャ `configuration`: класи конфігурації, зокрема, `SecurityConfig`.  

ャ `controllers`: головний контролер та контролер авторизації.  

ャ `DTO`: об'єкти передачі даних для об'єктів моделей.  

ャ `enums`: перерахування `Roles` для користувачів.  

ャ `models`: об'єкти моделей, такі як `Album`, `ArtistOrder`, і т.д.  

ャ `repositories`: інтерфейси репозиторіїв для роботи з базою даних.  

ャ `services`: сервіси для роботи з бізнес-логікою, такі як `AlbumService`, `UserService`, і т.д.

## Залежності
Проект побудований з використанням Spring Boot та включає такі основні залежності:
ャ Spring Boot Web  

ャ Spring Boot Security  

ャ Spring Boot Data JPA  

ャ MySQL Connector  

ャ Lombok  

ャ Jaudiotagger

## Запуск проекту
Для запуску проекту, впевніться, що встановлено Java 19. Використовуйте Maven для збірки та запуску:  

ャ bash  

ャ mvn clean install  

ャ java -jar target/music-0.0.1-SNAPSHOT.jar  

ャ Сервіс буде доступний за адресою http://localhost:8080.

## Функціональні можливості
ャ Реєстрація та авторизація користувачів.  

ャ Отримання статусу артиста користувачем через особистий кабінет.  

ャ Створення артистами альбомів та завантаження треків.  

ャ У кожного користувача є свій плейлист, в який можна додавати пісні.  

ャ Пошук треків, артистів та альбомів.  

ャ Керування обліковими записами через адмін панель.  

ャ Плеєр для відтворення музики.  

ャ На сервері реалізовані три топи: топ шазам, топ світу, топ України. Для кожного топу є свій обліковий запис, плейлист якого є топом.

## Безпека
Проект використовує Spring Security для захисту та шифрування паролів користувачів.

## База даних
Проект використовує JPA для взаємодії з MySQL базою даних.

## Frontend 
ャ Односторінковий Дизайн: Проект розроблений у форматі одної сторінки для зручності користувачів.  

ャ Динамічне Оновлення: Використано технологію fetch для отримання та оновлення інформації без перезавантаження сторінки.  

ャ Основний блок сторінки - .work-station, який постійно оновлюється. Основні блоки для .work-station: блок головного меню, плеєр, особистий кабінет, панель артиста, адмін панель, альбом, сторінка артиста, топи.

## Контактна інформація
Для будь-яких питань чи коментарів, будь ласка, зв'яжіться зі мною за електронною поштою - pavel.dereyes@gmail.com чи instagram/telegram - @sh1chiro.
