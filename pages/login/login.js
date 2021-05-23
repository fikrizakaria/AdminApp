auth.onAuthStateChanged(user => {
  if (user) {
    location.href="/pages/demandes"
  }
  console.log(user)
})
const loginForm = document.querySelector('#loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // get user info
    const email = loginForm['email'].value;
    const password = loginForm['password'].value;
  
    // log the user in
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
      location.href="/pages/demandes"
    });
  
  });