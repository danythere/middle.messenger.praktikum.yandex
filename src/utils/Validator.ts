/**
 * Класс, содержащий все виды валидации.
 */
export default class Validator {
   static validateName(name: string): null | string {
      if (/^[A-ZА-Я][а-яa-z]+$/.test(name)) {
         return null;
      }
      return 'Имя некорректное';
   }

   static validateLogin(login: string): null | string {
      if (
         /^[0-9]*[\w-]*[A-Za-z]+[0-9]*[\w-]*$/.test(login) &&
         login?.length >= 3 &&
         login?.length <= 20
      ) {
         return null;
      }
      return 'Логин некорректный';
   }

   static validateEmail(email: string): null | string {
      if (/^[\w-]+@[A-Za-z]+\.[A-Za-z]+$/.test(email)) {
         return null;
      }
      return 'Email некорректный';
   }

   static validatePassword(password: string): null | string {
      if (
         /^(?=.*[A-Z])(?=.*\d).*$/.test(password) &&
         password?.length >= 8 &&
         password?.length <= 40
      ) {
         return null;
      }
      return 'Пароль некорректный';
   }

   static validatePhone(phone: string): null | string {
      if (/^[+]*\d{10,15}$/.test(phone)) {
         return null;
      }
      return 'Телефон некорректный';
   }

   static validateMessage(message: string): null | string {
      if (message && message.length) {
         return null;
      }
      return 'Сообщение не должно быть пустым';
   }

   static validateTitle(title: string): null | string {
      if (title && title.length) {
         return null;
      }
      return 'Имя не должно быть пустым';
   }

   static validate(validType: string, value: string): string | null {
      let validRes = null;
      switch (validType) {
         case 'name':
            validRes = this.validateName(value);
            break;

         case 'login':
            validRes = this.validateLogin(value);
            break;

         case 'password':
            validRes = this.validatePassword(value);
            break;

         case 'email':
            validRes = this.validateEmail(value);
            break;

         case 'phone':
            validRes = this.validatePhone(value);
            break;

         case 'message':
            validRes = this.validateMessage(value);
            break;

         default:
            break;
      }
      return validRes;
   }
}
