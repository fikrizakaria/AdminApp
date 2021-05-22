const table=document.querySelector(".profiles")
db.collection("document").get().then((snapshot)=>{
    snapshot.docs.forEach(doc=>{$('.profiles').DataTable().row.add([doc.data().nom+" "+doc.data().prenom,doc.data().date,doc.data().type,`<span class="badge ${doc.data().etat=="Actif"?"badge-success":"badge-danger"}">${doc.data().etat}</span>`,`<a class='btn btn-primary btn-sm' href='/pages/user/index.html?id=${doc.id}'>Consulter</a>`]).draw(true)})
})