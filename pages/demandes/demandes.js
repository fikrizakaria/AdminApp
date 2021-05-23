auth.onAuthStateChanged(user => {
    if (user) {
      document.querySelector(".username").innerHTML=user.email.split("@")[0]
    } else {
      location.href="/pages/login/"
    }
  })
const table=document.querySelector(".datademandes")
const logoutbtn=document.querySelector(".logout")
db.collection("demande_adhesion").get().then((snapshot)=>{
    snapshot.docs.forEach(doc=>{
        console.log(doc.data().date)
        $('#example2').DataTable().row.add([doc.id,new Date(parseInt(doc.data().date)),doc.data().statut==0?"En attente":"Approuvé",doc.data().type,`<td><a href="/pages/demandes/creer/index.html?iddoc=${doc.id}" class="btn btn-success ${doc.data().statut=="1"?"disabled":""}">Ajouter</a></td>`]).draw(true)})
})
logoutbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    auth.signOut();
    location.href="/pages/login/"
})