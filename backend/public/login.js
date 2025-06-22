const form = document.getElementById('form')


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim()
    const password = document.getElementById('password').value;

    if(!email || ! password){
        alert("All fields are required")
    }

    console.log(email, password)
})