/**
 * @properties={typeid:35,uuid:"E961AD8E-D025-4F27-9772-0E6733B38020",variableType:-4}
 */
var bFirstEnter = true;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"2FBFD18B-5182-45D3-86D1-94961814C4A8"}
 */
function confermaSelezionePannello(event) 
{
	var params = {
		processFunction: process_conferma,
		message: '',
		opacity: 0.5,
		paneColor: '#434343',
		textColor: '#EC1C24',
		showCancelButton: false,
		cancelButtonText: '',
		dialogName: '',
		fontType: 'Arial,4,25',
		processArgs: [event]
	};
	plugins.busy.block(params);
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"86F39811-C095-409D-B2EE-54D1F42A9348"}
 */
function process_conferma(event)
{
	if(_idditta == null)
	{
		globals.ma_utl_showWarningDialog('Selezionare la ditta desiderata','Seleziona ditta');
		plugins.busy.unblock();
	    return;
	}
	
	globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
	globals.ma_utl_setStatus(globals.Status.BROWSE,forms.pann_filtri_anagrafici.controller.getName());
	plugins.busy.unblock();
	globals.svy_mod_closeForm(event);
	
	if(bFirstEnter)
	    globals.apriProgramPannello(_idditta,_anno,_mese);
	else
		globals.aggiornaVisualizzazionePannello(_idditta,_anno,_mese,event);
	
	var frmFiltri = forms.pann_filtri_anagrafici;
	if(frmFiltri.vFilterContratto ||
			frmFiltri.vFilterPosizioneInps ||
			frmFiltri.vFilterQualifica ||
			frmFiltri.vFilterRaggruppamento ||
			frmFiltri.vFilterSedeLavoro ||
			frmFiltri.vGroupLavoratori)
		forms.pann_header_dtl.aggiornaSituazioneFiltriAnagrafici(true);
	else
		forms.pann_header_dtl.aggiornaSituazioneFiltriAnagrafici(false);
		
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"FF51647B-1C09-4828-9B7F-3DB2935F6FE2"}
 */
function onShowForm(firstShow, event)
{
	plugins.busy.prepare();
	
	if(firstShow)
	{
		_mese = globals.TODAY.getMonth() + 1;
	    _anno = globals.TODAY.getFullYear();
	}
	
	globals.ma_utl_setStatus(globals.Status.EDIT,controller.getName());
	globals.ma_utl_setStatus(globals.Status.EDIT,forms.pann_filtri_anagrafici.controller.getName());
}

/**
 * Handle changed data.
 *
 * @param {String} oldValue old value
 * @param {String} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"939C5BC9-889E-4092-AE36-102496AC1376"}
 */
function onDataChangeDitta(oldValue, newValue, event) 
{
	var result = _super.onDataChangeDitta(oldValue, newValue, event);
	
	// aggiornamento filtri
	var frm = forms.pann_filtri_anagrafici;
	frm.vIdDitta = _idditta;
	frm.vFilterContratto = frm.vFilterPosizioneInps = frm.vFilterQualifica = frm.vFilterSedeLavoro = frm.vFilterRaggruppamento = 0;
	frm.vContrattoString = frm.vPosizioneInpsString = frm.vQualificaString = frm.vSediLavoroString = frm.vRaggruppamentoString = frm.vRaggruppamentiDettaglioString = '';
	frm.aggiornaRaggruppamenti();	
	
	return result;
}

/**
 * Handle changed data.
 *
 * @param {String} oldValue old value
 * @param {String} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"B6E95D38-EB00-4E7E-BC3E-AC1058E01F67"}
 */
function onDataChangeMese(oldValue, newValue, event)
{
	var result = _super.onDataChangeMese(oldValue, newValue, event); 
	return result;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"BE80D8EA-85F6-43F9-B643-5AB76D96F318"}
 */
function annullaSelezionePannello(event)
{
	globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
	globals.ma_utl_setStatus(globals.Status.BROWSE,forms.pann_filtri_anagrafici.controller.getName());
    _super.annullaSelezione(event);
}
