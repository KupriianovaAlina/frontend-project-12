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
      userLength: 'От 2 до 30 символов',
      passwordLength: 'От 6 символов',
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
        newChanneladded: 'Канал успешно добавлен!',
        channelRenamed: 'Канал переименован',
        channelRemoved: 'Канал удалён',
      },
      error: {
        network: 'Проблемы с сетью',
      },
    },
  },
};

export default translation;
