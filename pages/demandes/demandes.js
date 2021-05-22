const table=document.querySelector(".datademandes")

db.collection("demande_adhesion").get().then((snapshot)=>{
    snapshot.docs.forEach(doc=>{
        console.log(doc.data().date)
        $('#example2').DataTable().row.add([doc.id,new Date(parseInt(doc.data().date)),doc.data().statut==0?"En attente":"Approuvé",doc.data().type,`<td><a href="/pages/demandes/creer/index.html?iddoc=${doc.id}" class="btn btn-success ${doc.data().statut=="1"?"disabled":""}">Ajouter</a></td>`]).draw(true)})
})