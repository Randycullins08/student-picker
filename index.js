let users = [];
const secondaryUsers = [];
const wait = (ms) => {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
};

async function main() {
  function buildUsers() {
    const user = prompt(
      `Enter an id, first name, and last name separated by a comma:`
    );
    const split = user.trim().split(",");

    users = [
      ...users,
      { id: split[0], first_name: split[1], last_name: split[2] },
    ];

    const addAnother = confirm("would you like to add another?");

    if (addAnother) {
      buildUsers();
    } else {
      window.localStorage.setItem("lastUsers", JSON.stringify(users));
      return users;
    }
  }

  async function initApp() {
    const apiData = await fetch(
      "https://devpipeline-mock-api.herokuapp.com/api/get-users"
    )
      .then((res) => res.json())
      .then((data) => {
        users = data.users;

        window.localStorage.setItem("lastUsers", JSON.stringify(data.users));
      })
      .catch((err) => {
        const lastUsers = window.localStorage.getItem("lastUsers");

        if (lastUsers) {
          users = JSON.parse(lastUsers);
        } else {
          buildUsers();
        }
      });
  }

  await initApp();
  users.splice(6, 1);

  function renderSideBar() {
    const list = document.getElementById("student-list");

    users.forEach((user) => {
      const li = document.createElement("li");

      li.append(user.first_name + " " + user.last_name);
      list.appendChild(li);
    });
  }

  renderSideBar();
  console.log(users);

  function randomStudent() {
    namesList = [
      "Kray",
      "Silvana",
      "MollyKate",
      "Jordan",
      "Michael",
      "Andrew B.",
      "Cooper",
      "Andrew F.",
    ];
    let random = namesList.sort(() => Math.random() - 0.5);
    const insertHere = document.getElementById("header");
    const button = document.getElementById("shuffleBtn");

    button.addEventListener("click", () => {
      for (let i = 0; i < random.length; i++) {
        insertHere.textContent = random[i];
      }
    });
  }
  randomStudent();
}

main();
