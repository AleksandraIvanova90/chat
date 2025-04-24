import Users from "./Users"

export default class Nickname {
    constructor(element) {
      if (typeof element === "string") {
        element = document.querySelector(element);
      }
      this.element = element;
      this.parent = this.element.parentElement;

      this.addNickname = this.addNickname.bind(this);

      this.element.addEventListener("click", this.addNickname);
    }

    async addNickname(e) {
        e.preventDefault();
        if (!e.target.classList.contains("form-button")) return;
        
        const nick = e.target.closest(".form").querySelector(".form-nickname").value
        
        const data = {
            name: nick,
        }
        this.fetchData(data)
    
        
    }

    getUsers() {
      const users = this.parent.querySelector(".users-list")
      const eventSource = new EventSource('http://localhost:7070/sse')
      eventSource.addEventListener('message', (e) => {
          console.log(users)
          const date = JSON.parse(e.data)
          console.log(date)
          users.insertAdjacentHTML(
              "beforeEnd",
              `<li class="user">${data.name}</li>`
          )
})
    }

    openChat() {
      this.parent.insertAdjacentHTML(
        "beforeEnd",
          `<div class="chat-container">
              <div class="menu">
                <div class="menu-close">&#10062;</div>
              </div>
            <div class="chat-content">
              <ul class="users-list">
              </ul>
              <div class="chat">
                <div class="messages-chat">
                  <div class="message">Добро пожаловать в чат!</div>
                </div>
              <textarea class="footer-chat"></textarea>
            </div>
          </div>
        </div>`,
      );
      const users = new Users(".container")
      users.getUsers()
    }

    async fetchData(data) {
      const request = fetch("http://localhost:7070/" + "nickname/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        });
      const result = await request
      console.log(result)
      if (result.ok) {
        this.element.remove()
        const dd = document.querySelector('.chat-container')
        dd.classList.remove('plug')
        
      } else {
        alert("Такой псевдоним уже существует!")
      }
    }
}
