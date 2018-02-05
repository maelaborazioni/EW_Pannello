/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"4D0682CC-267C-4DF6-A262-35D6EBF1FC83"}
 */
function onShow(firstShow, event) 
{
	var frm = forms.svy_nav_fr_openTabs;
	globals.objGiornParams[frm.vTabNames[frm.vSelectedTab]].selected_tab = 1;

	mostraTabs();
	
}

/**
 * @properties={typeid:24,uuid:"5D920A6C-4FFE-4DB6-A1EA-BE7AE0226055"}
 */
function mostraTabs() 
{
	var frmAcquisizioneName = forms.pann_flusso_acquisizione.controller.getName();
	var frmOperativaName = forms.pann_flusso_operativa.controller.getName();
	var frmControlloName = forms.pann_flusso_controllo.controller.getName();
	var frmInvioName = forms.pann_flusso_invio.controller.getName();
	
	aggiornaTabForms(frmAcquisizioneName,frmOperativaName,frmControlloName,frmInvioName);
}
