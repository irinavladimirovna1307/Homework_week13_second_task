//напротив аватара и имени должна появляться дата когда и во сколько был написан комментарий;
//под заголовком «Оставьте ваш комментарий» должен быть чекбокс, который даёт выбор показывать ваше имя в комментарии или нет;
//если пользователь не указал имя, то вместо имени должно появляться username ;
//если пользователь не ввел ссылку на аватар, то должна появляться стандартная аватарка. Стандартных аватаров должно быть больше пяти, они должны подставляться в рандомном порядке.

//функция антиспам с двумя значениями
function checkSpam(str) {
  const lowerStr = str.toLowerCase();
  return lowerStr.replace(/viagra|xxx/g, "***");
}

//рандомный аватар
function getRandomAvatar() {
  const defaultAvatars = [
    "./assets/avatars/first_option.jpeg",
    "./assets/avatars/second_option.jpeg",
    "./assets/avatars/third_option.jpeg",
    "./assets/avatars/four_option.jpeg",
    "./assets/avatars/five_option.jpeg",
    "./assets/avatars/six_option.jpeg",
  ];
  const randomIndex = Math.floor(Math.random() * defaultAvatars.length);
  return defaultAvatars[randomIndex];
}

//цикл добавления нового комментария
function addComment() {
  let name = document.querySelector("#name").value.trim();
  let avatar = document.querySelector("#avatar").value.trim();
  let message = document.querySelector(".comment-form__textarea").value.trim();

  // удаляем лишние пробелы и делаем первую букву заглавной
  name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  //если имя скрыто или не указано ввести username
  const showName = document.querySelector("#show-name").checked;
  name = showName ? name || "username" : "username";

  // проверка заполнения полей
  if (message === "") {
    alert("Пожалуйста, введите сообщение");
    return;
  }

  // проверка антиспам
  message = checkSpam(message);

  //если аватар не указан, то рандомный
  const avatarImage = avatar ? avatar : getRandomAvatar();

  //текущее вреия и дата
  const currentDateTime = new Date().toLocaleString();

  // Создаем комментарий

  //контейнер комментариев
  const commentSection = document.querySelector(".comments-section");

  // Создаем новый комментарий(контейнер)
  const commentDiv = document.createElement("div");
  commentDiv.className = "comment";
  //создаем контейнер с текстом для контейнера с новым комментариев
  const commentContent = document.createElement("div");
  commentContent.className = "comment-content";

  //avatar
  const avatarImg = document.createElement("img");
  avatarImg.src = avatarImage;
  avatarImg.alt = "Avatar";
  console.log(avatarImage);

  //name
  const nameElement = document.createElement("strong");
  nameElement.textContent = `${name}:`;
  nameElement.style.fontSize = "18px";

  //добавляем дату и время комментария
  const timeElement = document.createElement("span");
  timeElement.textContent = ` (${currentDateTime})`;
  timeElement.style.fontSize = "10px";

  //message
  const messageElement = document.createElement("p");
  messageElement.textContent = message;

  //обьединение  контента
  commentContent.append(nameElement, timeElement, messageElement);

  ///обьединение в контейнер изображения и контента
  commentDiv.append(avatarImg, commentContent);

  ///добавление контейнера с комментарием в общий контейнер
  commentSection.append(commentDiv);

  document.querySelector("#name").value = "";
  document.querySelector("#avatar").value = "";
  document.querySelector("#message").value = "";
}
