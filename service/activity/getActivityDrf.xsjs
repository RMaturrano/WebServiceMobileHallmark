$.import("MSS_MOBILE.Functions", "Functions");
$.import("MSS_MOBILE.Constants","Constants");
var functions = $.MSS_MOBILE.Functions;
var Constants = $.MSS_MOBILE.Constants;
var objResponse;
var objError;
var objResult;
var objType;
var objCount = 0;

var id;
var query;

try{
    id = $.request.parameters.get('id');

	if (id !== undefined)
	{
        query = ' select        ' + 
                       	'	T0.\"CLAVEMOVIL\" AS \"ClaveMovil\", ' + 
                    	'	T0.\"ORIGEN\" AS \"Origen\"         ,' + 
                    	'	T0.\"CODIGOCLIENTE\" AS \"CodigoCliente\"  ,' + 
                    	'	T0.\"CODIGOCONTACTO\" AS \"CodigoContacto\" ,' + 
                    	'	T0.\"CODIGODIRECCION\" AS \"CodigoDireccion\",' + 
                    	'	T0.\"CODIGOMOTIVO\" AS \"CodigoMotivo\"   ,' + 
                    	'	IFNULL(T1.\"DESCRIPCION\",\'\') AS \"DescripcionMotivo\"   ,' + 
                    	'	T0.\"COMENTARIOS\" AS \"Comentarios\"    ,' + 
                    	'	T0.\"VENDEDOR\" AS \"Vendedor\"       ,' + 
                    	'	T0.\"LATITUD\" AS \"Latitud\"        ,' + 
                    	'	T0.\"LONGITUD\" AS \"Longitud\"       ,' + 
                    	'	T0.\"FECHACREACION\" AS \"FechaCreacion\"  ,' + 
                    	'	T0.\"HORACREACION\" AS \"HoraCreacion\"   ,' + 
                    	'	T0.\"MODOOFFLINE\" AS \"ModoOffLine\"    ,' + 
                    	'	T0.\"CLAVEFACTURA\" AS \"ClaveFactura\"   ,' + 
                    	'	T0.\"SERIEFACTURA\" AS \"SerieFactura\"   ,' + 
                    	'	T0.\"CORRELATIVOFACTURA\" AS \"CorrelativoFactura\",' + 
                    	'	CASE WHEN T0.\"TIPOINCIDENCIA\" = \'01\' THEN \'Parcialmente rechazado\' ' +
                    	'           ELSE \'Totalmente rechazado\' END AS \"TipoIncidencia\" ,' + 
                    	'	T0.\"FECHAPAGO\" AS \"FechaPago\"      ,' + 
                    	'	T0.\"MIGRADO\" AS \"Migrado\"        ,' + 
                    	'	T0.\"ACTUALIZADO\" AS \"Actualizado\"    ,' + 
                    	'	T0.\"FINALIZADO\" AS \"Finalizado\"     ,' + 
                    	'	T0.\"CODIGOSAP\" AS \"CodigoSAP\"      ,' + 
                    	'	T0.\"MENSAJE\" AS \"Mensaje\"        ,' + 
                    	'	T0.\"EMPRESA\"        ' + 
                '    from '+Constants.BD_MOBILE+'.OCLG T0 LEFT JOIN ' + Constants.BD_MOBILE + '.MOTIVOS T1 ' +
                '           on T0.CODIGOMOTIVO = T1."ID" ' +
                '   where "EMPRESA" = ' + id.toString();

    	var conn = $.hdb.getConnection();
    	var rs = conn.executeQuery(query);
    	conn.close();
    	var activity;
    	
    	if (rs.length > 0)
    	{
    	        var mResult = [];
        		var i;
        		
        		
        		for(i = 0; i < rs.length ; i++)
        		{
        		    activity = '{';   
        		    activity += '"ClaveMovil": "'+rs[i].ClaveMovil+'",';
        		    activity += '"Origen": "'+rs[i].Origen+'",';
        		    activity += '"CodigoCliente": "'+rs[i].CodigoCliente+'",';
        		    activity += '"CodigoContacto": "'+rs[i].CodigoContacto+'",';
        		    activity += '"CodigoDireccion": "'+rs[i].CodigoDireccion+'",';
        		    activity += '"CodigoMotivo": '+rs[i].CodigoMotivo+',';
        		    activity += '"DescripcionMotivo": "'+rs[i].DescripcionMotivo+'",';
        		    activity += '"Comentarios": "'+rs[i].Comentarios+'",';
        		    activity += '"Vendedor": '+rs[i].Vendedor+',';
        		    activity += '"Latitud": "'+rs[i].Latitud+'",';
        		    activity += '"Longitud": "'+rs[i].Longitud+'",';
        		    activity += '"FechaCreacion": "'+rs[i].FechaCreacion+'",';
        		    activity += '"HoraCreacion": "'+rs[i].HoraCreacion+'",';
        		    activity += '"ModoOffLine": "'+rs[i].ModoOffLine+'",';
        		    activity += '"ClaveFactura": '+rs[i].ClaveFactura+',';
        		    activity += '"SerieFactura": "'+rs[i].SerieFactura+'",';
        		    activity += '"CorrelativoFactura": '+rs[i].CorrelativoFactura+',';
        		    activity += '"TipoIncidencia": "'+rs[i].TipoIncidencia+'",';
        		    activity += '"FechaPago": "'+rs[i].FechaPago+'",';
        		    activity += '"Migrado": "'+rs[i].Migrado+'",';
        		    activity += '"Actualizado": "'+rs[i].Actualizado+'",';
        		    activity += '"Finalizado": "'+rs[i].Finalizado+'",';
        		    activity += '"CodigoSAP": '+rs[i].CodigoSAP+',';
        		    activity += '"Mensaje": "'+rs[i].Mensaje+'",';
        		    activity += '"EMPRESA": "'+rs[i].EMPRESA+'"';
        		    activity += "}";
                	mResult.push(JSON.parse(activity));
        		}
        		
        		objType = Constants.SUCCESS_OBJECT_RESPONSE;
        	    objResult = functions.CreateJSONObject(100, JSON.stringify(mResult), 1);
        	    objCount = mResult.length;

    	}else{
    	    objType = Constants.ERROR_MESSAGE_RESPONSE;
    	    objResult = functions.CreateJSONMessage(-101, "No se han encontrado registros con los parámetros indicados. ("+id+")");
    	}
	}else{
	    objType = Constants.ERROR_MESSAGE_RESPONSE;
	    objResult = functions.CreateJSONMessage(-100, "No se han recibido los parámetros de entrada.");
	}

}catch(e){
    objType = Constants.ERROR_MESSAGE_RESPONSE;
	objError = functions.CreateJSONMessage(-9703000, e.message);
	objResponse = functions.CreateResponse(objType, objError, 1);
	functions.DisplayJSON(objResponse,objType);
	
}finally{
    
    objResponse = functions.CreateResponse(objType, objResult, objCount);
	functions.DisplayJSON(objResponse, objType);
	
}