export default class Users {
    constructor(element) {
      if (typeof element === "string") {
        element = document.querySelector(element);
      }
      this.element = element;
    }
    getUsers() {
      const users = this.element.querySelector(".users-list")
      
      const eventSource = new EventSource('http://localhost:7070/sse')
      eventSource.addEventListener('open', (event) => {
        console.log(event)
        console.log("open")
      })
      
      eventSource.addEventListener('message', (event) => {
        console.log(event)
          // const date = JSON.parse(event.data)
          // console.log(date)
          // const newElement = document.createElement("li");
          // newElement.textContent = date
          // users.appendChild(newElement)
          // users.insertAdjacentHTML(
          //     "beforeEnd",
          //     `<li class="user">${data.name}</li>`
          // )
        })
      }

    

}