https://github.com/danythere/middle.messenger.praktikum.yandex/pull/1
# Мессенджер
## 1. Описание
Учебный проект студента danythere в Яндекс.Практикум. 
## 2. Запуск.
1. Установка зависимостей  
 ````npm install````
2. Сборка проекта с помощью Parcel  
````npm run build ````
3. Запуск сервера с помощью команды  
````npm run start````  
В консоли появится запись при успешном запуске:  
>Running at Port 3000
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
## 4. Ссылки:
Макет:https://www.figma.com/file/cn4s2uPeAcVzpCm4MMMmox/Untitled?node-id=0%3A1  
Netlify: https://optimistic-leavitt-837679.netlify.app  
Pull Request: 
* https://github.com/danythere/middle.messenger.praktikum.yandex/pull/1
* https://github.com/danythere/middle.messenger.praktikum.yandex/pull/2

Валидацию по фокусу не получилось сделать :(
    Uncaught DOMException: Failed to execute 'removeChild' on 'Node': The node to be removed is no longer a child of this node. Perhaps it was moved in a 'blur' event handler?
Такую ошибку выдает, если повесить в input-е еще событие focus.