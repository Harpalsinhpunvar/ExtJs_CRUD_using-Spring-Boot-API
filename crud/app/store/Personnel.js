Ext.define('crud.store.Personnel', {
    extend: 'Ext.data.Store',

    alias: 'store.personnel',
    storeId: 'personnel',
    model: 'crud.model.Personnel',

    proxy:{
        type:'rest',
        url:'http://localhost:8080/getall'
    },
    autoLoad:'true'
});


