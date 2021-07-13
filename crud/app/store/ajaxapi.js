Ext.define('crud.store.ajaxapi',{
    executeAPI : function(url,method, params, success, failure) {
        Ext.Ajax.request({
            url: 'http://localhost:8080/getall',
            method: 'GET',
            timeout: 60000,
            headers:
            {
                'Content-Type': 'application/json'
            },
            success: function (response) {
                success(response,b);
                var obj = Ext.decode(response.responseText);
                console.log(obj);
                 
            },
            failure: function (response) {
               failure(response);
        
            }
        });
    }
})