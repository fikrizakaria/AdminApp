auth.onAuthStateChanged(user => {
    if (user) {
      document.querySelector(".username").innerHTML=user.email.split("@")[0]
    } else {
      location.href="/pages/login/"
    }
  })
const img=document.querySelector(".docimg")
const form=document.querySelector(".insertForm")
const logoutbtn=document.querySelector(".logout")
console.log(window.location.search.substr(1).split("=")[1])
db.collection("Users").where('__name__', '==' ,window.location.search.substr(1).split("=")[1]).get().then((snapshot)=>{
    
    snapshot.docs.forEach(doc=>{
        type=doc.data().type
        console.log(doc.data())
        img.setAttribute("src",doc.data().idCardFaceSide)
    })
    
})
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    db.collection("adresse").add({
        rue:form.rue.value,
        num:form.num.value,
        ville:form.ville.value,
        codePostal:form.codePostal.value
    }).then((doc)=>{
      console.log(form.cin.value,form.nom.value,form.prenom.value,form.date.value,type,doc.id)
        db.collection("Users").doc(window.location.search.substr(1).split("=")[1]).set({
            cin:form.cin.value,
            secondName:form.nom.value,
            firstName:form.prenom.value,
            birthDay:form.date.value,
            authorized:true,
            addressId:doc.id
        }, {merge: true})
        $('#exampleModal').modal('show')
        $('#exampleModal').on('hidden.bs.modal', function (e) {
            window.location.href="/pages/demandes/"
          })
    })
})
logoutbtn.addEventListener("click",(e)=>{
  e.preventDefault();
  auth.signOut();
  location.href="/pages/login/"
})