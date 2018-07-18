/**
 * @param {Number} 
 * 
 * @properties={typeid:35,uuid:"66FD08F4-CF5D-476A-A039-0595C60A37A6",variableType:-4}
 */
var vIdDitta = null;

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"3B744F80-16F5-46AA-A726-908E3CB79615"}
 */
function onShow(firstShow, event) 
{
	vIdDitta = forms.pann_header_dtl.idditta ? forms.pann_header_dtl.idditta : vIdDitta;
	vDateTo = globals.TODAY;
	
	aggiornaRaggruppamenti();	
}

/**
 * @properties={typeid:24,uuid:"AE2143CE-5B63-442D-9C6B-8016CE67BBAF"}
 */
function aggiornaRaggruppamenti()
{
	foundset.removeFoundSetFilterParam('ftr_idditta');
    foundset.addFoundSetFilterParam('idditta','=',vIdDitta,'ftr_idditta');
    foundset.loadAllRecords();
}
