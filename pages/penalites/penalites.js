auth.onAuthStateChanged(user => {
    if (user) {
      document.querySelector(".username").innerHTML=user.email.split("@")[0]
    } else {
      location.href="/pages/login/"
    }
  })
const table=document.querySelector(".penalites")
const logoutbtn=document.querySelector(".logout")
setTimeout(()=>{
    close_btn=document.querySelectorAll('.fa-close')
    for(var i=0;i<close_btn.length;i++){
        close_btn[i].addEventListener('click',(e)=>{
            e.preventDefault()
            console.log("ok")
            db.collection("penalite").doc(e.target.getAttribute("data-id")).delete()
            $('#exampleModal').modal('show')
        })
    }
},3000)
var close_btn
db.collection("penalite").get().then((snapshot)=>{
    snapshot.docs.forEach(doc=>{
        db.collection("document").doc(doc.id).get().then(docu=>{
            console.log(doc.data().dateFin)
            $('.penalites').DataTable().row.add([docu.data().nom+" "+docu.data().prenom,docu.data().type,new Date(doc.data().dateFin),docu.data().etat,doc.data().cause,`<span class='fa-close btn' ><i data-id='${doc.id}' class='fa fa-times' aria-hidden='true'></i></span>`]).draw(true)})
        })
    return snapshot;
})
logoutbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    auth.signOut();
    location.href="/pages/login/"
})