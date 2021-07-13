Ext.define('crud.view.main.List', {
    extend: 'Ext.grid.Panel',
    xtype: 'mainlist',
    id:'dataList',
    alias:'grid.List',
    

    requires: [
        'crud.store.Personnel',
        'crud.view.main.Edit'
    ],

    title: 'CRUD',

    store: {type: 'personnel'},

    columns: [
        { text: 'ID',  dataIndex: 'id', flex: 1 },
        { text: 'Name',  dataIndex: 'name', flex: 1 },
        { text: 'Email', dataIndex: 'email', flex: 1 },
    ],

    listeners: {
        select: 'onItemSelected'
    },
});
