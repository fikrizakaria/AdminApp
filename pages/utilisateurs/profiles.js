auth.onAuthStateChanged(user => {
    if (user) {
      document.querySelector(".username").innerHTML=user.email.split("@")[0]
    } else {
      location.href="/pages/login/"
    }
  })
const table=document.querySelector(".profiles")
const logoutbtn=document.querySelector(".logout")
db.collection("Users").where("authorized","==",true).get().then((snapshot)=>{
    snapshot.docs.forEach(doc=>{$('.profiles').DataTable().row.add([doc.data().secondName+" "+doc.data().firstName,new Date(doc.data().date.seconds),doc.data().role==1?"Employeur":"Femme de service",`<span class="badge ${doc.data().banned?'badge-danger">Suspendu':'badge-success">Actif'}</span>`,`<a class='btn btn-primary btn-sm' href='/pages/user/index.html?id=${doc.id}'>Consulter</a>`]).draw(true)})
})
logoutbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    auth.signOut();
    location.href="/pages/login/"
})