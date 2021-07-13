Ext.define('crud.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'crud.view.main.MainController',
        'crud.view.main.MainModel',
        'crud.view.main.List'
    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: 'CRUD'
            },
            flex: 0
        },
        iconCls: 'fa-th-list'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: 20,
        tabConfig: {
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    items:[
        
        {
            title:'Users',
            iconCls:'fa-users',
            scrollable: true,
            items:[{
                xtype:'mainlist'
            }],
        },{
            title:'User',
            iconCls:'fa-user',
            items:[{
                xtype:'form',
                title:'Add User',
                id:'addUserRec',
                width:300,
                layout:'form',
                 items:[{
                     xtype:'textfield',
                     fieldLabel:'ID No',
                     name:'id',
                     id:'id',
                     labelAlign:'top',
                     cls:'field-margin',
                     flex:1
                 },{
                     xtype:'textfield',
                     fieldLabel:'Name',
                     name:'name',
                     id:'name',
                     labelAlign:'top',
                     cls:'field-margin',
                     flex:1
                 },{
                    xtype:'textfield',
                    fieldLabel:'Email',
                    name:'email',
                    id:'email',
                    labelAlign:'top',
                    cls:'field-margin',
                    flex:1
                }],
                
                buttons:[{
                    text:'Save',
                    handler:'onAdd'
                }]
            }]
        },
    ]
});
