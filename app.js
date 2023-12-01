// 1. Delete all the todos from todo api that are already completed

// async function getCompletedTodos() {
//   try {
//     const response = await fetch("http://localhost:3000/todos");

//     if (!response.ok) throw new Error("Failed to fetch data");

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// async function deleteTodo() {
//   try {
//     const todos = await getCompletedTodos();

//     const completedTodos = todos.filter((todo) => !todo.completed);

//     completedTodos.map(async (todo) => {
//       const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
//         method: "DELETE",
//       });

//       //   console.log(response);

//       console.log(response.ok);
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// deleteTodo();

// async function getCompletedTodos() {
//   try {
//     const response = await fetch("http://localhost:3000/todos/?completed=true");

//     if (!response.ok) throw new Error("Failed to fetch data");

//     const data = await response.json();

//     return data;
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// async function deleteTodo() {
//   try {
//     const completedTodos = await getCompletedTodos();

//     completedTodos.map(async (todo) => {
//       const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
//         method: "DELETE",
//       });

//       console.log(response.ok);
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// deleteTodo();

/* 2.  დაწერეთ პროგრამა, რომელიც მიმსგავსებული იქნება ბიბლიოთეკის ფუნქციონირებასთან. გვექნება წიგნები, მომხმარებლები. იუზერებს შეეძლებათ წიგნების სესხება და ჩაბარება.
  
  - api-ში გვექნება ორი ენდფოინთი - users და books:
      - user-ს ექნება ფროფერთები: id, name, borrowedBooks
      - book-ს ექნება ფროფერთები: id, name, author
  
  - დაწერეთ ფუნქცია, რომელიც დაამატებს ახალ იუზერებს
  - დაწერეთ ფუნქცია, რომელიც ამოშლის არსებულ იუზერს
  
  - დაწერეთ ფუქნცია, რომელიც დაამატებს ახალ წიგნებს
  - დაწერეთ ფუქნცია, რომელიც ამოშლის არსებულ წიგნს
  
  - დაწერეთ ფუნქცია, რომლის მეშვეობითაც იუზერი ისესხებს წიგნს
  - დაწერეთ ფუნქცია, რომლის მეშვეობითაც იუზერი დააბრუნებს წიგნს
   */

async function addUser(name) {
  try {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        borrowedBooks: [],
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add new user");
    }
  } catch (error) {
    console.log(error.message);
  }
}

// addUser("ani");
// addUser("ნიკა");
// addUser("lasha");

// ----------------------------

async function removeUser(userId) {
  try {
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete the user");
    }
  } catch (error) {
    console.log(error.message);
  }
}

// ----------------------

async function addBook(name, author) {
  try {
    const response = await fetch("http://localhost:3000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        author,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add new book");
    }
  } catch (error) {
    console.log(error.message);
  }
}

// addBook("The Great Gatsby", "F. Scott Fitzgerald");
// addBook("To Kill a Mockingbird", "Harper Lee");
// addBook("1984", "George Orwell");

// ---------------------------

async function removeBook(bookId) {
  try {
    const response = await fetch(`http://localhost:3000/books/${bookId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete the book");
    }
  } catch (error) {
    console.log(error.message);
  }
}

// removeBook(4);
// removeBook(5);
// removeBook(6);

// -----------------------------

async function borrowBook(userId, bookId) {
  try {
    const userResponse = await fetch(`http://localhost:3000/users/${userId}`);
    if (!userResponse.ok) {
      throw new Error("User doesn't exist");
    }

    const bookResponse = await fetch(`http://localhost:3000/books/${bookId}`);
    if (!bookResponse.ok) {
      throw new Error("Book doesn't exist");
    }

    const user = await userResponse.json();
    const book = await bookResponse.json();

    const borrowBookResponse = await fetch(
      `http://localhost:3000/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          borrowedBooks: [...user.borrowedBooks, book],
        }),
      }
    );

    if (!borrowBookResponse.ok) {
      throw new Error("Failed to borrow the book");
    }

    removeBook(bookId);

    
    
  } catch (error) {
    console.log(error.message);
  }
}

// borrowBook(1, 4);


async function returnBook(userId,bookId){
  try {
    const user =await fetch(`http://localhost:3000/users/${userId}`);

    if(!user.ok){
      throw new Error("this user doesnot exist");
    }

    const userInfo=await user.json();

    const requestToReturnBook=await fetch(`http://localhost:3000/users/${userId}`,{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        borrowedBooks:userInfo.borrowedBooks.filter((item)=>item.id!==bookId)
      })
    })
    if(!requestToReturnBook.ok){
      throw new Error("failed to return book");
    }

    let book=userInfo.borrowedBooks;
    let result=book.filter((item)=>item.id==bookId);
    addBook(result[0].name,result[0].author)
  } catch (error) {
    console.log(error)
  }
}

// returnBook(1,4)















let button=document.querySelector("button");
let inputs=document.querySelectorAll("input")
console.log(inputs)

button.addEventListener("click",()=>{
  let a=true;
  for(let i=0;i<inputs.length;i++){
   
    if(inputs[i].value==""){
a=false;
    }
  }
  if(a){
    async function addUsers(){
      try {
        const response=await fetch("http://localhost:3000/usersInWeb", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name:inputs[0].value,
            surname:inputs[1].value,
            password:inputs[2].value,
          }),
        })

        if(!response.ok){
          throw new Error("failed to add user")
        }
      } catch (error) {
        console.log(error)
      }
    }

    addUsers();
  }

})




















