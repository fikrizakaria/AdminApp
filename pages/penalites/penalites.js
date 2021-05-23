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
            db.collection("Users").doc(e.target.getAttribute("data-id")).set({
                banned:false
            },{merge:true})
            $('#exampleModal').modal('show')
        })
    }
},3000)
var close_btn
db.collection("penalite").get().then((snapshot)=>{
    snapshot.docs.forEach(doc=>{
        db.collection("Users").doc(doc.id).get().then(docu=>{
            $('.penalites').DataTable().row.add([docu.data().secondName+" "+docu.data().firstName,docu.data().role==1?"Employeur":"Femme de service",new Date(doc.data().dateFin),doc.data().cause,`<span class='fa-close btn' ><i data-id='${doc.id}' class='fa fa-times' aria-hidden='true'></i></span>`]).draw(true)})
        })
    return snapshot;
})
logoutbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    auth.signOut();
    location.href="/pages/login/"
})