Ext.define('crud.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',
    config:{stores:['personnel'],},

    requires:[
        'crud.model.Personnel',
        'crud.view.main.Edit',
        'crud.store.Personnel',
        'crud.view.main.List',],

    onItemSelected: function (sender, record) {
        var form = Ext.create('crud.view.main.Edit');
        Ext.getCmp('upd_id').setValue(record.data.id);
        Ext.getCmp('upd_name').setValue(record.data.name);
        Ext.getCmp('upd_email').setValue(record.data.email);
        form.show();
        },

    onDelete: function(){
      
        var id = Ext.getCmp('upd_id').getValue();
        var store = Ext.getStore('personnel');
        var record = store.getById(id);

        Ext.MessageBox.confirm('Confirm', 'Are you sure?', function(btn){
            if(btn == 'yes'){
                record.erase({
                    success:function(){
                        var id = store.destroy(record);
                        store.sync();
                    }
                });
                Ext.Ajax.request({
                    url:'http://localhost:8080/delete/'+id,
                    method:'DELETE',
                    success:function(result, action, response){
                        console.log('deleted');
                    },
                    failure:function(response){
                        console.log('failuer');
                    },
                    scope: this
                });
            }
        });
        this.getView().destroy();
    },

    onUpdate: function(sender, record){

        var rec_id, store, record, name_, email_;
    
        debugger;
        rec_id = Ext.getCmp('upd_id').getValue();
        name_ = Ext.getCmp('upd_name').getValue();
        email_= Ext.getCmp('upd_email').getValue();

        // var all = Ext.getCmp('dataRecForm').getValues();
        // var id_ = all.upd_id;

        store = Ext.getStore('personnel');
        record = store.getById(rec_id);

        record.data.name = name_;
        record.data.email = email_;

        var data = {
            // 'name':all.upd_name,
            // 'email':all.upd_email

            'name':name_,
            'email':email_
        };

        Ext.Ajax.request({
            url:'http://localhost:8080/update/' + rec_id,
            method:'PUT',
            jsonData:data,
            success:function(result, action, response){
                var response = Ext.decode(result.responseText);
                console.log(response);
                // var jsonRecord = jsonData.records;  
            },
            failure:function(response){
                console.log('failure');
            },
            scope: this
        });

        store.sync();

        Ext.getCmp('dataList').getView().refresh();
        this.getView().destroy();
      
    },

    onAdd: function(sender, record){
    
        var formValues = Ext.getCmp('addUserRec').getValues();
        var data={
            'name': formValues.name,
            'email':formValues.email
        };
        Ext.Ajax.request({
            url:'http://localhost:8080/add',
            method:'POST',
            jsonData:data,
            success:function(result, action, response){
                var response = Ext.decode(result.responseText);
                console.log(response);  
                store.insert(0, response);
            },
            failure:function(response){
                console.log('failuer');
            },
            scope: this
        });

        var store = Ext.getStore('personnel');
        Ext.getCmp('addUserRec').reset();
        Ext.Msg.alert('Success', 'New user has been added.', Ext.emptyFn);
    },

    onCancel: function () {
        this.getView().destroy();
     },
});
