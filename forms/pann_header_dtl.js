/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"357055E2-9962-448F-9462-517EDBD941B8",variableType:4}
 */
var anno = null;

/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"B57BE194-FABD-4EE2-BA60-FA2D4FF389B1",variableType:4}
 */
var mese = null;

/**
 * @type {Array<Number>}
 * 
 * @properties={typeid:35,uuid:"ACFBD079-9D3C-4507-B37D-93E1232EA80B",variableType:-4}
 */
var arrDipFiltriAnagrafici = []; 

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"EA916FA3-15EC-4571-818B-53854336A9C6"}
 */
var vLblFiltroString = 'Nessun filtro attivo';

/**
 * Handle record selected.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param _form
 *
 * @private
 *
 * @properties={typeid:24,uuid:"35B30A94-16B7-422F-8438-8D90E8A721E8"}
 */
function onRecordSelection(event, _form)
{
	// aggiorna la visualizzazione in base alla modalità desiderata
	if(anno != null && mese != null)
	   globals.aggiornaVisualizzazionePannello(idditta,anno,mese,event);
	else
		forms.pann_flusso_dtl.mostraTabs();
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"DCB8E8D5-9FB3-4493-B078-F8AE6711032B"}
 */
function onShow(firstShow, event) 
{
	var frm = forms.svy_nav_fr_openTabs;
	var frmSq = forms.giorn_list_squadrati_ditta;
	var frmAn = forms.giorn_timbr_mancanti_ditta;
	
	if(firstShow)
	   globals.objGiornParams[frm.vTabNames[frm.vSelectedTab]].selected_tab = 1;
	else
	{
		frmSq.limitaAl = frmAn.limitaAl = globals.objGiornParams[frm.vTabNames[frm.vSelectedTab]].al;
		frmSq.limitaDal = globals.objGiornParams[frm.vTabNames[frm.vSelectedTab]].dal;
	}
	
	anno = globals.objGiornParams[frm.vTabNames[frm.vSelectedTab]].anno;
	mese = globals.objGiornParams[frm.vTabNames[frm.vSelectedTab]].mese;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"0B1DB7B9-9E8D-495E-B184-18B0C146778C"}
 */
function onActionFiltriAnagrafici(event) 
{
	var frmSelezione = forms.pann_selezione;
    // settaggio parametro per consentire l'aggiornamento dei dati senza l'apertura di un nuovo program
    frmSelezione.bFirstEnter = false;
	globals.ma_utl_showFormInDialog(frmSelezione.controller.getName(),'Scegli i parametri per la visualizzazione');
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"23D5B9C9-DDB0-4C61-856B-05D747312C69"}
 */
function onActionDisattivaFiltro(event) 
{
	arrDipFiltriAnagrafici = [];
	elements.btn_disattiva_filtro.enabled = false;
	elements.btn_attiva_filtro.enabled = true;
	vLblFiltroString = 'Nessun filtro attivo';
}

/**
 * @param {Boolean} filtrati
 * 
 * @properties={typeid:24,uuid:"AE4DF639-0229-464C-9B51-B5D7052FEDBD"}
 */
function aggiornaSituazioneFiltriAnagrafici(filtrati)
{
	if(filtrati)
	{
		var frmFiltri = forms.pann_filtri_anagrafici;
		vLblFiltroString = '<html><body>';
		
		if(frmFiltri.vFilterContratto)
		{
			vLblFiltroString += ('<b>Contratto</b> : ' + frmFiltri.vContrattoString + '\n');
		}
		if(frmFiltri.vFilterPosizioneInps)
		{
			vLblFiltroString += ('<b>Pos.INPS</b> : ' + frmFiltri.vPosizioneInpsString + '\n');
		}
		if(frmFiltri.vFilterQualifica)
		{
			vLblFiltroString += ('<b>Qualifica</b> : ' + frmFiltri.vQualificaString + '\n');
		}
		if(frmFiltri.vFilterRaggruppamento)
		{
			vLblFiltroString += ('<b>Raggruppamento</b> : ' + frmFiltri.vRaggruppamentiDettaglioString + '\n');
		}
		if(frmFiltri.vFilterSedeLavoro)
		{
			vLblFiltroString += ('<b>Sedi di lavoro</b> : ' + frmFiltri.vSediLavoroString + '\n');
		}
		if(frmFiltri.vFilterGroupLavoratori)
		{
			vLblFiltroString += ('<b>Gruppo lavoratori</b> : ' + frmFiltri.vGroupLavoratoriString + '\n');
		}
	}
	else
		vLblFiltroString = 'Nessun filtro attivo';
	vLblFiltroString += '</body></html>';
}