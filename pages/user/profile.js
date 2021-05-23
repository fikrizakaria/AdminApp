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
db.collection("document").doc(window.location.search.substr(1).split("=")[1]).get().then(doc=>{
    nom.innerHTML=doc.data().nom+" "+doc.data().prenom
    type.innerHTML=doc.data().type
    cin.innerHTML=doc.data().cin
    db.collection("adresse").doc(doc.data().idAdresse).get().then(doc=>{
        adresse.innerHTML=doc.data().rue+" "+doc.data().num+" "+doc.data().codePostal+" "+doc.data().ville
    })
})
db.collection("commentaire").where('idUser', '==' ,window.location.search.substr(1).split("=")[1]).get().then((snapshot)=>{
    commentaires.innerHTML=""
    
    snapshot.docs.forEach(doc=>{
        var dateCreation=doc.data().dateCreation,message=doc.data().message
        db.collection("document").doc(doc.data().idUserC).get().then(doc=>{
            commentaires.innerHTML+=
                `<div class="post">
                <div class="user-block">
                <img class="img-circle img-bordered-sm" src="../../dist/img/user1-128x128.jpg" alt="user image">
                <span class="username">
                    <a href="#">${doc.data().nom+" "+doc.data().prenom}</a>
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
    var fin=parseInt(form.duree.value)+Date.now()
    db.collection("penalite").doc(window.location.search.substr(1).split("=")[1]).get().then((doc)=>{
        fin=parseInt(doc.data().dateFin)+parseInt(form.duree.value)
        console.log(fin,new Date(fin))
    })
    db.collection("penalite").doc(window.location.search.substr(1).split("=")[1]).set({
        idUser:window.location.search.substr(1).split("=")[1],
        dateFin:fin,
        cause:form.cause.value
    })
    
    $('#exampleModal').modal('show')
})
logoutbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    auth.signOut();
    location.href="/pages/login/"
})