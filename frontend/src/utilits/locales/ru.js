const translation = {
  translation: {
    header: 'Hexlet Chat',
    authButton: {
      logIn: 'Войти',
      logOut: 'Выйти',
    },
    privatePage: {
      channels: 'Каналы',
      messager: {
        message_zero: '{{count}} сообщений',
        message_one: '{{count}} сообщение',
        message_few: '{{count}} сообщения',
        message_many: '{{count}} сообщений',
      },
      newMessage: 'Новое сообщение',
    },
    validationErrors: {
      required: 'Обязательное поле',
      userLength: 'От 3 до 20 символов',
      passwordLength: 'Не менее 6 символов',
      noMatch: 'Пароли должны совпадать',
      submissionFailed: 'Неверные имя пользователя или пароль',
      alreadyExist: 'Такой пользователь уже существует',
    },
    loginForm: {
      header: 'Войти',
      labels: {
        username: 'Ваш ник',
        password: 'Пароль',
      },
    },
    signupForm: {
      header: 'Регистрация',
      labels: {
        username: 'Имя пользователя',
        password: 'Пароль',
        passwordConfirmation: 'Подтвердите пароль',
      },
      button: 'Зарегистрироваться',
    },
    footer: {
      question: 'Нет аккаунта?',
      link: 'Регистрация',
    },
    toasts: {
      success: {
        newChanneladded: 'Канал создан',
        channelRenamed: 'Канал переименован',
        channelRemoved: 'Канал удалён',
      },
      error: {
        network: 'Проблемы с сетью',
      },
    },
    modal: {
      header: {
        adding: 'Добавить канал',
        removing: 'Удалить канал',
        renaming: 'Переименовать канал',
      },
      errorUniqe: 'Должно быть уникальным',
      question: 'Уверены?',
      button: {
        save: 'Сохранить',
        cancel: 'Отменить',
        remove: 'Удалить',
        rename: 'Переименовать',
      },
    },
  },
};

export default translation;
