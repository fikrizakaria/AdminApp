const img=document.querySelector(".docimg")
const form=document.querySelector(".insertForm")
console.log(window.location.search.substr(1).split("=")[1])
var type;
db.collection("demande_adhesion").where('__name__', '==' ,window.location.search.substr(1).split("=")[1]).get().then((snapshot)=>{
    
    snapshot.docs.forEach(doc=>{
        type=doc.data().type
        console.log(doc.data())
        img.setAttribute("src",doc.data().url_doc)
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
        db.collection("document").add({
            cin:form.cin.value,
            nom:form.nom.value,
            prenom:form.prenom.value,
            date:form.date.value,
            type:type,
            etat:"Actif",
            idAdresse:doc.id
        })
        db.collection("demande_adhesion").doc(window.location.search.substr(1).split("=")[1]).update({statut:"1"})
        $('#exampleModal').modal('show')
        $('#exampleModal').on('hidden.bs.modal', function (e) {
            window.location.href="/pages/demandes/"
          })
    })
})