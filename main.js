const prompt = require('prompt-sync')();

const person = {
  name: '',
  email: '',
  phone: '',
};

const delivery = {
  delivery_price: 500,
  from: "вул.Чорновола 15",
  to: '',
};

const order = {
  ...person,
  ...delivery,
  dishes: [],
  finalPrice: '',
  status: 'В обробці',
};

const menu = [
    {
      title: 'UnagiRoll',
      price: 8000,
      category: 'rolls',
      ingredients: ['rise', 'eel', 'cucumber', 'avocado', 'soy sauce']
    },
    {
      title: 'TempuraRoll',
      price: 7500,
      category: 'rolls',
      ingredients: ['rise', 'shrimp', 'tempura batter', 'avocado', 'spicy mayo']
    },
    {
      title: 'CaesarRole',
      price: 7800,
      category: 'rolls',
      ingredients: ['rise', 'chicken', 'lettuce', 'parmesan', 'caesar dressing']
    },
    {
      title: 'PhiladelphiaWithSalmon',
      price: 8500,
      category: 'rolls',
      ingredients: ['rise', 'cream cheese', 'salmon', 'cucumber', 'nori']
    },
    {
      title: 'MisoSoup',
      price: 4000,
      category: 'soup',
      ingredients: ['tofu', 'seaweed', 'green onions', 'mushrooms', 'misu paste']
    },
    {
      title: 'FruitSalad',
      price: 5500,
      category: 'salad',
      ingredients: ['romaine lettuce', 'croutons', 'parmesan cheese', 'caesar dressing']
    }
  ];
  

chooseRole();

function chooseRole() {
  let enterAs;

  do {
    enterAs = prompt('Оберіть 1 -- вхід для користувача, 2 -- вхід для адміна, 3 -- вийти з програми: ');

    if (enterAs === '1') {
      userMain();
    } else if (enterAs === '2') {
      adminMain();
    } else if (enterAs !== '3') {
      console.log('Невірний вибір. Будь ласка, оберіть 1, 2 або 3.');
    }
  } while (enterAs !== '3');
}

function userMain() {
  displayMenu(menu);
  chooseDishes(menu);
  enterPersonalInfo();
  calculateOrderPrice();
  showOrderSummary();
}

function displayMenu(menu) {
  console.log('Меню:');
  for (const item of menu) {
    console.log(`- ${item.title}`);
  }
}

function chooseDishes(menu) {
  let userInputDishes;
  let anotherOrder = '1';

  do {
    userInputDishes = prompt('Оберіть назви блюд вашого замовлення через пробіл: ');
    const dishNames = userInputDishes.split(' ');

    for (const dishName of dishNames) {
      const foundDish = menu.find(item => item.title.toLowerCase() === dishName.toLowerCase());

      if (foundDish) {
        console.log(`Ви замовили ${foundDish.title}`);
        order.dishes.push(foundDish);
      } else {
        console.log(`Помилка: блюдо з назвою "${dishName}" не знайдено у меню.`);
      }
    }

    anotherOrder = prompt('Бажаєте додати ще страви до замовлення? Введіть 1 -- якщо так або 2 -- якщо ні ');
  } while (anotherOrder === '1');
}

function enterPersonalInfo() {
  const userInputName = prompt("Уведіть ваше прізвище та ім'я через пробіл: ");
  
  let userInputEmail;
  do {
    userInputEmail = prompt("Уведіть вашу електронну пошту: ");
    if (!isValidEmail(userInputEmail)) {
      console.log('Помилка: Невірний формат електронної пошти.');
    }
  } while (!isValidEmail(userInputEmail));

  const userInputAddress = prompt("Уведіть вашу адресу доставки: ");

  const [lastName, firstName] = userInputName.split(' ');
  person.name = `${firstName} ${lastName}`;
  person.email = userInputEmail;
  delivery.to = userInputAddress;

  let userInputNumber;
  do {
    userInputNumber = prompt("Уведіть ваш номер телефону: ");
    if (!isValidPhoneNumber(userInputNumber)) {
      console.log('Помилка: Невірний формат номера телефону.');
    }
  } while (!isValidPhoneNumber(userInputNumber));

  person.phone = userInputNumber;
  Object.assign(order, person, delivery);
}

function isValidEmail(email) {
  return email.includes('@');
}

function isValidPhoneNumber(number) {
  return number.length === 13;
}

function calculateOrderPrice() {
  let totalCost = 0;

  for (const dish of order.dishes) {
    totalCost += dish.price;
  }

  order.price = totalCost + delivery.delivery_price;
}

function showOrderSummary() {
  console.log("\nВаше прізвище та ім'я: " + order.name);
  console.log("Ваша електронна пошта: " + order.email);
  console.log("Ваш номер: " + order.phone);
  console.log("Адреса відправки: " + order.from);
  console.log("Ваша адреса доставки: " + order.to);

  console.log("Ваші блюда:");
  for (const dish of order.dishes) {
    console.log(`Назва: ${dish.title}`);
  }

  console.log('Ціна замовлення:' + order.price);
  console.log("Статус замовлення: " + order.status);
}

function adminMain() {
  appealToAdministrator();
}

function appealToAdministrator() {
  let chooseAction;

  do {
    chooseAction = prompt('Якщо бажаєте переглянути замовлення нажміть -- 1, якщо бажаєте змінити статус замовлення -- 2, якщо бажаєте вийти з ролі адміністратора -- 3: ');

    if (chooseAction === '1') {
      showOrderSummary();
    } else if (chooseAction === '2') {
      changeOrderStatus();
    }
  } while (chooseAction !== '3');
}

function changeOrderStatus() {
  let newStatus;

  do {
    newStatus = prompt("Обновіть статус замовлення: 1 -- замовлення готується, 2 -- замовлення в дорозі, 3 -- замовлення доставлено, 4 -- схоже щось пішло не так, \n5 -- нічого не змінювати: ");

    switch (newStatus) {
      case '1':
        order.status = 'замовлення готується';
        break;
      case '2':
        order.status = 'замовлення в дорозі';
        break;
      case '3':
        order.status = 'замовлення доставлено';
        break;
      case '4':
        order.status = 'схоже щось пішло не так';
        break;
    }
  } while (newStatus !== '5');

  console.log('Теперішній статус замовлення: ' + order.status);
}