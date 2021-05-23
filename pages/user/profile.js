auth.onAuthStateChanged(user => {
    if (user) {
      document.querySelector(".username").innerHTML=user.email.split("@")[0]
    } else {
      location.href="/pages/login/"
    }
  })
const nom=document.querySelector(".profile-username")
const logoutbtn=document.querySelector(".logout")
const type=document.querySelector(".type")
const cin=document.querySelector(".cin")
const adresse=document.querySelector(".adresse")
const commentaires=document.querySelector("#activity")
const form=document.querySelector(".form-penalite")
db.collection("Users").doc(window.location.search.substr(1).split("=")[1]).get().then(doc=>{
    nom.innerHTML=doc.data().secondName+" "+doc.data().firstName
    type.innerHTML=doc.data().role==1?"Employeur":"Femme de service"
    cin.innerHTML=doc.data().cin
    db.collection("adresse").doc(doc.data().addressId).get().then(doc=>{
        adresse.innerHTML=doc.data().rue+" "+doc.data().num+" "+doc.data().codePostal+" "+doc.data().ville
    })
})
db.collection("Comments").where('fromUserId', '==' ,window.location.search.substr(1).split("=")[1]).get().then((snapshot)=>{
    commentaires.innerHTML=""
    
    snapshot.docs.forEach(doc=>{
        var dateCreation=doc.data().createdAt.seconds*1000,message=doc.data().comment
        db.collection("Users").doc(doc.data().toUserId).get().then(doc=>{
            commentaires.innerHTML+=
                `<div class="post">
                <div class="user-block">
                <img class="img-circle img-bordered-sm" src="../../dist/img/user1-128x128.jpg" alt="user image">
                <span class="username">
                    <a href="#">${doc.data().secondName+" "+doc.data().firstName}</a>
                    <a href="#" class="float-right btn-tool"><i class="fas fa-times"></i></a>
                </span>
                <span class="description">${new Date(parseInt(dateCreation))}</span>
                </div>
                <p>
                ${message}
                </p>
            </div>`
        })
    })
    
})
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    var fin
    db.collection("penalite").doc(window.location.search.substr(1).split("=")[1]).get().then((doc)=>{
        fin=(doc.exists?parseInt(doc.data().dateFin):Date.now())+parseInt(form.duree.value)
        db.collection("penalite").doc(window.location.search.substr(1).split("=")[1]).set({
            dateFin:fin,
            cause:form.cause.value
        },{merge:true})
        db.collection("Users").doc(window.location.search.substr(1).split("=")[1]).set({
            banned:true
        },{merge:true})
    })
    
    
    $('#exampleModal').modal('show')
})
logoutbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    auth.signOut();
    location.href="/pages/login/"
})