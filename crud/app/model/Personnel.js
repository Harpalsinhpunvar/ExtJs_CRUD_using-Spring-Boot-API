Ext.define('crud.model.Personnel', {
    extend: 'crud.model.Base',

    fields: [
        {name:'id', type:'int'},
        {name:'name', type:'string'},
        {name:'email', type:'string'},
    ],
});
