
/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"7725E904-FEF1-4D33-B47A-A9FD3FE235FB"}
 */
function onShow(firstShow, event) 
{
	globals.ma_utl_setStatus(globals.Status.EDIT,forms.giorn_filtri_anagrafici.controller.getName());
}

/**
 * Handle hide window.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"7F2A4956-A15A-4716-B428-C140A137CC15"}
 */
function onHide(event)
{
	globals.ma_utl_setStatus(globals.Status.BROWSE,forms.giorn_filtri_anagrafici.controller.getName());
	return _super.onHide(event);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"9F4F7D8B-8D51-4D98-9325-8BC0288EEDC4"}
 */
function annullaFiltraggio(event) 
{
	globals.ma_utl_setStatus(globals.Status.BROWSE,forms.giorn_filtri_anagrafici.controller.getName());
	globals.svy_mod_closeForm(event);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"B89F3EFD-81DF-41D9-A2FF-ED15366F869B"}
 */
function confermaFiltraggio(event) 
{
	// impostazione filtri su dipendenti per la successiva visualizzazione di anomalie e/o squadrature
	var frm = forms.pann_header_dtl;
	var frmFtrAnag = forms.pann_filtri_anagrafici;
	var dsFiltri = globals.ottieniDipendentiFiltriAnagrafici(frmFtrAnag.idditta);
	if(dsFiltri.getMaxRowIndex() > 0)
		frm.arrDipFiltriAnagrafici = dsFiltri.getColumnAsArray(1);
	else
		frm.arrDipFiltriAnagrafici = [];
	
	frm.elements.btn_disattiva_filtro.enabled = true;
	frm.elements.btn_attiva_filtro.enabled = false;
	frm.vLblFiltroString = 'Filtro attivo';
	
	globals.ma_utl_setStatus(globals.Status.BROWSE,forms.giorn_filtri_anagrafici.controller.getName());
	globals.svy_mod_closeForm(event);
}
