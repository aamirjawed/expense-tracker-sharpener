const form = document.getElementById("form")

form.addEventListener('submit', async (e) => {
    e.preventDefault();


    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if(!name || !email || !password){
        alert("All fields required")
        return
    }

    try{
        const response  = await fetch('http://localhost:3000/user/signup', {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name, 
                email,
                password
            })
        })

    }catch(err){
        console.log(err)
    }

    console.log(name, email, password)

    
})