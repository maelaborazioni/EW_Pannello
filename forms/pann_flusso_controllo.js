
/**
 * Apre la finestra con le opzioni per il lancio della stampa delle presenze in giornaliera
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"E35B9658-0C7F-4DC3-9DED-106EB04E9FC2"}
 */
function stampaGiornalieraPannello(event)
{
	var frm = forms.pann_header_dtl;
	
	var anno = frm.anno;
	var mese = frm.mese;
	
	forms.stampa_giornaliera_opzioni.vAnno = anno;
	forms.stampa_giornaliera_opzioni.vMese = mese;
	
	var form = forms.stampa_giornaliera;
	form.selectedElements = [];
	var formName = form.controller.getName();
	var fs = forms.pann_header_dtl.foundset;
	
	globals.abilitaRaggruppamenti(forms.stampa_filtri_anagrafici.controller.getName(),true);
	globals.ma_utl_setStatus(globals.Status.EDIT, formName);
	globals.ma_utl_showFormInDialog(formName, 'Opzioni di stampa', fs);
}

/**
 * Apre la finestra con le opzioni per il lancio della stampa delle cartoline presenze
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"380C8D15-1B1A-4D3B-A601-E814F3FBF6E9"}
 */
function stampaCartolinePresenzePannello(event)
{
	var frm = forms.pann_header_dtl;
	var formOpt = forms.stampa_cartolina_presenze_opzioni;
	var form = forms.stampa_cartolina_presenze;
	form.selectedElements = [];
	var formName = form.controller.getName();
	
	formOpt.vPeriodo = formOpt.vPeriodoAl = new Date(frm.anno,frm.mese - 1,1);
	var fs = frm.foundset;
	
	globals.abilitaRaggruppamenti(forms.stampa_filtri_anagrafici.controller.getName(),true);
	globals.ma_utl_setStatus(globals.Status.EDIT,formName);
	globals.ma_utl_showFormInDialog(formName, 'Opzioni di stampa', fs);
}

/**
 * Apre la finestra con le opzioni per il lancio della stampa delle anomalie sulle timbrature
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"7859B24A-C3F1-4DF4-82D1-AC1923258F3B"}
 */
function stampaAnomalieTimbraturePannello(event) 
{
	var form = forms.stampa_anomalie_timbrature.controller.getName();
	
	var fs = forms.pann_header_dtl.foundset;
	
	globals.abilitaRaggruppamenti(forms.stampa_filtri_anagrafici.controller.getName(),true);
	globals.ma_utl_setStatus(globals.Status.EDIT,form);
	globals.ma_utl_showFormInDialog(form, 'Opzioni di stampa', fs);
}
