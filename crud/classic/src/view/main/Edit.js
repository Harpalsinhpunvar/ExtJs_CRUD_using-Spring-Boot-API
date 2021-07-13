Ext.define('crud.view.main.Edit',{
    extend:'Ext.form.Panel',
    xtype:'edit-form',

    controller:'main',

    title:'Edit',
    bodyPadding:5,
    frame:true,
    width:500,
    height:300,
    alwaysOnTop:true,
    floating:true,
    closable:true,
    modal:true,
    id:'dataRecForm',

    fieldDefaults:{
        labelWidth:110,
        anchor:'100%',
    },

    items:[{
        xtype:'container',
        layout:'form',
        items:[{
            xtype:'textfield',
            fieldLabel:'ID No',
            name:'upd_id',
            id:'upd_id',
            labelAlign:'top',
            cls:'field-margin',
            flex:1
        },{
            xtype:'textfield',
            fieldLabel:'Name',
            name:'upd_name',
            id:'upd_name',
            labelAlign:'top',
            cls:'field-margin',
            flex:1
        },{
           xtype:'textfield',
           fieldLabel:'Email',
           name:'upd_email',
           id:'upd_email',
           labelAlign:'top',
           cls:'field-margin',
           flex:1
       }]
    }],

    buttons:[{
        text:'Update',
        handler:'onUpdate',
    },{
        text:'Delete',
        handler:'onDelete',
    },{
        text:'Cancel',
        handler:'onCancel',
    }]
});