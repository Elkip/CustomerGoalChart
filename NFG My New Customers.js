/**
 *@NApiVersion 2.1
 *@NScriptType Portlet
 */
define(['N/runtime'],
    function (runtime) {
        function render(params) {
            var deployment = runtime.getCurrentScript().deploymentId;

            params.portlet.title = runtime.getCurrentScript().getParameter({
                name: 'custscript_cus_portlet_title'
            });
            var url = runtime.getCurrentScript().getParameter({
                name: 'custscript_cus_portlet_url'
            });
            var content = '<div id="container" style="width:100%;text-align:center;overflow-x: hidden;">' +
                '<iframe ' +
                'width="100%" ' +
                'height="500px" ' +
                'style="overflow:hidden;' +
                'margin-top:0px;' +
                'margin-right: 0;' +
                'border:none;" ' +
                'scrolling="no" ' +
                'src=' + url +
                '></iframe></div>';
            params.portlet.html = content;
        }

        return {
            render: render
        };
    });