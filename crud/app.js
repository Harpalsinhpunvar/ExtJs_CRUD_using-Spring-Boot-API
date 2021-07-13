Ext.application({
    extend: 'crud.Application',

    name: 'crud',

    requires: [
       'crud.*'
    ],
    mainView: 'crud.view.main.Main',
    // autoCreateViewport:true
});
