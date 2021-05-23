auth.onAuthStateChanged(user => {
    if (user) {
      document.querySelector(".username").innerHTML=user.email.split("@")[0]
    } else {
      location.href="/pages/login/"
    }
    console.log(user)
  })
const table=document.querySelector(".datademandes")
const logoutbtn=document.querySelector(".logout")
db.collection("Users").get().then((snapshot)=>{
    snapshot.docs.forEach(doc=>{
      console.log()
        $('#example2').DataTable().row.add([doc.id,new Date(parseInt(doc.data().date.seconds)),doc.data().authorized?"Approuvé":"En attente",doc.data().role==1?"Employeur":"Femme de service",`<td><a href="/pages/demandes/creer/index.html?iddoc=${doc.id}" class="btn btn-success ${doc.data().authorized?"disabled":""}">Ajouter</a></td>`]).draw(true)})
})
logoutbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    auth.signOut();
    location.href="/pages/login/"
})