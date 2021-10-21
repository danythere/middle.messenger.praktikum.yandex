# Мессенджер
## 1. Описание
Учебный проект студента danythere в Яндекс.Практикум. 
Чат предоставляет возможность общаться в реальном времени с другими пользователями. 
Вы можете общаться как вдвоем, так и организовать чат из нескольких людей!
## 2. Запуск.
1. Установка зависимостей  
 ````npm install````
2. Сборка проекта с помощью Parcel  
 ````npm run build ````
3. Запуск сервера с помощью команды  
````npm run start````  
В консоли появится запись при успешном запуске:  
>Running at Port 3000

Сборка осуществляется с помощью Webpack:   
```npm run build```
## 3. Структура проекта
Проект состоит из нескольких страниц:
* Авторизация
* Регистрация
* Профиль
* Список чатов
* Ошибка 404
* Ошибка 500*

## 4. Проверка кода.
В проекте действуют следующие линтеры:
* eslint(файл с настройками .eslintrc)
* проверка типизации typescript(файл с настройками tsconfig.json)
* stylelint(файл с настройками .stylelintrc.json)
  
Юнит-тесты:
````npm run mocha````  

## 5. Используемые технологии и подходы
* Проект написан на typescript.
* Для реализации чата были написан базовый элемент, который имеет реактивность. Также роутер, работающий историей браузера и позволяющий оставаться на той же странице, на которой были до обновления. Кроме этого были созданы глобальный стор и функция connect, позволяющая обновлять несколько независимых компонентов при обновлении данных. Запрос данных на сервер выполняется на самописном Fetch.
## 6. Ссылки:
Макет:https://www.figma.com/file/cn4s2uPeAcVzpCm4MMMmox/Untitled?node-id=0%3A1  
Netlify: https://optimistic-leavitt-837679.netlify.app  
Heroku: https://danythere-messenger.herokuapp.com/
Pull Request: 
* https://github.com/danythere/middle.messenger.praktikum.yandex/pull/1
* https://github.com/danythere/middle.messenger.praktikum.yandex/pull/2
* https://github.com/danythere/middle.messenger.praktikum.yandex/pull/3
* https://github.com/danythere/middle.messenger.praktikum.yandex/pull/4
