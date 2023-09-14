// 1

async function loadJson(url) { 
    let response = await fetch(url); 
  
    if (response.status == 200) {
      return response.json();   
    }else{
        throw new Error(response.status);
    }
  
    
  }
  (async() => {
    try{
        const result=await loadJson('https://javascript.info/no-such-user.json');
        console.log(result)
    }catch(error){
        alert(error)
    }
  }

  );

  // 2 


  class HttpError extends Error {
    constructor(response) {
      super(`${response.status} for ${response.url}`);
      this.name = 'HttpError';
      this.response = response;
    }
  }
  
  async function loadJson(url) {
    let response = await fetch(url);
    if (response.status == 200) {
      return response.json();
    } else {
      throw new HttpError(response);
    }
  }
  async function demoGithubUser() {
    let name = prompt("Enter a name?", "iliakan");
    while(true) {
      try {
        const user = await loadJson(`https://api.github.com/users/${name}`);
        alert(`Full name: ${user.name}.`);
        return user;
      } catch(err) {
        if (err instanceof HttpError && err.response.status == 404) {
          alert("No such user, please reenter.");
          name = prompt("Enter a name?", "iliakan");
        } else {
          throw err;
        }
      }
    }
  }
  
  demoGithubUser();  


// 3

async function wait() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return 10;
}

function f() {
    wait().then(result => alert(result));
}
  
f();

 
